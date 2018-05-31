# @salsita/koa-jwt-auth

Configures authentication middleware.

Important options:

- `key` - secure key for hashing payload (if persistent key not provided, new key is generated with each server start - logging out all users)
- `version` - should be increased with every change in `createSession` function, so users using old structure are logged out
- `createSession` - function returning data which identifies user (usually user id)
- `getUserForSession` - function which checks if user exists/session is valid (data returned from `createSession` are supplied) and result is put into `ctx.state.user`
