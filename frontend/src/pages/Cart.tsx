import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Plus, Minus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDualCurrency } from "@/lib/currency";

export default function Cart() {
  const cart = useStore((state) => state.cart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const { toast } = useToast();

  const handleQuantityChange = (productId: string, newQuantity: number, selectedSize?: string, customName?: string) => {
    if (newQuantity === 0) {
      removeFromCart(productId, selectedSize, customName);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(productId, newQuantity, selectedSize, customName);
    }
  };

const handleRemoveItem = (
  productId: string,
  selectedSize?: string,
  customName?: string,
  productName?: string
) => {    removeFromCart(productId, selectedSize, customName);
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart.`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to="/products" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCart}
                className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize || 'no-size'}-${item.customName || 'no-name'}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {item.category}
                      {item.selectedSize && ` • Size: ${item.selectedSize}`}
                      {item.customName && ` • Name: ${item.customName}`}
                    </p>
                    <p className="text-sm font-bold text-red-500 dark:text-red-500">
                      {formatDualCurrency(item.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.selectedSize, item.customName)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleQuantityChange(item.id, Math.min(10, item.quantity + 1), item.selectedSize, item.customName)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleRemoveItem(item.id, item.selectedSize, item.customName, item.name)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {formatDualCurrency(getTotalPrice())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-red-500 dark:text-red-500">
                      {formatDualCurrency(getTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium mb-3">
                  Proceed to Checkout
                </Button>
              </Link>
              
              <Link to="/products">
                <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}