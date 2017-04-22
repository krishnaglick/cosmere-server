
const _ = require('lodash');
const boom = require('boom');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { wob, username } = _.merge({}, req.query, req.params, req.payload, req.state);
  console.log(_.merge({}, req.query, req.params, req.payload, req.state));
  if(!wob)
    return rep(boom.badRequest());

  try {
    await helpers.saveWob(wob);
    await helpers.trackChange(wob, username);
    return rep({ saved: true });
  }
  catch(x) {
    console.error(x);
    return rep(boom.wrap(x));
  }
};

exports.method = ['POST'];

exports.pres = ['authenticateUser', 'isModerator'];
