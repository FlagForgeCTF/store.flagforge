import express from 'express';
import { getOrdersWithPayments, updatePaymentStatus } from '../controllers/adminController.js';

const router = express.Router();

// Get all orders with payment screenshots
router.get('/orders/payments', getOrdersWithPayments);

// Update payment status
router.put('/orders/:orderId/payment-status', updatePaymentStatus);

export default router;