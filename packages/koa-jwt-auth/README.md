# @salsita/koa-jwt-auth

[![NPM version](https://img.shields.io/npm/v/@salsita/koa-jwt-auth.svg)](https://www.npmjs.com/package/@salsita/koa-jwt-auth)
![Downloads](https://img.shields.io/npm/dm/@salsita/koa-jwt-auth.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/koa-jwt-auth.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/koa-jwt-auth)](https://david-dm.org/salsita/nodejs-modules?path=packages/koa-jwt-auth)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/koa-jwt-auth)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/koa-jwt-auth)

Configures authentication middleware.

Important options:

- `key` - secure key for hashing payload (if persistent key not provided, new key is generated with each server start - logging out all users)
- `version` - should be increased with every change in `createSession` function, so users using old structure are logged out
- `createSession` - function returning data which identifies user (usually user id)
- `getUserForSession` - function which checks if user exists/session is valid (data returned from `createSession` are supplied) and result is put into `ctx.state.user`
