import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

const products = [
  {
    id: '1',
    name: 'FlagForge Tshirt',
    price: 15,
    image: '/src/assets/tshirt-flagforge.jpg',
    category: 'tshirt',
    description: 'Show your FlagForge pride with our premium logo tee. Perfect for CTF competitions and daily wear. Made from high-quality cotton blend for maximum comfort.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: '2',
    name: 'FlagForge Sticker',
    price: 1,
    image: '/src/assets/stickers-pack.jpg',
    category: 'sticker',
    description: 'Premium waterproof sticker featuring the FlagForge logo. Perfect for laptops, water bottles, and more.',
    inStock: true,
  },
];

async function seedProducts() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();