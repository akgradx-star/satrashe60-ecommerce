require('dotenv').config();
const connectDB = require('./src/config/database');
const Product = require('./src/models/Product');

// Aapke saare kapdo ka data
const MASTER_PRODUCTS = [
  { id: 1, slug: "linen-shirt-top", name: "Linen Shirt Top", category: "Tops", price: 149, oldPrice: 599, discount: 75, stock: 1, sizes: ["S", "M", "L", "XL"], colors: ["White", "Black"], image: "/dress1.png" },
  { id: 2, slug: "black-ribbed-top", name: "Black Ribbed Top", category: "Tops", price: 129, oldPrice: 499, discount: 74, stock: 1, sizes: ["S", "M", "L", "XL"], colors: ["Black", "Beige", "Brown"], image: "/dress2.png" },
  { id: 3, slug: "tie-knot-shirt", name: "Tie Knot Shirt", category: "Tops", price: 159, oldPrice: 599, discount: 73, stock: 1, sizes: ["S", "M", "L", "XL"], colors: ["Black", "Beige"], image: "/dress3.png" },
  { id: 4, slug: "printed-co-ord-set", name: "Printed Co-ord Set", category: "Co-ord Sets", price: 299, oldPrice: 999, discount: 70, stock: 1, sizes: ["S", "M", "L", "XL"], colors: ["White", "Beige", "Black"], image: "/dress4.png" },
  { id: 5, slug: "oversized-tee", name: "Oversized Tee", category: "Tops", price: 149, oldPrice: 499, discount: 70, stock: 1, sizes: ["S", "M", "L", "XL"], colors: ["Beige", "Black"], image: "/dress1.png" },
  { id: 6, slug: "boho-printed-top", name: "Boho Printed Top", category: "Tops", price: 169, oldPrice: 599, discount: 72, stock: 0, sizes: ["S", "M", "L", "XL"], colors: ["Black", "Brown", "Red"], image: "/dress2.png" }
];

async function seedDatabase() {
  try {
    // 1. Database se connect karo
    await connectDB();
    console.log("Database connected for seeding...");

    // 2. Agar pehle se koi kachra hai toh delete karo
    await Product.deleteMany();
    console.log("Purana data clear kiya...");

    // 3. Naye products daalo
    await Product.insertMany(MASTER_PRODUCTS);
    console.log("🎉 Saare kapde successfully MongoDB mein add ho gaye!");

    // 4. Script band kar do
    process.exit();
  } catch (error) {
    console.error("Error seeding data: ", error);
    process.exit(1);
  }
}

seedDatabase();