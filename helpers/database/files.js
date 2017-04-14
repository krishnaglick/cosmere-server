
const _ = require('lodash');

exports.getFiles = async function(username) {
  const { files } = this.db;
  const dbFiles =  await (files.find({ username }, '_id path').exec());
  return _.map(dbFiles, ({_id, path}) => {
    return {
      _id,
      path: path.split('uploads')[1]
    };
  });
};

exports.getFile = async function(username, _id) {
  const { files } = this.db;
  const { path } = await (files.findOne({ _id, username }, 'path').exec());
  return path;
};

exports.deleteFile = async function(username, _id) {
  const { files } = this.db;
  return await (files.find({ _id, username }).delete.exec());
};

exports.saveFile = async function(path, username) {
  const { files } = this.db;
  return await files.create({ path, username });
};

exports.getFileFromPath = async function(path, username) {
  const { files } = this.db;
  return await files.findOne({ path, username }, '_id path');
};
