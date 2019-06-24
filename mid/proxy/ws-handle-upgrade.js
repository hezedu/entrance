
const WebSocket = require('ws');
const wsProxy = require('./lib/ws-proxy');

const wsServer = new WebSocket.Server({ noServer: true });


wsServer.on('connection', function connection(ws, req, distUrl) {
  wsProxy(ws, req, distUrl);
});

function handleUpgrade(req, socket, head, distDomain) {
  wsServer.handleUpgrade(req, socket, head, function done(ws) {
    // _console.log('distDomain', distDomain + req.url);
    wsServer.emit('connection', ws, req, distDomain + req.url);
  });
}

module.exports = handleUpgrade;
