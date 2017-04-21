
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
      token: await createToken(foundUser),
      moderator: foundUser.moderator,
      admin: foundUser.admin
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
      token: await createToken(createdUser),
      moderator: createdUser.moderator,
      admin: createdUser.admin
    };
  }
  catch(x) {
    console.error(x);
    return boom.wrap(new Error('There was an issue registering. Please try again later.'));
  }
};

exports.getUsers = async function(server) {
  const { user } = server.db;
  try {
    return await user.find({}, {
      username: 1,
      admin: 1,
      moderator: 1
    });
  }
  catch(x) {
    console.error(x);
    return boom.wrap(x);
  }
};

exports.saveUser = async function({ username, moderator, admin }, server) {
  const { user } = server.db;
  try {
    await user.update(
      { username: username },
      { $set: { username, moderator, admin } }
    );
    return { update: 'success' };
  }
  catch(x) {
    console.error(x);
    return boom.wrap(x);
  }
};
