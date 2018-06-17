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

chokidar.watch(resolvedPath).on('change', (filepath, stats) => {
  console.log("file change at %s\n", stats.mtime);
  fs.readFile(filepath, (err, data) => {
    const charset = encoding.detect(data);
    let text;
    console.log(charset)
    if (charset == 'SJIS') {
      text = iconv.decode(data, 'Shift_JIS');
    } else if (charset == 'UTF8') {
      text = data.toString('utf-8');
    } else {
      throw "no implementation charset encoding: " + charset;
    }
    htmlhint(text);
    const ext = path.extname(filepath);
    textlint(text ,ext);
  });
});

