
const _ = require('lodash');
const path = require('path');
const fs = require('fs');

exports.findWob = async function(searchTerm, server) {
  const { wob } = server.db;
  const results = await wob.find({
    tags: new RegExp(searchTerm, 'gi'),
    conversation: new RegExp(searchTerm, 'gi')
  });
  return _.map(results, (result) => delete result._id && result);
};

exports.saveWob = async function(WoB, server) {
  const { wob } = server.db;
  delete WoB._id;
  const { id } = WoB;
  server.app.helpers.updateStaticWoBs();
  return await wob.update({ id }, WoB, { upsert: true });
};

exports.updateStaticWoBs = async function(server) {
  const { wob } = server.db;
  const WoBs = await wob.find();
  await (async () => {
    return new Promise((res, rej) => {
      const dataPath = path.resolve('./utility/data.json');
      const data = JSON.stringify(WoBs, null, 2);
      fs.writeFile(dataPath, data, (err) => {
        if(err) rej(err);
        res();
      });
    });
  })();
};

exports.trackChange = async function(newWoB, username, server) {
  const { edits } = server.db;
  const { date, title, conversation, tags, id } = newWoB;
  await edits.create({
    wob: { date, title, conversation, tags, id },
    username
  });
};
