const { Schema, model } = require('mongoose');

const StartCoursInfo = new Schema({
  start: { type: String, required: true },
  duration: { type: String, required: true },
  education: { type: String, required: true },
  cours: { type: String, required: true },
});

module.exports = model('StartCoursInfo', StartCoursInfo);
