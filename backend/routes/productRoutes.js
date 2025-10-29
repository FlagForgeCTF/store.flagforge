import express from 'express';
import { getProducts, getProductById, createProduct, seedProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.post('/seed', seedProducts);

export default router;