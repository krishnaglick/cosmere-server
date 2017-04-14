
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = async function(server, config) {
  const connectedMongoose = mongoose.connect(config.mongoUrl);
  server.db = {};

  const fileSchema = new connectedMongoose.Schema({
    path: String,
    username: String
  });
  fileSchema.index({
    path: 1,
    username: 2
  }, {
    unique: true
  });
  server.db.files = connectedMongoose.model('files', fileSchema);

  const userSchema = new connectedMongoose.Schema({
    username: { type: String, index: true },
    password: String
  });

  server.db.users = connectedMongoose.model('user', userSchema);
};
