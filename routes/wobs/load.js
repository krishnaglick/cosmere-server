
const _ = require('lodash');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const params = _.merge({}, req.query, req.params, req.payload);
  (async () => {
    const WoBs = await helpers.loadWobs(params);
    await helpers.saveWoBs(WoBs);
  })();
  return rep('Loading WoBs, this is a long-running task so check the server logs for the result!');
};

exports.method = ['GET', 'POST'];
