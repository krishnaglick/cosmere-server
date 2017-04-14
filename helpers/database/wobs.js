
exports.findWob = async function(searchTerm, server) {
  const { wob } = server.db;
  const results = await wob.find({
    tags: new RegExp(searchTerm, 'gi'),
    conversation: new RegExp(searchTerm, 'gi')
  });
  return results;
};

exports.saveWob = async function(path, username) {
  throw 'Write me';
  const { files } = this.db;
  return await files.create({ path, username });
};
