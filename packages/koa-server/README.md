# @salsita/koa-server

[![NPM version](https://img.shields.io/npm/v/@salsita/koa-server.svg)](https://www.npmjs.com/package/@salsita/koa-server)
![Downloads](https://img.shields.io/npm/dm/@salsita/koa-server.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/koa-server.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/koa-server)](https://david-dm.org/salsita/nodejs-modules?path=packages/koa-server)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/koa-server)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/koa-server)

Function to create and configure koa server.

Expects optional parameters:

- `log` - logging function
- `ssl` - ssl configuration (value or promise resolving in [ssl configuration](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options) - usually object with `key` and `cert` keys)
- `allowUnsecure` - if server is allowed to serve content over HTTP connection instead of redirecting to HTTPS

See [https://github.com/salsita/nodejs-training/blob/master/src/index.js](nodejs-training) repo for usage.
