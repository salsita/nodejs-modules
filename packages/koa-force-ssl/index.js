const http = require("http");
const HTTPStatus = require("http-status");

module.exports = {
  middleware: (allowUnsecure) => async (ctx, next) => {
    if (
      allowUnsecure ||
      process.env.NODE_ENV !== "production" ||
      ctx.secure ||
      ctx.header["x-forwarded-proto"] === "https"
    ) {
      await next();
    } else {
      ctx.redirect(`https://${ctx.get("Host")}${ctx.url}`);
    }
  },

  createServer: () =>
    http.createServer((req, res) => {
      res.writeHead(HTTPStatus.MOVED_PERMANENTLY, {
        Location: `https://${req.headers.host}${req.url}`,
      });
      res.end();
    }),
};
