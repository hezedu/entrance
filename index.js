const virgin = require('virgin');

const letsencryptGenCert = require('./mid/letsencrypt-gen-cert');

virgin.letsencryptGenCert = letsencryptGenCert;


require('./lib/http-server');
require('./lib/https-server');
// require('./lib/control');

// _console.log('index');
