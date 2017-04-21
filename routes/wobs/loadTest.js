
const _ = require('lodash');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const params = _.merge({}, req.query, req.params, req.payload);
  (async () => {
    const WoBs = await helpers.loadWobs(params, ['sel']);
    return rep(WoBs);
  })();
};

exports.method = ['GET', 'POST'];
