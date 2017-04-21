
module.exports = async function(server) {
  if(process.env.NODE_ENV !== 'prod')
    return;
  server.register({
    register: require('hapi-require-https'),
    options: {}
  });
};
