const fs = require('fs');
const chalk = require('chalk');

const HTMLHint = require('htmlhint').HTMLHint;

fs.readFile('./src/.htmlhintrc', "utf-8", (err, data) => {
  HTMLHint.defaultRuleset = JSON.parse(data);
});

module.exports = (text) => {
  const message = HTMLHint.verify(text);
  message.forEach((msg) => {
    console.log("%s:%s [%s] %s [rule: %s]", msg.line, msg.col, chalk.red(msg.type), msg.message, msg.rule.id);
  });
}

