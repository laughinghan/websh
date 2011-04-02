var vim = require('child_process').spawn('vim', process.argv.slice(2));
var lol = require('fs').createWriteStream('lol');
vim.stdout.on('data', function(data) {
  String(data).split('').forEach(function(c) {
    lol.write('c: "'+c+'"\n');
    lol.write('c.charCode: '+c.charCodeAt(0)+'\n');
  });
});
require('tty').setRawMode(true);
process.stdin.on('data', function(data) {
  vim.stdin.write(data);
});
process.stdin.resume();
process.on('exit', function() {
  require('tty').setRawMode(false);
});
