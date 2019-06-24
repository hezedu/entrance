var httpProxy = require('./http-request-proxy');
module.exports = function(disDomain, server) {
  return function(req, res){
    req._proxydistDomain = disDomain;
    httpProxy(req, res);
  }
}