const pruneValues = require("@salsita/prune-values");

function getError(err) {
  return typeof err !== "object"
    ? err
    : pruneValues({
        ...err,
        message: err.message,
        code: err.code,
        stack: err.stack
      });
}

function getErrorForClient(err) {
  return process.env.NODE_ENV === "production"
    ? err.message || "Ooops something went wrong"
    : JSON.stringify(getError(err));
}

module.exports = {
  getError,
  getErrorForClient
};
