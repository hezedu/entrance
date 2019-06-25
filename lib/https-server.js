const https = require('https');
// const virgin = require('virgin');

const {domains, sslOpts} = require('../config');
const {getDomain} = require('./util');
const httpProxy = require('../mid/proxy/http-request-proxy');
const wsProxy = require('../mid/proxy/ws-handle-upgrade');
const port = 443;
const portSuffix = ':' + port;
const app = function(req, res){
  // if(virgin.letsencryptGenCert(req, res)){
  //   return;
  // }
  let domain = getDomain(req.headers.host, portSuffix);
  domain = domains.get(domain);
  if(domain){
    httpProxy(req, res, domain.to);
    // if(domain.type === 'proxy'){
    //   httpProxy(req, res, domain.to);
    // } else {
    //   res.end('unknown domain type');
    // }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
}


const server = https.createServer(sslOpts, app);

server.on('upgrade', function upgrade(req, socket, head) {
  let domain = getDomain(req.headers.host, portSuffix);
  domain = domains.get(domain);
  if (domain && domain.wsTo) {
    wsProxy(req, socket, head, domain.wsTo);
  } else {
    socket.destroy();
  }
});

server.listen(port, function(){
  console.info('Https server listen on', port);
});
