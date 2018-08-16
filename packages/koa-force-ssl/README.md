# @salsita/koa-force-ssl

[![NPM version](https://img.shields.io/npm/v/@salsita/koa-force-ssl.svg)](https://www.npmjs.com/package/@salsita/koa-force-ssl)
![Downloads](https://img.shields.io/npm/dm/@salsita/koa-force-ssl.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/koa-force-ssl.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/koa-force-ssl)](https://david-dm.org/salsita/nodejs-modules?path=packages/koa-force-ssl)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/koa-force-ssl)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/koa-force-ssl)

Middleware and server used to redirect user to secure connection on production.
Used by [@salsita/koa-server](https://github.com/salsita/nodejs-modules/tree/master/packages/koa-server).

Middleware function expects `allowUnsecure` parameter which can disable redirecting if request is not send over SSL connection.
