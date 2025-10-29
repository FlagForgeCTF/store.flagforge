import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.MAIL_PORT) || 587,
  secure: false, // true if using port 465
  auth: {
    user: process.env.MAIL_USER, // your Brevo email
    pass: process.env.MAIL_PASS, // your Brevo SMTP key
  },
});

/**
 * Send a custom HTML email
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} htmlContent - HTML body
 */
export async function sendCustomMail(to, subject, htmlContent) {
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || '"FlagForge Store" <noreply@flagforge.com>',
      to,
      subject,
      html: htmlContent,
    });
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}

/**
 * Send order confirmation email
 * @param {Object} order - order object with customer, items, totalAmount, etc.
 * @param {string} customerEmail - recipient email
 */
export async function sendOrderEmail(order, customerEmail) {
  const customerName = `${order.customer.firstName} ${order.customer.lastName}`;
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin: 0; font-size: 28px;">FlagForge Store</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">CTF Merchandise</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">Thank you for your order, ${customerName}!</h2>
        <p style="color: #4b5563; margin-bottom: 20px;">Your order has been confirmed and is being processed.</p>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin-top: 0;">Order Details:</h3>
          <p style="margin: 5px 0;"><strong>Order ID:</strong> #${order._id}</p>
          <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'eSewa/FonePay'}</p>
          <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1f2937;">Items Ordered:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Item</th>
                <th style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">Qty</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Price</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">
                    <div>
                      <strong>${item.name}</strong>
                      ${item.selectedSize ? `<br><small style="color: #6b7280;">Size: ${item.selectedSize}</small>` : ''}
                      ${item.customName ? `<br><small style="color: #6b7280;">Custom Name: ${item.customName}</small>` : ''}
                    </div>
                  </td>
                  <td style="padding: 12px; text-align: center; border-bottom: 1px solid #f3f4f6;">${item.quantity}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6;">$${item.price.toFixed(2)}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #f3f4f6;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="color: #1f2937; margin: 0;">Total Amount:</h3>
            <h3 style="color: #dc2626; margin: 0; font-size: 24px;">$${order.totalAmount.toFixed(2)}</h3>
          </div>
        </div>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin-top: 0;">Shipping Address:</h3>
          <p style="margin: 5px 0; color: #4b5563;">
            ${customerName}<br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}<br>
            Phone: ${order.customer.phone}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; margin-bottom: 10px;">
            ${order.paymentMethod === 'cod' 
              ? 'Your order will be delivered and you can pay with cash upon delivery.' 
              : 'We will verify your payment and process your order within 24 hours.'}
          </p>
          <p style="color: #6b7280; margin-bottom: 20px;">
            We'll notify you when your order ships.
          </p>
          <p style="color: #9ca3af; font-size: 14px;">
            Thank you for choosing FlagForge Store!<br>
            For any questions, please contact us at support@flagforge.xyz
          </p>
        </div>
      </div>
    </div>
  `;

  await sendCustomMail(customerEmail, `Order Confirmation - #${order._id}`, htmlContent);
}

export default transporter;