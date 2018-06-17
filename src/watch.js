const path = require('path');
const fs = require('fs');

const chokidar = require('chokidar');
const chalk = require('chalk');

const textlint = require('./textlint.js');
const htmlhint = require('./htmlhint.js');

const watchPath = process.argv[2];
if (! watchPath) {
  console.log(chalk.red("ERR") + " please pass the argument: a directory to watch.");
  return;
}
const resolvedPath = path.resolve(path.normalize(watchPath));
if (! fs.existsSync(resolvedPath)) {
  console.log(chalk.red("ERR") + " no such a directory: %s", resolvedPath);
  return;
}

console.log("start watch at %s ...", resolvedPath);

chokidar.watch(resolvedPath).on('change', (path, stats) => {
  console.log("file change at %s\n", stats.mtime);
  textlint(path);
  htmlhint(path);
});

