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

// const { createNamespace } = require("continuation-local-storage");
const { createNamespace } = require("cls-hooked"); // experimental but works with async/await
const { v4: uuidv4 } = require("uuid");

const {
  middleware: forceSSL,
  createServer: createRedirectServer
} = require("@salsita/koa-force-ssl");
const defaultLog = require("@salsita/log");

const requestNSName = "koa request";
const requestId = "requestId";

const request = createNamespace(requestNSName);
const getRequestId = () => request.get(requestId);
morgan.token(requestId, getRequestId);

const app = new Koa();

const createWeb = ({ log = defaultLog, ssl, allowUnsecure = !ssl } = {}) => {
  app.on("error", err => log("error", "Error in Koa framework", err));

  // configure server - headers, logging, etc.
  app.use(async (ctx, next) => {
    const context = request.createContext();
    request.enter(context);
    try {
      request.set(requestId, ctx.request.headers["x-request-id"] || uuidv4());
      return await next();
    } finally {
      request.exit(context);
    }
  });
  app.use(
    morgan(
      `:date[iso] - web (rid:${requestId}): :method :url :status :res[content-length] - :response-time ms`
    )
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

  const createServer = async () =>
    ssl ? https.createServer(await ssl, app.callback()) : http.createServer(app.callback());

  return {
    createServer,
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
    start: (server, port) => {
      if (!port) {
        throw new Error("No port specified");
      }
      server.listen(port, err => {
        if (err) {
          log("error", "Error when starting server", err);
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
    shutdown: server => {
      server.close(err => {
        if (err) {
          log("error", "Error when shutting down server", err);
          process.exitCode = 1;
        }
        process.exit();
      });
    }
  };
};

module.exports = {
  app,
  createWeb,
  requestNSName,
  getRequestId
};
