
const _ = require('lodash');

exports.authenticateUser = function(req) {
  const { token: tokenData } = req.state;
  const { helpers } = req.server.app;
  try {
    const { token } = JSON.parse(decodeURIComponent(tokenData));
    const { username, moderator: isModerator, admin: isAdmin } = helpers.decryptToken(token);
    _.merge(req.state, { username, isModerator, isAdmin });
    return true;
  }
  catch(x) {
    console.error(x);
    if(x.message === 'jwt expired')
      throw 'Token Expired!';
    throw x;
  }
};

exports.isModerator = async function(req) {
  const { isModerator } = req.state;
  return isModerator;
};

exports.isAdmin = async function(req) {
  const { isAdmin } = req.state;
  return !!isAdmin;
};
