import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";

export default function Products() {
  const products = useStore((state) => state.products);
  const [filter, setFilter] = useState<'all' | 'tshirt' | 'sticker'>('all');

  const filteredProducts = products.filter(product => 
    filter === 'all' || product.category === filter
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="gradient-primary bg-clip-text text-transparent">
              FlagForge
            </span>{" "}
            <span className="text-foreground">Collection</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium cybersecurity merchandise for CTF champions and security enthusiasts
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="tech-glow"
          >
            All Products
          </Button>
          <Button
            variant={filter === 'tshirt' ? 'default' : 'outline'}
            onClick={() => setFilter('tshirt')}
            className="tech-glow"
          >
            T-Shirts
          </Button>
          <Button
            variant={filter === 'sticker' ? 'default' : 'outline'}
            onClick={() => setFilter('sticker')}
            className="tech-glow"
          >
            Stickers
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-muted-foreground">
              No products found
            </h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters
            </p>
          </div>
        )}
      </main>
    </div>
  );
}