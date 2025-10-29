import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/store";
import { ArrowLeft, Upload, CheckCircle, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { orderService, type OrderData } from "@/services/orderService";

export default function Payment() {
  const clearCart = useStore((state) => state.clearCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Get order data from navigation state (passed from checkout)
  const orderData: OrderData | undefined = location.state?.orderData;

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentScreenshot) {
      toast({
        title: "Payment screenshot required",
        description: "Please upload a screenshot of your payment.",
        variant: "destructive",
      });
      return;
    }

    if (!orderData) {
      toast({
        title: "Order data missing",
        description: "Please go back to checkout and try again.",
        variant: "destructive",
      });
      navigate("/checkout");
      return;
    }

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      const result = await orderService.createOrderWithPayment(orderData, paymentScreenshot);
      
      if (result.success) {
        // Clear cart and navigate
        clearCart();
        navigate("/products");
      }
      
    } catch (error) {
      console.error('Payment submission error:', error);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />     
 <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/checkout" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Checkout
          </Link>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Complete Your Payment</h1>

          {/* Order Summary */}
          {orderData && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Items:</span>
                  <span className="text-gray-900 dark:text-white">
                    {orderData.items.reduce((total: number, item: any) => total + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                  <span className="text-red-500 dark:text-red-500 font-semibold">
                    ${orderData.totalAmount.toFixed(2)} / Rs. {(orderData.totalAmount * 140).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Customer:</span>
                  <span className="text-gray-900 dark:text-white">
                    {orderData.customer.firstName} {orderData.customer.lastName}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Scan QR Code to Pay</h2>
            
            {/* QR Code Image */}
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <img
                  src="/payment.png"
                  alt="Payment QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
              <p>Scan this QR code with your eSewa or FonePay app to complete the payment</p>
              <p className="mt-2 font-medium">After payment, please upload a screenshot below</p>
            </div>
          </div>

          {/* Upload Screenshot Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Payment Screenshot</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="screenshot" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Payment Screenshot *
                </Label>
                <div className="mt-1">
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                  />
                </div>
                {paymentScreenshot && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm text-green-600 dark:text-green-400">
                      ✓ {paymentScreenshot.name} selected ({(paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                    {previewUrl && (
                      <div className="relative w-32 h-32 border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Payment screenshot preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <ImageIcon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !paymentScreenshot}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isUploading ? 'Uploading...' : 'Processing...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Submit Payment Proof</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Payment Instructions:</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>1. Scan the QR code with your eSewa or FonePay app</li>
              <li>2. Complete the payment</li>
              <li>3. Take a screenshot of the payment confirmation</li>
              <li>4. Upload the screenshot using the form above</li>
              <li>5. We'll verify and process your order within 24 hours</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}