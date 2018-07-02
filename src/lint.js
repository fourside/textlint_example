const fs = require('fs');
const path = require('path');

const encoding = require('encoding-japanese');
const iconv = require('iconv-lite');

const textlint = require('./textlint.js');
const htmlhint = require('./htmlhint.js');

module.exports = (filePath) => {
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
}


