const TextLintEngine = require("textlint").TextLintEngine;
const textlintSetup = require('./textlint-setup');

const engine = new TextLintEngine();
const linter = textlintSetup();

module.exports = (text, ext) => {
  linter.lintText(text, ext).then(results => {
    //console.log(results);
    results.messages.forEach((msg) => {
      console.log("%s:%s %s [%s]", msg.line, msg.column, msg.message, msg.ruleId);
    });
  });
}

