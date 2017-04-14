
module.exports = {
  date: String,
  tags: [ String ],
  conversation: [ String ],
  title: String,
  id: { type: String, index: true, unique: true }
};
