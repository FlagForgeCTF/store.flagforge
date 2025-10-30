import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from './middleware/cors.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors);
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'FlagForge Store API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Email test page
app.get('/test-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-email.html'));
});

// Screenshot test page
app.get('/test-screenshot', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-screenshot.html'));
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;