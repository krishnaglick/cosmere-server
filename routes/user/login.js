
const _ = require('lodash');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { username, password } = _.isEmpty(req.query) ? req.payload : req.query;
  rep(await helpers.login({ username, password }));
};

exports.method = ['GET', 'POST'];
