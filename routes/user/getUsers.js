
exports.handler = async function(req, rep) {
  const { helpers } = req.server.app;
  rep(await helpers.getUsers());
};

exports.method = ['GET'];

exports.pres = ['authenticateUser', 'isAdmin'];
