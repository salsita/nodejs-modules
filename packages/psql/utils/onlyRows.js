module.exports = fn => async (...args) => {
  const { rows } = await fn(...args);
  return rows;
};
