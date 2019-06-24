const { noop } = require('./lib/util');
const virgin = require('virgin');
virgin.letsencryptGenCert = noop;


require('./lib/http-server');
require('./lib/https-server');
require('./lib/control');

// _console.log('index');
