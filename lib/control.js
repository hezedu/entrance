const http = require('http');
const path = require('path');
const fs = require('fs');
const { noop } = require('./util');
const virgin = require('virgin');
const {controlPort, certbotWebRoot, letsencryptRootUrl} = require('../const');

virgin.letsencryptGenCert = letsencryptGenCert;

const isUnixSock = typeof controlPort !== 'number';

if(isUnixSock){
  try {
    fs.unlinkSync(controlPort)
  } catch(e){
    // not have.
  }
}



const app = function(req, res){
  if(req.method === 'POST'){
    switch(req.path){
      case 'startCertbotptRenew':
        virgin.letsencryptGenCert = letsencryptGenCert;
        return;
      case 'endCertbotptRenew':
        virgin.letsencryptGenCert = noop;
        return;
    }
  }
  res.statusCode = 404;
  res.end('Not found');
}


const server = http.createServer(app);



server.listen(controlPort, function(){
  if(isUnixSock){
    fs.chmodSync(controlPort, 600);
  }
  console.info('Control server listen on', controlPort);
});

function letsencryptGenCert(req, res){
  if(req.url.indexOf(letsencryptRootUrl) === 0){
    // const sub = req.url.substr(letsencryptRootUrl.length);
    const fsPath = path.join(certbotWebRoot, '.' + req.url);
    fs.readFile(fsPath, 'utf-8', function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(err.message);
        return;
      }
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    })
    return true;
  }
}