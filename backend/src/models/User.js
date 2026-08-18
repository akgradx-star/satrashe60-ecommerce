const mongoose = require('mongoose');

// User ka Data Format (Schema)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ek email se ek hi account banega
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // Account kab bana, uska time save karega

// Model ko export karna taaki hum ise server.js mein use kar sakein
const User = mongoose.model('User', userSchema);
module.exports = User;