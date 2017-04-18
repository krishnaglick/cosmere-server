
const boom = require('boom');
const _ = require('lodash');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const params = _.merge({}, req.query, req.params, req.payload);
  console.log(params);
  try {
    const token = await helpers.register(params);
    rep({token}).code(201);
  }
  catch(x) {
    console.error(x);
    rep(boom.wrap(x));
  }
};

exports.method = 'POST';
