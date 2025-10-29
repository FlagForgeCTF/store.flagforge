import Order from '../models/Order.js';
import { sendOrderEmail } from '../config/email.js';
import { getCurrencyDisplay } from '../utils/currency.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { 
      customer, 
      shippingAddress, 
      items, 
      totalAmount, 
      paymentMethod = 'cod' 
    } = req.body;

    // Validate required fields
    if (!customer || !customer.email || !customer.firstName || !customer.lastName || !customer.phone) {
      return res.status(400).json({ 
        message: 'Missing required customer information' 
      });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city) {
      return res.status(400).json({ 
        message: 'Missing required shipping address information' 
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        message: 'Order must contain at least one item' 
      });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ 
        message: 'Invalid total amount' 
      });
    }

    const order = new Order({
      customer: {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
      },
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
      },
      items: items.map(item => {
        const itemCurrencyDisplay = getCurrencyDisplay(item.price);
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          priceNpr: itemCurrencyDisplay.npr,
          image: item.image,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          customName: item.customName,
          category: item.category,
        };
      }),
      totalAmount,
      totalAmountNpr: getCurrencyDisplay(totalAmount).npr,
      paymentMethod,
      status: 'pending',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
    });

    const savedOrder = await order.save();

    // Send confirmation email
    try {
      await sendOrderEmail(savedOrder, customer.email);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: savedOrder._id,
        status: savedOrder.status,
        paymentStatus: savedOrder.paymentStatus,
        totalAmount: savedOrder.totalAmount,
        createdAt: savedOrder.createdAt,
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all orders (for admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};