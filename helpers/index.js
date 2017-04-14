
const globby = require('globby');
const bluebird = require('bluebird');
const path = require('path');
const _ = require('lodash');

module.exports = async function(server) {
  server.app.helpers = {};
  const helpers = _.map(await globby(__dirname + '/**/*.js'), p => path.resolve(p));
  const filteredHelpers = _.filter(helpers, fileName => fileName !== __filename);
  return await bluebird.all(_.map(filteredHelpers, async (helperFile) => {
    const helper = require(helperFile);
    _.forEach(Object.keys(helper), (key) => {
      server.app.helpers[key] = helper[key].bind(server);
    });
  }));
};
