# @salsita/lock

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
