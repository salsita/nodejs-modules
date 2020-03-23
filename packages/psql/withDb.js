const { Client } = require("pg");

module.exports = (connectDB) => (fn) => (dbClient, ...args) =>
  dbClient instanceof Client
    ? fn(dbClient, ...args)
    : connectDB((realDBClient) => fn(realDBClient, dbClient, ...args));
