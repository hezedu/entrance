
exports.noop = function(){};
exports.getDomain = function(host, portSuffix){
  let i = host.lastIndexOf(portSuffix);
  if(i !== -1){
    return host.substr(0, i);
  }
  return host;
}

// const fs = require('fs');
// const os = require('os');
// exports.getShmTmpPath = function(){
//   const shmDir = '/dev/shm';
//   try {
//     let stat = fs.statSync(shmDir);
//     if(stat.isDirectory){
//       return shmDir;
//     }
//     return os.tmpdir();
//   }catch(e) {
//     return os.tmpdir();
//   }
// }