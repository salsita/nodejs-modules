# @salsita/lock

[![NPM version](https://img.shields.io/npm/v/@salsita/lock.svg)](https://www.npmjs.com/package/@salsita/lock)
![Downloads](https://img.shields.io/npm/dm/@salsita/lock.svg?style=flat)
![Licence](https://img.shields.io/npm/l/@salsita/lock.svg?style=flat)
[![Dependency Status](https://img.shields.io/david/salsita/nodejs-modules.svg?path=packages/lock)](https://david-dm.org/salsita/nodejs-modules?path=packages/lock)
[![devDependency Status](https://img.shields.io/david/dev/salsita/nodejs-modules.svg?path=packages/lock)](https://david-dm.org/salsita/nodejs-modules?type=dev&path=packages/lock)

Function to create lock function. This lock function can be used to wrap any async function ensuring it will not be executed again before previous call finish.

Example:

```js
const createLock = require("@salsita/lock");

const lock = createLock();

const wait = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const fn = async n => {
  await wait(1000);
  console.log(`work ${n} done`);
};

lock(() => fn(1));
lock(() => fn(2));
```
