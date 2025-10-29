import Order from '../models/Order.js';

// Get all orders with payment screenshots (for admin review)
export const getOrdersWithPayments = async (req, res) => {
    try {
        const orders = await Order.find({
            paymentScreenshotUrl: { $exists: true, $ne: null }
        }).sort({ createdAt: -1 });

        const ordersWithPayments = orders.map(order => ({
            id: order._id,
            customer: order.customer,
            totalAmount: order.totalAmount,
            totalAmountNpr: order.totalAmountNpr,
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod,
            paymentScreenshotUrl: order.paymentScreenshotUrl,
            createdAt: order.createdAt,
            items: order.items,
        }));

        res.json(ordersWithPayments);
    } catch (error) {
        console.error('Error fetching orders with payments:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update payment status (approve/reject)
export const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { paymentStatus, status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (paymentStatus) order.paymentStatus = paymentStatus;
        if (status) order.status = status;

        const updatedOrder = await order.save();

        res.json({
            message: 'Payment status updated successfully',
            order: {
                id: updatedOrder._id,
                paymentStatus: updatedOrder.paymentStatus,
                status: updatedOrder.status,
            },
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};