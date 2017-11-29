'use strict';

const { execFileSync } = require('child_process');

const { find } = require('../../');

find((file) => {
  const result = execFileSync('pwd');
  process.stdout.write(result.toString('utf8'));
  console.log(file);
  console.log();
},'./');
