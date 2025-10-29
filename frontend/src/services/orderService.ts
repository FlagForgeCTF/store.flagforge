import { api } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

export interface OrderData {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    selectedSize?: string;
    customName?: string;
    category: string;
  }>;
  totalAmount: number;
  paymentMethod: 'cod' | 'esewa';
  paymentScreenshotUrl?: string;
}

export interface OrderResult {
  success: boolean;
  orderId?: string;
  message: string;
  error?: string;
}

class OrderService {
  /**
   * Create a Cash on Delivery order
   */
  async createCODOrder(orderData: OrderData): Promise<OrderResult> {
    try {
      // Show processing toast
      toast({
        title: "Processing order...",
        description: "Creating your cash on delivery order.",
      });

      const response = await api.createOrder({
        ...orderData,
        paymentMethod: 'cod'
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: `HTTP ${response.status}: ${response.statusText}` }));
        console.error('Order creation failed:', error);
        throw new Error(error.message || 'Order creation failed');
      }

      const result = await response.json();

      // Show success toast
      toast({
        title: "Order placed successfully! 🎉",
        description: `Order #${result.orderId || 'N/A'} will be delivered and you can pay with cash.`,
      });

      return {
        success: true,
        orderId: result.orderId,
        message: result.message || 'Order placed successfully'
      };

    } catch (error) {
      console.error('COD Order creation error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      
      toast({
        title: "Order failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage,
        message: 'Order creation failed'
      };
    }
  }

  /**
   * Upload payment screenshot to Cloudinary
   */
  async uploadPaymentScreenshot(file: File): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
    try {
      // Validate file
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      toast({
        title: "Uploading screenshot...",
        description: "Please wait while we upload your payment proof.",
      });

      const response = await api.uploadScreenshot(file);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      const data = await response.json();
      
      return {
        success: true,
        imageUrl: data.imageUrl
      };

    } catch (error) {
      console.error('Screenshot upload error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Create order with payment screenshot
   */
  async createOrderWithPayment(orderData: OrderData, screenshotFile: File): Promise<OrderResult> {
    try {
      // First upload the screenshot
      const uploadResult = await this.uploadPaymentScreenshot(screenshotFile);
      
      if (!uploadResult.success || !uploadResult.imageUrl) {
        return {
          success: false,
          error: uploadResult.error || 'Screenshot upload failed',
          message: 'Failed to upload payment proof'
        };
      }

      // Then create the order
      toast({
        title: "Creating order...",
        description: "Processing your order with payment proof.",
      });

      const response = await api.createOrder({
        ...orderData,
        paymentMethod: 'esewa',
        paymentScreenshotUrl: uploadResult.imageUrl
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: `HTTP ${response.status}: ${response.statusText}` }));
        console.error('Order creation failed:', error);
        throw new Error(error.message || 'Order creation failed');
      }

      const result = await response.json();

      toast({
        title: "Payment submitted successfully! 🎉",
        description: `Order #${result.orderId || 'N/A'} created! We'll verify your payment within 24 hours.`,
      });

      return {
        success: true,
        orderId: result.orderId,
        message: result.message || 'Order created successfully'
      };

    } catch (error) {
      console.error('Order with payment creation error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create order';
      
      toast({
        title: "Order creation failed",
        description: errorMessage,
        variant: "destructive",
      });

      return {
        success: false,
        error: errorMessage,
        message: 'Order creation failed'
      };
    }
  }

  /**
   * Validate order data before submission
   */
  validateOrderData(orderData: Partial<OrderData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Customer validation
    if (!orderData.customer?.firstName?.trim()) {
      errors.push('First name is required');
    }
    if (!orderData.customer?.lastName?.trim()) {
      errors.push('Last name is required');
    }
    if (!orderData.customer?.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.customer.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!orderData.customer?.phone?.trim()) {
      errors.push('Phone number is required');
    }

    // Shipping address validation
    if (!orderData.shippingAddress?.address?.trim()) {
      errors.push('Address is required');
    }
    if (!orderData.shippingAddress?.city?.trim()) {
      errors.push('City is required');
    }

    // Items validation
    if (!orderData.items || orderData.items.length === 0) {
      errors.push('Cart is empty');
    }

    // Payment method validation
    if (!orderData.paymentMethod) {
      errors.push('Payment method is required');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const orderService = new OrderService();