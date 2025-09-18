import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { ShoppingCart, Plus, Minus, ArrowLeft, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-3 py-4">
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Product not found</h1>
            <Link to="/products" className="text-sm text-red-500 dark:text-red-500 hover:underline">
              Back to products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.category === 'tshirt' && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize || undefined);
    }

    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-3 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 mb-4">
          <Link to="/products" className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
            <ArrowLeft className="w-3 h-3" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-2">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{product.name}</h1>
              <p className="text-lg font-bold text-red-500 dark:text-red-500 mb-2">${product.price}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection for T-shirts */}
            {product.sizes && (
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-8 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-red-500 focus:ring-red-500">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size} className="text-sm">
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 w-7 p-0 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* Product Details Table */}
            <div className="entry-content border-t border-gray-200 dark:border-gray-700 pt-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Product Details</h3>
              <table className="woocommerce-product-attributes w-full text-xs">
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-1.5 pr-2 font-medium text-gray-600 dark:text-gray-400">Category</th>
                    <td className="py-1.5 capitalize text-gray-900 dark:text-white">{product.category}</td>
                  </tr>
                  {product.sizes && (
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-1.5 pr-2 font-medium text-gray-600 dark:text-gray-400">Available Sizes</th>
                      <td className="py-1.5 text-gray-900 dark:text-white">
                        {product.sizes.map((size, index) => (
                          <span key={size}>
                            {size}
                            {index < product.sizes!.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-1.5 pr-2 font-medium text-gray-600 dark:text-gray-400">Material</th>
                    <td className="py-1.5 text-gray-900 dark:text-white">Premium Cotton Blend</td>
                  </tr>
                  <tr>
                    <th className="text-left py-1.5 pr-2 font-medium text-gray-600 dark:text-gray-400">Care Instructions</th>
                    <td className="py-1.5 text-gray-900 dark:text-white">Machine wash cold, tumble dry low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}