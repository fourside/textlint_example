const TextLintEngine = require("textlint").TextLintEngine;
const engine = new TextLintEngine();

const TextLintCore = require("textlint").TextLintCore;
const linter = new TextLintCore();

module.exports = (text, ext) => {
  linter.lintText(text, ext).then(results => {
    console.log(results);
    if (engine.isErrorResults(results)) {
      const output = engine.formatResults(results);
      console.log(output);
    }
  });
}

