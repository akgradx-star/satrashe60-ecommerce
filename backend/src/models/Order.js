const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, default: 'Cash On Delivery (COD)' },
  totalAmount: { type: Number, required: true },
  items: { type: Array, default: [] },
  orderStatus: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);