
const _ = require('lodash');

exports.findWob = async function(searchTerm, server) {
  const { wob } = server.db;
  const results = await wob.find({
    tags: new RegExp(searchTerm, 'gi'),
    conversation: new RegExp(searchTerm, 'gi')
  }).sort({ date: 1 });
  return _.map(results, (result) => delete result._id && result);
};

exports.saveWob = async function(WoB, server) {
  const { wob } = server.db;
  delete WoB._id;
  const { id } = WoB;
  return await wob.update({ id }, WoB, { upsert: true });
};

exports.trackChange = async function(newWoB, username, server) {
  const { edits } = server.db;
  const { date, title, conversation, tags, id } = newWoB;
  await edits.create({
    wob: { date, title, conversation, tags, id },
    username
  });
};
