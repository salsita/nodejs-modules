const http = require("http");
const https = require("https");

const Koa = require("koa");
const morgan = require("koa-morgan");
const cors = require("koa-cors");
const helmet = require("koa-helmet");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const send = require("koa-send");

const {
  middleware: forceSSL,
  createServer: createRedirectServer
} = require("@salsita/koa-force-ssl");
const { getError } = require("@salsita/get-error");
const defaultLog = require("@salsita/log");

module.exports = async ({ log = defaultLog, ssl, allowUnsecure = !ssl } = {}) => {
  const app = new Koa();

  app.on("error", err => log("error", "Error in Koa framework", getError(err)));

  // configure server - headers, logging, etc.
  app.use(
    morgan(":date[iso] - web: :method :url :status :res[content-length] - :response-time ms")
  );
  app.use(forceSSL({ allowUnsecure }));
  app.use(cors());
  app.use(helmet());
  app.use(compress());
  app.use(bodyParser());

  if (!ssl !== allowUnsecure) {
    log(
      "warn",
      `Probably misconfigured server - ${
        ssl ? "allowed HTTP while using SSL" : "not allowed HTTP when not using SSL"
      }`
    );
  }

  const server = ssl
    ? https.createServer(await ssl, app.callback())
    : http.createServer(app.callback());

  return {
    app,
    server,
    addRoutes: (actions, distDir) => {
      // api routes
      app.use(actions.routes(), actions.allowedMethods());

      if (distDir) {
        // static assets
        app.use(serve(distDir));
        // otherwise send index
        app.use(ctx => send(ctx, `${distDir}/index.html`));
      }
    },
    start: port => {
      if (!port) {
        throw new Error("No port specified");
      }
      server.listen(port, err => {
        if (err) {
          log("error", err);
          process.exit(1);
        } else {
          const protocol = `http${allowUnsecure ? "" : "s"}`;
          log("info", "----");
          log("info", `==> Server is running on port ${port}`);
          log("info", `==> Send requests to ${protocol}://localhost:${port}`);
        }
      });
      // eslint-disable-next-line eqeqeq
      if (ssl && port == 443) {
        createRedirectServer().listen(80);
      }
    },
    shutdown: () => {
      server.close(err => {
        if (err) {
          log("error", "Error when shutting down server", getError(err));
          process.exitCode = 1;
        }
        process.exit();
      });
    }
  };
};
