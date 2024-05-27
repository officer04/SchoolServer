const { Schema, model } = require('mongoose');

const Price = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: Array, default: [] },
});

module.exports = model('Price', Price);
