
const path = require('path');
const fs = require('fs');
const { Promise } = require('bluebird');

const fileExists = (filePath) => {
  return new Promise((res) => {
    fs.open(filePath, 'r', (err) => {
      if(err) return res(false);
      res(true);
    });
  });
};

exports.override = function(server) {
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: async (req, rep) => {
      let file = req.params.file || 'index.html';
      const filePath = path.resolve(`${__dirname}/../static/${file}`);
      if(await fileExists(filePath))
        return rep.file(filePath);
      else
        return rep.file(path.resolve(`${__dirname}/../static/index.html`));
    }
  });
};