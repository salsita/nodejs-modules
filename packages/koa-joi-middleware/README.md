# @salsita/koa-joi-middleware

[![NPM version](https://img.shields.io/npm/v/@salsita/koa-joi-middleware.svg)](https://www.npmjs.com/package/@salsita/koa-joi-middleware)
![Downloads](https://img.shields.io/npm/dm/@salsita/koa-joi-middleware.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/koa-joi-middleware.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/koa-joi-middleware)](https://david-dm.org/salsita/nodejs-modules?path=packages/koa-joi-middleware)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/koa-joi-middleware)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/koa-joi-middleware)

Middleware used on routes to validate input.

Example:

```js
const joi = require("@hapi/joi");
const Router = require("koa-router");
const joiMiddleware = require("@salsita/koa-joi-middleware");

const router = new Router();

const paramsSchema = joi.object().keys({
  id: joi.number().integer().positive().required()
}).required();
const bodySchema = joi.object().keys({
  name: joi.string().max(1024).required(),
  email: joi.string().email().max(1024).required()
}).required();

router.patch(
  '/:id',
  joiMiddleware([
    { get: ctx => ctx.params, schema: paramsSchema },
    { get: ctx => ctx.request.body, schema: bodySchema },
  ],
  async ctx => { /* perform stuff */ }
);
```
