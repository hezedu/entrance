const http = require('http');
const virgin = require('virgin');
const {domains} = require('../config');
const {getDomain} = require('./util');
const DAY_30_TIME = 1000 * 60 * 60 * 24 * 30;
const redirectMaxAge = 'max-age=' + DAY_30_TIME;
const port = 80;
const portSuffix = ':' + port;
const httpApp = function(req, res){
  if(virgin.letsencryptGenCert(req, res)){
    return;
  }
  let domain = getDomain(req.headers.host, portSuffix);
  if(domains.has(domain)){
    // _console.log('301', domain);
    res.writeHead(301, {
      'Cache-control': redirectMaxAge,
      Location: 'https://' + domain + req.url
    })
    res.end('');
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
}

const server = http.createServer(httpApp);

server.listen(port, function(){
  console.info('Http server listen on', port);
});
