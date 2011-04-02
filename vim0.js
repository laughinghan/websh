var vim = require('child_process').spawn('vim', process.argv.slice(2));
var lol = require('fs').createWriteStream('lol');
vim.stdout.on('data', function(data) {
  process.stdout.write(data);
});
require('tty').setRawMode(true);
process.stdin.on('data', function(data) {
  vim.stdin.write(data);
});
process.stdin.resume();
