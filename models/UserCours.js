const { Schema, model } = require('mongoose');

const UserCours = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  coursId: {  type: Schema.Types.ObjectId, required: true },
});

module.exports = model('user_courses', UserCours);
