module.exports = {
  printWidth: 100,
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
