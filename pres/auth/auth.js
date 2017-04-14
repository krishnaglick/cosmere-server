
exports.authenticateUser = function(req) {
  const { token } = req.state;
  const { helpers } = req.server.app;
  try {
    //TODO: Check resulting data against provided username.
    helpers.decryptToken(token);
    return true;
  }
  catch(x) {
    if(x.message === 'jwt expired')
      throw 'Token Expired!';
    throw x;
  }
};
