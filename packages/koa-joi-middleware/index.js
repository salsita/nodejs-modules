const { JoiError } = require("@salsita/errors");

module.exports = (schemas, options = {}) => {
  const extOptions = {
    ...options,
    abortEarly: options.abortEarly === undefined ? false : options.abortEarly,
  };
  return async (ctx, next) => {
    try {
      await Promise.all(schemas.map(({ get, schema }) => schema.validate(get(ctx), extOptions)));
    } catch (err) {
      throw new JoiError(err);
    }
    await next();
  };
};
