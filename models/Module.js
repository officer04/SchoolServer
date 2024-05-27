const { Schema, model } = require('mongoose');

const Module = new Schema({
  title: { type: String, required: true },
  coursId: {  type: Schema.Types.ObjectId, required: true },
});

module.exports = model('modules', Module);
