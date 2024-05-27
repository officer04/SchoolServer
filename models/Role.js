const { Schema, model } = require('mongoose');

const Role = new Schema({
  title: { type: String, unique: true },
});

module.exports = model('Role', Role);
