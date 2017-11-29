'use strict';

const fs = require('fs');

function find(wanted, ...directoryPaths) {
  const rootDir = process.cwd();

  directoryPaths.forEach((directoryPath) => {
    process.chdir(directoryPath);
    const currentDirectory = process.cwd();

    const directoriesInCurrentDirectory = [];
    fs.readdirSync(currentDirectory).forEach((file) => {
      const stats = fs.statSync(file);

      if (stats.isDirectory()) {
        directoriesInCurrentDirectory.push(file);
      }
      else {
        wanted(file);
      }
    });

    directoriesInCurrentDirectory.forEach((directory) => {
      find(wanted, directory);
    });

    process.chdir(rootDir);
  });
}

module.exports = {
  find,
};
