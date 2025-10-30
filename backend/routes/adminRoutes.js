import express from 'express';
import { getOrdersWithPayments, updatePaymentStatus } from '../controllers/adminController.js';
import { sendCustomMail } from '../config/email.js';

const router = express.Router();

// Get all orders with payment screenshots
router.get('/orders/payments', getOrdersWithPayments);

// Update payment status
router.put('/orders/:orderId/payment-status', updatePaymentStatus);

// Test email functionality
router.post('/test-email', async (req, res) => {
  try {
    const { to, subject, message } = req.body;
    
    if (!to || !subject || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields: to, subject, message' 
      });
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>🧪 Email Test from FlagForge Store</h2>
        <p>${message}</p>
        <hr>
        <p><small>Sent at: ${new Date().toLocaleString()}</small></p>
      </div>
    `;

    await sendCustomMail(to, subject, htmlContent);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      sentTo: to,
      sentAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test email failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send test email', 
      error: error.message 
    });
  }
});

export default router;