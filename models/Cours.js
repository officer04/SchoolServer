const { Schema, model } = require('mongoose');

const Cours = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, default: 'Курс для начинающих' },
  price: { type: Number, required: true, default: 4000 },
  imgUrl: { type: String, require: true, default: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-and-programming-applications-dark-neon_39422-971.jpg?size=626&ext=jpg" },
});

module.exports = model('Cours', Cours);
