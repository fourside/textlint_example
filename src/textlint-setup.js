const fs = require('fs');

const TextLintCore = require("textlint").TextLintCore;
const htmlPlugin = require("textlint-plugin-html");

const jaNoAbusage = require('textlint-rule-ja-no-abusage');
const jaNoMixedPeriod = require('textlint-rule-ja-no-mixed-period');
const jaNoRedundantExpression = require('textlint-rule-ja-no-redundant-expression');
const jaNoWeakPhrase = require('textlint-rule-ja-no-weak-phrase');
const jaUnnaturalAlphabet = require('textlint-rule-ja-unnatural-alphabet');
const ngWord = require('textlint-rule-ng-word');
const noDoubleNegativeJa = require('textlint-rule-no-double-negative-ja');
const noDoubledConjunction = require('textlint-rule-no-doubled-conjunction');
const noDoubledJoshi = require('textlint-rule-no-doubled-joshi');
const noDroppingTheRa = require('textlint-rule-no-dropping-the-ra');
const noHankakuKana = require('textlint-rule-no-hankaku-kana');
const noMixDearuDesumasu  = require('textlint-rule-no-mix-dearu-desumasu' );
const noMixedZenkakuAndHankakuAlphabet = require('textlint-rule-no-mixed-zenkaku-and-hankaku-alphabet');
const noNfd = require('textlint-rule-no-nfd');
const preferTariTari = require('textlint-rule-prefer-tari-tari');


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
    'no-mix-dearu-desumasu': noMixDearuDesumasu,
    'ja-no-abusage': jaNoAbusage,
    'ja-no-mixed-period': jaNoMixedPeriod,
    'ja-no-redundant-expression': jaNoRedundantExpression,
    'ja-no-weak-phrase': jaNoWeakPhrase,
    'ja-unnatural-alphabet': jaUnnaturalAlphabet,
    'ng-word': ngWord,
    'no-double-negative-ja': noDoubleNegativeJa,
    'no-doubled-conjunction': noDoubledConjunction,
    'no-doubled-joshi': noDoubledJoshi,
    'no-dropping-the-ra': noDroppingTheRa,
    'no-hankaku-kana': noHankakuKana,
    'no-mix-dearu-desumasu': noMixDearuDesumasu,
    'no-mixed-zenkaku-and-hankaku-alphabet': noMixedZenkakuAndHankakuAlphabet,
    'no-nfd': noNfd,
    'prefer-tari-tari': preferTariTari
  }
}

function getRuleConfig() {
  const rc = fs.readFileSync('./.textlintrc', 'utf-8');
  const json = JSON.parse(rc);
  return json.rules;
}

