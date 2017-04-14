
const boom = require('boom');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  try {
    const token = await helpers.register(req.payload);
    rep({token});
  }
  catch(x) {
    rep(boom.wrap(x));
  }
};

exports.method = 'POST';
