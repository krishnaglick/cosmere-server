
const _ = require('lodash');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const user = _.merge({}, req.query, req.params, req.payload, req.state);
  rep(await helpers.saveUser(user));
};

exports.method = ['GET', 'POST'];

exports.pres = ['authenticateUser', 'isAdmin'];
