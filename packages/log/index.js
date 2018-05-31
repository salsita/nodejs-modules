const util = require("util");

// eslint-disable-next-line no-console
module.exports = (level, ...message) => console[level](util.format(...message));
