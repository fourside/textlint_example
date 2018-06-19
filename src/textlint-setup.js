const fs = require('fs');

const TextLintCore = require("textlint").TextLintCore;
const htmlPlugin = require("textlint-plugin-html");
const readPkg = require('read-pkg');

module.exports = () => {
  const linter = new TextLintCore();
  linter.setupPlugins({ html: htmlPlugin });

  getRules().then(rules => {
    const ruleConfig = getRuleConfig();
    linter.setupRules(rules, ruleConfig);
  });
  return linter;
}

const PREFIX_RULE = 'textlint-rule-';

function getRulePackageNames() {
  return readPkg().then(pkg => {
    const devDependencies = pkg.devDependencies;
    return Object.keys(devDependencies).filter(pkgName => {
      return pkgName.indexOf(PREFIX_RULE) !== -1;
    });
  }).catch(() => {
    return [];
  });
}

function getRules() {
  return getRulePackageNames().then(pkgNames => {
    const rules = {};
    pkgNames.forEach(pkgName => {
      const key = pkgName.replace(PREFIX_RULE, '');
      const pkg = require(pkgName);
      rules[key] = pkg;
    });
    return rules;
  });
}

function getRuleConfig() {
  const rc = fs.readFileSync('./.textlintrc', 'utf-8');
  const json = JSON.parse(rc);
  return json.rules;
}

