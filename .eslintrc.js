// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  parser: "vue-eslint-parser",
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html", "vue"],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    "no-new-func": 0,
    "arrow-parens": 0,
    "no-tabs": "off",
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
