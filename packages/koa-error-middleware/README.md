# @salsita/koa-error-middleware

[![NPM version](https://img.shields.io/npm/v/@salsita/koa-error-middleware.svg)](https://www.npmjs.com/package/@salsita/koa-error-middleware)
![Downloads](https://img.shields.io/npm/dm/@salsita/koa-error-middleware.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/koa-error-middleware.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/koa-error-middleware)](https://david-dm.org/salsita/nodejs-modules?path=packages/koa-error-middleware)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/koa-error-middleware)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/koa-error-middleware)

Top level middleware for catching and displaying errors (assumes using error classes from [@salsita/errors](https://github.com/salsita/nodejs-modules/tree/master/packages/errors)).

Expects logging function as parameter.

Example:

```js
const winston = require("winston");
const Router = require("koa-router");
const errorMiddleware = require("@salsita/koa-error-middleware");

const formatUserMessage = err =>
  process.env.NODE_ENV === "production" ? "Ooops something went wrong" : err.message;

const router = new Router();
router.use(errorMiddleware(winston.log, formatUserMessage));
```
