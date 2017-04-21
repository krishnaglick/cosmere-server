
const jwt = require('jsonwebtoken');

const { secret } = require('../../config');

exports.createToken = async function({ username, moderator, admin }) {
  return jwt.sign({ username, moderator, admin }, secret, { expiresIn: '8h' });
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
    return jwt.decode(token);
  }
  catch(x) {
    console.error(x.toString());
    return false;
  }
};
