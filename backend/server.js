require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Frontend aur Backend ko jodne wala gate
const connectDB = require('./src/config/database');
const bcrypt = require('bcryptjs'); 
const User = require('./src/models/User'); 

const app = express();

app.use(cors()); // CORS chalu kiya
app.use(express.json()); // Frontend ka data padhne ke liye

// Database connect karna
connectDB();

// Test link
app.get('/', (req, res) => {
  res.send("SATRASHE60 Backend is Running successfully!");
});

// ==========================================
// 🚀 USER SIGNUP ROUTE (Naya Account Banana)
// ==========================================
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Yeh email pehle se registered hai!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Account successfully ban gaya!" });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server mein kuch gadbad hai." });
  }
});

// ==========================================
// 🔑 USER LOGIN ROUTE (Account mein aana)
// ==========================================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check karein ki user database mein hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Yeh email registered nahi hai. Pehle Sign Up karein!" });
    }

    // 2. Password check karein (Lock khol kar match karein)
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password galat hai!" });
    }

    // 3. Agar sab theek hai, toh Website ko user ka data bhejein
    res.status(200).json({ 
      message: "Login successful!", 
      user: { 
        name: user.name, 
        email: user.email 
      } 
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server mein kuch gadbad hai." });
  }
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});