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
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/products" className="text-primary hover:underline">
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <Link to="/products" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl font-bold text-primary mb-4">${product.price}</p>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Size Selection for T-shirts */}
            {product.sizes && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 tech-glow"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Product Details Table */}
            <div className="entry-content border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <table className="woocommerce-product-attributes w-full">
                <tbody>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Category</th>
                    <td className="py-2 capitalize">{product.category}</td>
                  </tr>
                  {product.sizes && (
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Available Sizes</th>
                      <td className="py-2">
                        {product.sizes.map((size, index) => (
                          <span key={size}>
                            {size}
                            {index < product.sizes!.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                    </tr>
                  )}
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Material</th>
                    <td className="py-2">Premium Cotton Blend</td>
                  </tr>
                  <tr>
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Care Instructions</th>
                    <td className="py-2">Machine wash cold, tumble dry low</td>
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