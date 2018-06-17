const fs = require('fs');
const chalk = require('chalk');

const HTMLHint = require('htmlhint').HTMLHint;
fs.readFile('./src/.htmlhintrc', "utf-8", (err, data) => {
  HTMLHint.defaultRuleset = JSON.parse(data);
});

module.exports = function (path) {
  fs.readFile(path, (err, data) => {
    const message = HTMLHint.verify(data);
    message.forEach((msg) => {
      console.log("%s:%s:%s [%s] %s [rule: %s]", path, msg.line, msg.col, chalk.red(msg.type), msg.message, msg.rule.id);
    });
  });
}

