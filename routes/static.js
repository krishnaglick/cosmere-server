const path = require('path');

exports.override = function(server) {
  server.route({
    method: 'GET',
    path: '/{file*}',
    handler: (req, rep) => {
      let file = req.params.file || 'index.html';
      if(['songs', 'login', 'register'].includes(req.params.file))
        file = 'index.html';
      const filePath = path.resolve(`${__dirname}/../static/${file}`);
      return rep.file(filePath);
    }
  });
};