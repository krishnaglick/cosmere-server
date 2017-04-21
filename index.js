
const hapi = require('hapi');
const fs = require('fs');

const server = new hapi.Server();
server.connection({ port: require('./config').port });
if(process.env.NODE_ENV === 'prod') {
  try {
    const tls = {
      key: fs.readFileSync('/etc/letsencrypt/live/cosmeretheory.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/cosmeretheory.com/cert.pem')
    };
    server.connection({
      port: 443,
      tls
    });
  }
  catch(x) {
    console.error('Error getting SSL information!', x);
  }
}

(async () => {
  try {
    const config = require('./config');
    await require('./plugins')(server, config);
    await require('./pres')(server, config);
    await require('./routes')(server, config);
    await require('./helpers')(server, config);
    await new Promise((res, rej) => {
      server.start((err) => {
        if(err) return rej(err);
        server.log(`Server running at: ${server.info.uri}`);
        res();
      });
    });
  }
  catch(x) {
    console.error(x);
    process.exit(1);
  }
})();

