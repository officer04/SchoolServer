const { Schema, model } = require('mongoose');

const Lesson = new Schema({
  title: { type: String, required: true },
  lessonNumber: { type: Number, require: true},
  moduleId: { type: Schema.Types.ObjectId },
  youtubeVideoId: { type: String, require: true },
});

module.exports = model('lessons', Lesson);
