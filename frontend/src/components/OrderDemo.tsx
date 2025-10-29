import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { orderService, type OrderData } from '@/services/orderService';
import { OrderSuccess } from '@/components/OrderSuccess';
import { useOrderForm } from '@/hooks/useOrderForm';

/**
 * Demo component showing complete order flow with proper feedback
 * This demonstrates the patterns you should use in your actual checkout/payment pages
 */
export function OrderDemo() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderResult, setOrderResult] = useState<{ success: boolean; orderId?: string; totalAmount: number; paymentMethod: 'cod' | 'esewa' } | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  
  const {
    formData,
    selectedPayment,
    handleInputChange,
    setSelectedPayment,
    validateForm,
    resetForm,
    showValidationErrors,
  } = useOrderForm();

  const { toast } = useToast();

  // Mock cart data for demo
  const mockCartItems = [
    {
      id: '1',
      name: 'Custom T-Shirt',
      price: 25.99,
      image: '/tshirt-example.jpg',
      quantity: 2,
      selectedSize: 'L',
      customName: 'John Doe',
      category: 'tshirt'
    }
  ];

  const totalAmount = mockCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive",
        });
        return;
      }

      setPaymentScreenshot(file);
      toast({
        title: "Screenshot selected",
        description: `${file.name} ready for upload`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      showValidationErrors(validation.errors);
      return;
    }

    const orderData: OrderData = {
      customer: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
      },
      items: mockCartItems,
      totalAmount,
      paymentMethod: selectedPayment as 'cod' | 'esewa',
    };

    setIsProcessing(true);

    try {
      let result;

      if (selectedPayment === 'cod') {
        // Cash on Delivery flow
        result = await orderService.createCODOrder(orderData);
      } else {
        // eSewa/FonePay flow with screenshot
        if (!paymentScreenshot) {
          toast({
            title: "Payment screenshot required",
            description: "Please upload a screenshot of your payment.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        result = await orderService.createOrderWithPayment(orderData, paymentScreenshot);
      }

      if (result.success) {
        setOrderResult({
          success: true,
          orderId: result.orderId,
          totalAmount,
          paymentMethod: selectedPayment as 'cod' | 'esewa'
        });
        resetForm();
        setPaymentScreenshot(null);
      }

    } catch (error) {
      console.error('Order submission error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    setOrderResult(null);
  };

  if (orderResult?.success) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <OrderSuccess
          orderId={orderResult.orderId}
          paymentMethod={orderResult.paymentMethod}
          totalAmount={orderResult.totalAmount}
          onContinueShopping={handleContinueShopping}
          customerEmail={formData.email}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Demo</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              required
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              rows={3}
            />
          </div>

          <div className="mt-4">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Method</h2>
          
          <Select value={selectedPayment} onValueChange={setSelectedPayment}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cod">Cash on Delivery</SelectItem>
              <SelectItem value="esewa">eSewa/FonePay</SelectItem>
            </SelectContent>
          </Select>

          {/* Screenshot upload for eSewa/FonePay */}
          {selectedPayment === 'esewa' && (
            <div className="mt-4">
              <Label htmlFor="screenshot">Payment Screenshot *</Label>
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="mt-1"
              />
              {paymentScreenshot && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  ✓ {paymentScreenshot.name} selected
                </p>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
          
          <div className="space-y-2">
            {mockCartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <span>Place Order</span>
          )}
        </Button>
      </form>
    </div>
  );
}