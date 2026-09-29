require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Frontend aur Backend ko jodne wala gate
const connectDB = require('./src/config/database');
const bcrypt = require('bcryptjs'); 
const User = require('./src/models/User'); 
const Order = require('./src/models/Order');
const Product = require('./src/models/Product'); // 👕 Naya Product model

const app = express();

app.use(cors()); // CORS chalu kiya
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Frontend ka data padhne ke liye

// Database connect karna
connectDB();

// Test link
app.get('/', (req, res) => {
  res.send("SATRASHE60 Backend is Running successfully!");
});

// ==========================================
// 🚀 USER SIGNUP ROUTE
// ==========================================
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Yeh email pehle se registered hai!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Account successfully ban gaya!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server mein kuch gadbad hai." });
  }
});

// ==========================================
// 🔑 USER LOGIN ROUTE
// ==========================================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Yeh email registered nahi hai." });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password galat hai!" });
    }
    res.status(200).json({ message: "Login successful!", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server mein kuch gadbad hai." });
  }
});

// ==========================================
// 🛒 NEW ORDER ROUTE
// ==========================================
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order successfully save ho gaya!", order: newOrder });
  } catch (error) {
    console.error("Order Save Error:", error);
    res.status(500).json({ message: "Order save karne mein error aayi." });
  }
});

// ==========================================
// ➕ NEW PRODUCT ROUTE (Naya kapda DB mein save karna - FIXED MRP)
// ==========================================
app.post('/api/products', async (req, res) => {
  try {
    const productData = req.body;
    
    // Frontend se 'mrp' aa raha hai, usko database ke 'oldPrice' mein set karna
    if (productData.mrp) {
      productData.oldPrice = productData.mrp;
    }

    const newProduct = new Product(productData);
    await newProduct.save();
    res.status(201).json({ message: "Product successfully live ho gaya!", product: newProduct });
  } catch (error) {
    console.error("Product Save Error:", error);
    res.status(500).json({ message: "Product save karne mein error aayi." });
  }
});

// ==========================================
// 📦 GET ORDERS ROUTE (Admin panel ke liye)
// ==========================================
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); 
    res.status(200).json(orders);
  } catch (error) {
    console.error("Orders Fetch Error:", error);
    res.status(500).json({ message: "Orders laane mein error aayi." });
  }
});

// ==========================================
// 🔄 UPDATE ORDER STATUS
// ==========================================
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { orderStatus: status },
      { new: true } 
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order nahi mila!" });
    }
    res.status(200).json({ message: "Status update ho gaya!", order: updatedOrder });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ message: "Status update karne mein error aayi." });
  }
});

// ==========================================
// 👕 GET PRODUCTS ROUTE (Saare kapde frontend ko bhejna)
// ==========================================
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find(); 
    res.status(200).json(products);
  } catch (error) {
    console.error("Products Fetch Error:", error);
    res.status(500).json({ message: "Products laane mein error aayi." });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});