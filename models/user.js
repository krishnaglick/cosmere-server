
module.exports = {
  username: { type: String, index: true, unique: true },
  password: String,
  moderator: { type: Boolean, default: false }
};
