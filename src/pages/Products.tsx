import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { Star } from "lucide-react";

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
            <span className="text-foreground">
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
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Loved by CTF Champions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what the cybersecurity community says about our gear
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Chen",
                role: "CTF Team Captain",
                content: "The FlagForge tees are incredibly comfortable and the designs are top-notch. Perfect for competitions and daily wear!",
                rating: 5
              },
              {
                name: "Sarah Kim",
                role: "Security Researcher", 
                content: "Love the hacker mindset shirt! The quality is amazing and it's a great conversation starter at conferences.",
                rating: 5
              },
              {
                name: "Mike Rodriguez",
                role: "Penetration Tester",
                content: "The sticker pack is perfect for decorating my laptop. High-quality materials and awesome cybersecurity designs.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border tech-glow hover:shadow-cyber transition-smooth">
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}