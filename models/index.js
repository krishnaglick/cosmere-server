
const globby = require('globby');
const path = require('path');
const _ = require('lodash');

module.exports = async function(mongoose) {
  const appModels = {};

  const models = _.map(await globby(__dirname + '/**/*.js'), p => path.resolve(p));
  const filteredModels = _.filter(models, fileName => fileName !== __filename);

  _.forEach(filteredModels, (modelPath) => {
    const modelName = modelPath.split('.')[0].split(path.sep).slice(-1)[0];
    const schema = new mongoose.Schema(require(modelPath));
    appModels[modelName] = mongoose.model(modelName, schema);
  });

  return appModels;
};
