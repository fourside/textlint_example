const TextLintEngine = require("textlint").TextLintEngine;
const engine = new TextLintEngine();

module.exports = function (path) {
  engine.executeOnFiles([path]).then(results => {
    if (engine.isErrorResults(results)) {
      const output = engine.formatResults(results);
      console.log(output);
    }
  });
}

