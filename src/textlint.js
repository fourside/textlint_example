const TextLintEngine = require("textlint").TextLintEngine;
const textlintSetup = require('./textlint-setup');
const createFormatter = require('@textlint/linter-formatter').createFormatter;

const engine = new TextLintEngine();
const linter = textlintSetup();

const formatter = createFormatter({
  formatterName: "stylish",
  color: true
});

module.exports = (text, ext) => {
  linter.lintText(text, ext).then(results => {
    console.log(formatter([results]));
  });
}

