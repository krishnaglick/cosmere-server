
const inert = require('inert');

module.exports = async function(server) {
  return new Promise((res, rej) => {
    server.register(inert, (err) => {
      if(err) return rej(err);
      res();
    });
  });
};
