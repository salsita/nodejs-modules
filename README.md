# nodejs-modules

[![Greenkeeper badge](https://badges.greenkeeper.io/salsita/nodejs-modules.svg)](https://greenkeeper.io/)

Shared modules used for node.js applications developed by Salsita.

- **[errors](./packages/errors)** - Commonly used error classes
- **[koa-error-middleware](./packages/koa-error-middleware)** - Top level middleware for catching and displaying errors
- [koa-force-ssl](./packages/koa-force-ssl) - Middleware and server used to redirect user to secure connection on production
- **[koa-joi-middleware](./packages/koa-joi-middleware)** - Middleware used on routes to validate input
- [koa-jwt-auth](./packages/koa-jwt-auth) - Configures authentication middleware
- **[koa-server](./packages/koa-server)** - Function to create and configure typical koa server
- **[lock](./packages/lock)** - Function to create lock/mutex function
- [log](./packages/log) - Default function to logging to console
- [prune-values](./packages/prune-values) - Removes keys with undefined values from object
- [psql](./packages/psql) - Functions and utilities for wrapping postgres DB connection

See [https://github.com/salsita/nodejs-training](nodejs-training) repo for usage.
