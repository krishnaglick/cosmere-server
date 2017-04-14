
const jwt = require('jsonwebtoken');

const { secret } = require('../../config');

exports.createToken = async function(username) {
  return jwt.sign({ username }, secret, { expiresIn: '8h' });
};

exports.decryptToken = function(token) {
  try {
    const tokenData = jwt.verify(token, secret);
    return tokenData;
  }
  catch(x) {
    console.error(x.toString());
    return false;
  }
};
