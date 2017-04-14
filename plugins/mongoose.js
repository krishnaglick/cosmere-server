
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird').Promise;

module.exports = async function(server, config) {
  const connectedMongoose = mongoose.connect(config.mongoUrl + '/' + config.mongoNamespace);
  server.db = await require('../models')(connectedMongoose);
};
