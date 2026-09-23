const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  slug: String,
  name: String,
  category: String,
  price: Number,
  oldPrice: Number,
  discount: Number,
  stock: { type: Number, default: 1 },
  sizes: [String],
  colors: [String],
  image: String
}, { strict: false, timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);