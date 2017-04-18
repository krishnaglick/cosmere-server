
exports.authenticateUser = function(req) {
  const { token } = req.state;
  const { helpers } = req.server.app;
  try {
    helpers.verifyToken(token);
    const { username } = helpers.decryptToken(token);
    req.state.username = username;
    return true;
  }
  catch(x) {
    if(x.message === 'jwt expired')
      throw 'Token Expired!';
    throw x;
  }
};

exports.isModerator = async function(req) {
  const { token } = req.headers;
  const { helpers } = req.server.app;
  const { moderator } = helpers.decryptToken(token);
  return !!moderator;
};
