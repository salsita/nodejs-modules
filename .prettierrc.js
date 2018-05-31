module.exports = {
  printWidth: 100,
  parser: "babylon",
  overrides: [
    {
      files: "*.json",
      options: { parser: "json" }
    },
    {
      files: "*.md",
      options: { parser: "markdown" }
    }
  ]
};
