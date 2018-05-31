# @salsita/koa-server

Function to create and configure koa server.

Expects optional parameters:

- `log` - logging function
- `ssl` - ssl configuration (value or promise resolving in [ssl configuration](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options) - usually object with `key` and `cert` keys)
- `allowUnsecure` - if server is allowed to serve content over HTTP connection instead of redirecting to HTTPS

See [https://github.com/salsita/nodejs-training/blob/master/src/index.js](nodejs-training) repo for usage.
