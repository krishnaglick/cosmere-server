
const good = require('good');

module.exports = async function(server) {
  server.register({
    register: good,
    options: {
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*'
            }]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      },
    }
  });
};
