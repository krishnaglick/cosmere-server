
const boom = require('boom');

exports.login = async function({ username, password }) {
  const { users } = this.db;
  const { helpers } = this.app;
  const user = await (users.findOne({ username }).exec());
  if(!user) {
    return boom.badRequest('Username is incorrect or does not exist!');
  }
  if(password === user.password) {
    return {
      token: await helpers.createToken(user.username)
    };
  }
  return boom.badRequest('Incorrect password provided');
};

exports.register = async function({ username, password }) {
  const { users } = this.db;
  const { helpers } = this.app;
  await users.create({ username, password });
  return {
    token: await helpers.createToken(username)
  };
};
