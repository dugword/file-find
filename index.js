'use strict';

const fs = require('fs');

function find(funcs, ...directoryPaths) {
  let wanted;
  let preprocess;
  let postprocess;
  if (typeof funcs === 'function') {
    wanted = funcs;
  }
  else if (typeof funcs === 'object') {
    wanted = funcs.wanted;
    preprocess = funcs.preprocess;
    postprocess = funcs.postprocess;
  }
  else {
    throw new Error('Invalid wanted function');
  }

  const rootDir = process.cwd();

  directoryPaths.forEach((directoryPath) => {
    process.chdir(directoryPath);
    const currentDirectory = process.cwd();

    const directoriesInCurrentDirectory = [];
    let files = fs.readdirSync(currentDirectory);

    if (preprocess) {
      files = preprocess(files);
    }

    files.forEach((file) => {
      const stats = fs.statSync(file);

      if (stats.isDirectory()) {
        directoriesInCurrentDirectory.push(file);
      }
      else {
        wanted(file);
      }
    });

    directoriesInCurrentDirectory.forEach((directory) => {
      find(funcs, directory);
    });

    if (postprocess) {
      postprocess(directoryPath);
    }

    process.chdir(rootDir);
  });
}

module.exports = {
  find,
};
