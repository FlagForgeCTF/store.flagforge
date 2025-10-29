import { useEffect } from "react";
import { CheckCircle, Package, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OrderSuccessProps {
  orderId?: string;
  paymentMethod: 'cod' | 'esewa';
  totalAmount: number;
  onContinueShopping: () => void;
  customerEmail?: string;
}

export function OrderSuccess({ 
  orderId, 
  paymentMethod, 
  totalAmount, 
  onContinueShopping,
  customerEmail 
}: OrderSuccessProps) {
  const { toast } = useToast();

  useEffect(() => {
    // Show success toast when component mounts
    toast({
      title: "🎉 Order placed successfully!",
      description: paymentMethod === 'cod' 
        ? "Your order will be delivered and you can pay with cash."
        : "We'll verify your payment and process your order within 24 hours.",
    });
  }, [toast, paymentMethod]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)} / Rs. ${(amount * 140).toLocaleString('en-IN')}`;
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Order Confirmed!
      </h2>
      
      {orderId && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Order ID: <span className="font-mono font-medium">#{orderId}</span>
        </p>
      )}

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Package className="w-4 h-4" />
          <span>Total: {formatCurrency(totalAmount)}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <CreditCard className="w-4 h-4" />
          <span>Payment: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'eSewa/FonePay'}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>
            {paymentMethod === 'cod' 
              ? 'Delivery in 2-3 business days' 
              : 'Processing within 24 hours'
            }
          </span>
        </div>
      </div>

      {customerEmail && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Order confirmation sent to {customerEmail}
        </p>
      )}

      <Button 
        onClick={onContinueShopping}
        className="w-full bg-red-500 hover:bg-red-600 text-white"
      >
        Continue Shopping
      </Button>
    </div>
  );
}