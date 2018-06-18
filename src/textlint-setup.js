const fs = require('fs');

const TextLintCore = require("textlint").TextLintCore;
const htmlPlugin = require("textlint-plugin-html");
const noMixDearuDesumasu = require('textlint-rule-no-mix-dearu-desumasu')


module.exports = () => {
  const linter = new TextLintCore();
  linter.setupPlugins({ html: htmlPlugin });
  const ruleConfig = getRuleConfig();
  const rules = getRules();
  linter.setupRules(rules, ruleConfig);
  return linter;
}

function getRules() {
  return {
    'no-mix-dearu-desumasu': noMixDearuDesumasu
    // TODO
  }
}

function getRuleConfig() {
  const rc = fs.readFileSync('./.textlintrc', 'utf-8');
  const json = JSON.parse(rc);
  return json.rules;
}
