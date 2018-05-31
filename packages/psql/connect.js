const pg = require("pg");
const util = require("util");
const { DBError } = require("@salsita/errors");
const defaultLog = require("@salsita/log");

const isMyQuery = Symbol("isMyQuery");

module.exports = ({ log = defaultLog, options } = {}) => {
  const adjust = dbClient => {
    if (!dbClient[isMyQuery]) {
      dbClient[isMyQuery] = true; // eslint-disable-line no-param-reassign
      const originalQuery = dbClient.query.bind(dbClient);
      // eslint-disable-next-line no-param-reassign
      dbClient.query = async (...args) => {
        try {
          const start = process.hrtime();
          const result = await originalQuery(...args);
          const end = process.hrtime(start);

          const time = (end[0] * 1e9 + end[1]) / 1e6;
          const argsFormatted = util.inspect(args);
          log("debug", `${time.toFixed(3)}`, argsFormatted, {
            rowCount: result.rowCount
          });
          return result;
        } catch (err) {
          log("error", "DB", err.stack || err, "\n", args);
          throw new DBError(err);
        }
      };
    }
    return dbClient;
  };

  const pool = new pg.Pool(options);

  const connect = async fn => {
    const dbClient = await pool.connect();
    try {
      adjust(dbClient);
      return await fn(dbClient);
    } finally {
      dbClient.release();
    }
  };

  connect.pool = pool;

  return connect;
};
