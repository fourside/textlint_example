const fs = require('fs');
const path = require('path');

const args = require('./args.js');
const lint = require('./lint.js');

if (! args(process.argv)) {
  return;
}

const lintPaths = process.argv.slice(2);
lintPaths.forEach((lintPath) => {
  walkDir(lintPath);
});

function walkDir(walkPath) {
  const resolvedPath = path.resolve(path.normalize(walkPath));
  const stat = fs.statSync(resolvedPath);
  if (stat.isFile()) {
    lint(resolvedPath);
  } else if (stat.isDirectory()) {
    fs.readdir(resolvedPath, (err, files) => {
      if (err) {
        console.log(err);
        return;
      }
      files.forEach((file) => {
        const joinedPath = path.join(resolvedPath, file);
        if (fs.statSync(joinedPath).isDirectory()) {
          walkDir(joinedPath);
        } else {
          lint(joinedPath);
        }
      });
    });

  }
}
