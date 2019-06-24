const request = require('request');

request.GET = request.get;
request.POST = request.post;
request.PUT = request.put;
request.DELETE = request.delete;

// use
module.exports = function(req, res, distDomain){

  var x = request[req.method](distDomain + req.url);

  x.on('error', function(err){

    x.abort(); // 代理自己取消.不然如上传文件会一直挂起. 也会触发 1.
    res.status
    res.statusCode = 502;
    res.end('entranceHttpProxyError: ' + err.message);
  });

  // x.on('close', function(){
  // _console.log('x: x on close');
  // })
  // _console.log('x', x)

  // x.on('timeout', () => {
  // _console.log('x: timeout');
  //   x.abort();
  // });
  // x http.ClientRequest
  // x.on('abort', function(){
  //   if(!x._abort_emit_by_proxy_err){
  //     req.destroy();
  // _console.log('x: x on abort');
  //   }
  // });
  // req: http.IncomingMessage
  req.on('aborted', function(){ // 1. 用户取消.比用浏览器人取消上传. 
    x.abort();// 2. 触发代理取消 -> 触发目标服务器 aborted
    // _console.log('proxy: req on aborted');
  });
  req.pipe(x);
  x.pipe(res);
}



