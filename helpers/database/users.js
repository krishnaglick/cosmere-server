
const boom = require('boom');
const argon2 = require('argon2');
const salt = new Buffer(require('../../config').salt);

exports.login = async function({ username, password }, server) {
  const { user } = server.db;
  const { createToken } = server.app.helpers;
  const foundUser = await user.findOne({ username });
  if(!foundUser) {
    return boom.badRequest('Username is incorrect or does not exist!');
  }
  if(await argon2.verify(foundUser.password, password)) {
    return {
      token: await createToken(foundUser)
    };
  }
  return boom.badRequest('Incorrect password provided');
};

exports.register = async function({ username, password }, server) {
  const { user } = server.db;
  const { createToken } = server.app.helpers;
  try {
    password = await argon2.hash(password, salt);
    const createdUser = await user.create({ username, password });
    return {
      token: await createToken(createdUser)
    };
  }
  catch(x) {
    console.error(x);
    return boom.wrap(new Error('There was an issue registering. Please try again later.'));
  }
};
