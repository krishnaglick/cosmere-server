const path = require('path');

exports.override = function(server) {
  server.route({
    method: 'GET',
    path: '/uploads/{song}',
    handler: (req, rep) => {
      const { song } = req.params;
      const filePath = path.resolve(`${__dirname}/../uploads/${song}`);
      return rep.file(path.resolve(filePath));
    }
  });
};