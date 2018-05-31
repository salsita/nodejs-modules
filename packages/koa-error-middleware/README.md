# @salsita/koa-error-middleware

Top level middleware for catching and displaying errors (assumes using error classes from [@salsita/errors](https://github.com/salsita/nodejs-modules/tree/master/packages/errors))
to user using [@salsita/get-error](https://github.com/salsita/nodejs-modules/tree/master/packages/get-error).

Expects logging function as parameter.

Example:

```js
const winston = require("winston");
const Router = require("koa-router");
const errorMiddleware = require("@salsita/koa-error-middleware");

const router = new Router();
router.use(errorMiddleware(winston.log));
```
