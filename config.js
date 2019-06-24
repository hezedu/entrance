const fs = require('fs');
const path = require('path');
const domains = new Map([
  ["127.0.0.1", {
    type: 'proxy',
    to: 'http://192.168.56.101:3001',
    wsTo: 'ws://192.168.56.101:3001'
  }],
  ["linux-remote.org", {
    type: 'proxy',
    to: 'http://127.0.0.1:3005'
  }],
  ["demo.linux-remote.org", {
    type: 'proxy',
    to: 'http://127.0.0.1:3001',
    wsTo: 'ws://127.0.0.1:3001'
  }], 
  ["register.linux-remote.org", {
    type: 'proxy',
    to: 'http://127.0.0.1:3000'
  }]
]);
const conf = {
  // 403: {
  //   ssl: true,
  //   sslOpts: {},
  // },
  domains,

  sslOpts: {
    cert: fs.readFileSync(path.join(__dirname, '../sss-output/127.0.0.1/server.crt')),
    key: fs.readFileSync(path.join(__dirname, '../sss-output/127.0.0.1/server.key'))
  }

}

module.exports = conf;