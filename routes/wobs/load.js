
const _ = require('lodash');
const tags = require('../../utility/tags');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const params = _.merge({}, req.query, req.params, req.payload);
  (async () => {
    const WoBs = await helpers.loadWobs(params, tags);
    try {
      await helpers.saveWoBs(params, WoBs);
    }
    catch(x) {}
  })();
  return rep('Loading WoBs, this is a long-running task so check the server logs for the result!');
};

exports.method = ['GET', 'POST'];

exports.pres = ['authenticateUser', 'isAdmin'];
