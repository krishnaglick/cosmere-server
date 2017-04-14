
const _ = require('lodash');

exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  const { searchTerm } = _.merge({}, req.query, req.params, req.payload);
  if(!searchTerm)
    return rep([]);
  const searchResults = await helpers.findWob(searchTerm);
  return rep(searchResults);
};

exports.method = ['GET', 'POST'];
