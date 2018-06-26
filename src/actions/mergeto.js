// const fs = require('fs');
// const path = require('path');
const spawn = require('cross-spawn');
// const exec = require('child_process').exec;

function doSpawnSync(cmd, args) {
  const options = {
    stdio: 'inherit',
  };
  spawn.sync(cmd, args, options);
}

module.exports = (branch) => {
  process.chdir(process.cwd());
  const currentBranch = doSpawnSync('git', ['symbolic-ref', '--short', '-q', 'HEAD']);

  doSpawnSync('git', ['pull']);
  doSpawnSync('git', ['add', './']);
  doSpawnSync('git', ['commit', '-m', `build[${(new Date()).toLocaleString()}]:build`]);
  doSpawnSync('git', ['push']);
  doSpawnSync('git', ['checkout', branch]);
  doSpawnSync('git', ['pull']);
  doSpawnSync('git', ['merge', currentBranch, '-m', `merge[${(new Date()).toLocaleString()}]: ${currentBranch} merge to ${branch}`]);
  doSpawnSync('git', ['push']);
  doSpawnSync('git', ['checkout', currentBranch]);
};
