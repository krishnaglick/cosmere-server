
const globby = require('globby');
const bluebird = require('bluebird');
const path = require('path');
const _ = require('lodash');

module.exports = async function(server, config) {
  const plugins = _.map(await globby(__dirname + '/**/*.js'), p => path.resolve(p));
  const filteredPlugins = _.filter(plugins, fileName => fileName !== __filename);
  return await bluebird.all(_.map(filteredPlugins, async (pluginFile) => {
    return await require(pluginFile)(server, config);
  }));
};
