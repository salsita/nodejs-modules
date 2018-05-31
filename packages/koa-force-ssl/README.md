# @salsita/koa-force-ssl

Middleware and server used to redirect user to secure connection on production.
Used by [@salsita/koa-server](https://github.com/salsita/nodejs-modules/tree/master/packages/koa-server).

Middleware function expects `allowUnsecure` parameter which can disable redirecting if request is not send over SSL connection.
