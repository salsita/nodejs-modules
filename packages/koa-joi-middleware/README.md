# @salsita/koa-joi-middleware

Middleware used on routes to validate input.

Example:

```js
const joi = require("joi");
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
