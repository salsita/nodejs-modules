const HTTPStatus = require("http-status");
const { ClientError } = require("@salsita/errors");
const defaultLog = require("@salsita/log");

module.exports = (log = defaultLog, formatUserMessage = e => e) => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ClientError) {
      ctx.status = err.status;
      ctx.body = {
        error: err.message
      };
    } else {
      log("error", "Error while handling Koa request", err);

      ctx.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: String(formatUserMessage(err))
      };
    }
  }
};
