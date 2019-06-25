const fs = require('fs');
const path = require('path');
const {certbotWebRoot, letsencryptRootUrl} = require('../const');

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

module.exports = letsencryptGenCert;