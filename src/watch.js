const path = require('path');
const fs = require('fs');

const chokidar = require('chokidar');
const chalk = require('chalk');

const args = require('./args.js');
const lint = require('./lint.js');

if (! args(process.argv)) {
  return;
}

const lintPaths = process.argv.slice(2);
lintPaths.forEach((lintPath) => {
  const resolvedPath = path.resolve(path.normalize(lintPath));
  console.log("start watch at %s ...", resolvedPath);
  chokidar.watch(resolvedPath).on('change', watchLint);
});

function watchLint(filePath) {
  console.log("[%s] changed\n", filePath);
  lint(filePath);
}
