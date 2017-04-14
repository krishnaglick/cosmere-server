
const boom = require('boom');
const argon2 = require('argon2');
const salt = new Buffer(require('../../config').salt);

exports.login = async function({ username, password }) {
  const { users } = this.db;
  const { helpers } = this.app;
  const user = await users.findOne({ username });
  if(!user) {
    return boom.badRequest('Username is incorrect or does not exist!');
  }
  if(await argon2.verify(user.password, password)) {
    return {
      token: await helpers.createToken(user.username)
    };
  }
  return boom.badRequest('Incorrect password provided');
};

exports.register = async function({ username, password }, server) {
  const { users } = this.db;
  const { helpers } = this.app;
  try {
    password = await argon2.hash(password, salt);
    await users.create({ username, password });
    return {
      token: await helpers.createToken(username)
    };
  }
  catch(x) {
    server.error(x);
    return boom.wrap(new Error('There was an issue registering. Please try again later.'));
  }
};
