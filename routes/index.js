
const globby = require('globby');
const bluebird = require('bluebird');
const path = require('path');
const _ = require('lodash');
const boom = require('boom');

const handlePres = async (req, rep, pres, handler) => {
  const { pres: preHelpers } = req.server.app;
  for(let i = 0; i < pres.length; i++) {
    try {
      if(!await preHelpers[pres[i]](req))
        return rep(boom.badRequest('Unauthorized!'));
    }
    catch(x) {
      return rep(boom.badRequest(x));
    }
  }

  return await handler(req, rep);
};

module.exports = async function(server) {
  const routes = _.map(await globby(__dirname + '/**/*.js'), p => path.resolve(p));
  const filteredRouteFiles = _.filter(routes, fileName => fileName !== __filename);
  return await bluebird.all(_.map(filteredRouteFiles, async (route) => {
    const { handler, method, override, pres = [], config = {} } = require(route);
    if(override)
      return await override(server);

    const routePath = route.split(__dirname)[1].split('.js')[0].replace(path.sep + 'index', '').split(path.sep).join('/');
    server.route({
      config,
      method,
      path: routePath,
      handler: (pres && pres.length) ? (req, rep) => handlePres(req, rep, pres, handler) : handler
    });
  }));
};
