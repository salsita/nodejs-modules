const passport = require("koa-passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { AuthError } = require("@salsita/errors");

const defaultAlgorithm = "HS384";
const defaultExpiresIn = "6h";
const defaultVersion = 1;

module.exports = ({
  key = crypto.randomBytes(30).toString("base64"),
  algorithm = defaultAlgorithm,
  expiresIn = defaultExpiresIn,
  version = defaultVersion,
  createSession,
  getUserForSession,
}) => {
  const resignPayload = (payload) => {
    delete payload.exp; // eslint-disable-line no-param-reassign
    return jwt.sign(payload, key, { algorithm, expiresIn });
  };

  const createSessionToken = async (...args) => {
    const payload = await createSession(...args);
    return resignPayload({ payload, version });
  };

  const isSessionValid = (session) => session && session.version === version;

  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: key,
        algorithms: [algorithm],
      },
      async (jwtPayload, done) => {
        if (!isSessionValid(jwtPayload)) {
          return done(null, false);
        }
        try {
          const user = await getUserForSession(jwtPayload.payload);
          done(null, user || false);
        } catch (err) {
          done(err);
        }
        return null;
      }
    )
  );

  return {
    createSessionToken,

    middleware: async (ctx, next) => {
      await passport.authenticate("jwt", { session: false }, async (authErr, user) => {
        if (authErr) {
          throw authErr;
        }
        if (!user) {
          throw new AuthError("Unauthorized");
        }
        return ctx.logIn(user, { session: false });
      })(ctx);
      return next();
    },
  };
};
