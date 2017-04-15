
const jwt = require('jsonwebtoken');

const { secret } = require('../../config');

exports.createToken = async function({ username, moderator }) {
  return jwt.sign({ username, moderator }, secret, { expiresIn: '8h' });
};

exports.verifyToken = function(token) {
  try {
    jwt.verify(token, secret);
    return true;
  }
  catch(x) {
    console.error(x.toString());
    return false;
  }
};

exports.decryptToken = function(token) {
  try {
    const tokenData = jwt.decode(token);
    return tokenData;
  }
  catch(x) {
    console.error(x.toString());
    return false;
  }
};
