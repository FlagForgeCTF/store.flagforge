import cloudinary from '../config/cloudinary.js';
import Order from '../models/Order.js';

// Upload payment screenshot
export const uploadPaymentScreenshot = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'flagforge-payments', // Organize uploads in a folder
          transformation: [
            { width: 800, height: 800, crop: 'limit' }, // Resize large images
            { quality: 'auto' }, // Optimize quality
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.json({
      message: 'Screenshot uploaded successfully',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload screenshot', 
      error: error.message 
    });
  }
};

// Submit payment proof with screenshot
export const submitPaymentProof = async (req, res) => {
  try {
    const { orderId, paymentScreenshotUrl, paymentMethod = 'esewa' } = req.body;

    if (!orderId || !paymentScreenshotUrl) {
      return res.status(400).json({ 
        message: 'Order ID and payment screenshot are required' 
      });
    }

    // Find and update the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order with payment proof
    order.paymentScreenshotUrl = paymentScreenshotUrl;
    order.paymentStatus = 'pending'; // Will be verified manually
    order.paymentMethod = paymentMethod;
    
    const updatedOrder = await order.save();

    res.json({
      message: 'Payment proof submitted successfully',
      order: {
        id: updatedOrder._id,
        status: updatedOrder.status,
        paymentStatus: updatedOrder.paymentStatus,
      },
    });
  } catch (error) {
    console.error('Payment proof submission error:', error);
    res.status(500).json({ 
      message: 'Failed to submit payment proof', 
      error: error.message 
    });
  }
};