var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
module.exports = function(root) {
  return function(req, res){
    var serve = serveStatic(root, { 'index': ['index.html'] });
    serve(req, res, finalhandler(req, res))
  }
}