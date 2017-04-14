
const globby = require('globby');
const bluebird = require('bluebird');
const path = require('path');
const _ = require('lodash');

module.exports = async function(server) {
  server.app.pres = {};
  const pres = _.map(await globby(__dirname + '/**/*.js'), p => path.resolve(p));
  const filteredPres = _.filter(pres, fileName => fileName !== __filename);
  return await bluebird.all(_.map(filteredPres, async (preFile) => {
    const pre = require(preFile);
    _.forEach(Object.keys(pre), (key) => {
      server.app.pres[key] = pre[key].bind(server);
    });
  }));
};
