const { Schema, model } = require('mongoose');

const Lesson = new Schema({
  title: { type: String, required: true },
  imgUrl: { type: String, require: true },
  moduleId: { type: Schema.Types.ObjectId },
});

module.exports = model('lessons', Lesson);
