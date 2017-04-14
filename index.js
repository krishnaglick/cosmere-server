
const hapi = require('hapi');

const server = new hapi.Server();
server.connection({ port: require('./config').port });

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

