import Product from '../models/Product.js';
import { getCurrencyDisplay } from '../utils/currency.js';

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ inStock: true });
    
    // Transform MongoDB documents to match frontend interface
    const transformedProducts = products.map(product => {
      const currencyDisplay = getCurrencyDisplay(product.price);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        priceNpr: currencyDisplay.npr,
        image: product.image,
        category: product.category,
        description: product.description,
        sizes: product.sizes || undefined,
      };
    });
    
    res.json(transformedProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Transform MongoDB document to match frontend interface
    const currencyDisplay = getCurrencyDisplay(product.price);
    const transformedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      priceNpr: currencyDisplay.npr,
      image: product.image,
      category: product.category,
      description: product.description,
      sizes: product.sizes || undefined,
    };
    
    res.json(transformedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create or seed products (for development)
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Seed initial products
export const seedProducts = async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    const products = [
      {
        id: '1',
        name: 'FlagForge Tshirt',
        price: 15,
        image: '/images/tshirt-flagforge.jpg',
        category: 'tshirt',
        description: 'Show your FlagForge pride with our premium logo tee. Perfect for CTF competitions and daily wear. Made from high-quality cotton blend for maximum comfort.',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        inStock: true,
      },
      {
        id: '2',
        name: 'FlagForge Sticker',
        price: 1,
        image: '/images/stickers-pack.jpg',
        category: 'sticker',
        description: 'Premium waterproof sticker featuring the FlagForge logo. Perfect for laptops, water bottles, and more.',
        inStock: true,
      },
    ];
    
    await Product.insertMany(products);
    res.json({ message: 'Products seeded successfully', count: products.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};