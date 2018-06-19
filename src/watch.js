const path = require('path');
const fs = require('fs');

const chokidar = require('chokidar');
const encoding = require('encoding-japanese');
const iconv = require('iconv-lite');
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

chokidar.watch(resolvedPath).on('change', (filePath, stats) => {
  console.log("[%s] changed at %s\n", filePath, stats.mtime);
  fs.readFile(filePath, (err, data) => {
    const charset = encoding.detect(data);
    let text;
    if (charset == 'SJIS') {
      text = iconv.decode(data, 'Shift_JIS');
    } else if (charset == 'UTF8' || charset == 'ASCII') {
      text = data.toString('utf-8');
    } else {
      throw "no implementation charset encoding: " + charset;
    }
    const ext = path.extname(filePath);
    if (ext == '.html' || ext == '.htm') {
      htmlhint(text);
    }
    textlint(text ,ext);
  });
});

