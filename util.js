exports.getDomain = function(host, portSuffix){
  let i = host.lastIndexOf(portSuffix);
  if(i !== -1){
    return host.substr(0, i);
  }
  return host;
}