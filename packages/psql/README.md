# @salsita/psql

[![NPM version](https://img.shields.io/npm/v/@salsita/psql.svg)](https://www.npmjs.com/package/@salsita/psql)
![Downloads](https://img.shields.io/npm/dm/@salsita/psql.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/psql.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/psql)](https://david-dm.org/salsita/nodejs-modules?path=packages/psql)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/psql)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/psql)

Functions and utilities for wrapping postgres DB connection.

- `connect` - accepts function and executes it passing DB connection as parameter.
- `transaction` - wraps function call to DB transaction
- `withDb` - ensures first parameter of function is DB connection

Example:

```js
const _ = require("lodash");
const squel = require("squel");
const psql = require("@salsita/psql");
const onlyFirstRow = require("@salsita/sql/utils/onlyFirstRow");
const quote = require("@salsita/sql/utils/quote");

//
// CONFIGURATION
//

const connect = psql.connect({ options: { connectionString: process.env.DATABASE_URL } });
const withDb = psql.withDb(connect);
const { transaction } = psql;

const usersModel = _.mapValues(
  {
    findById: onlyFirstRow((dbClient, id) =>
      dbClient.query(
        squel
          .select()
          .from('"Users"')
          .where('"userId" = ?', id)
          .toParam()
      )
    ),
    updateById: onlyFirstRow((dbClient, id, data) =>
      dbClient.query(
        squel
          .update()
          .table('"Users"')
          .setFields(quote(data))
          .where('"userId" = ?', id)
          .returning("*")
          .toParam()
      )
    )
  },
  withDb
);

//
// USAGE
//

// random connection from pool
const user = await usersModel.findById(1);

// using one connection for all queries in transaction
const user = await connect(
  transaction(async dbClient => {
    const oldUser = await usersModel.findById(dbClient, 1);
    const newUser = await usersModel.updateById(dbClient, 1, { name: `${oldUser.name}son` });
  })
);
```
