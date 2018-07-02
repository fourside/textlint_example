const path = require('path');
const fs = require('fs');

module.exports = (args) => {
  if (args < 3) {
    console.log(chalk.red("ERR") + " please pass the argument: a directory to watch.");
    return false;
  }
  const filePaths = args.slice(2)
  if (! filePaths.every(isPath)) {
    return false;
  }
  return true;
};

function isPath(filePath) {
  const resolvedPath = path.resolve(path.normalize(filePath));
  const exist = fs.existsSync(resolvedPath);
  if (! exist) {
    console.log(chalk.red("ERR") + " no such a directory: %s", resolvedPath);
  }
  return exist;
}

