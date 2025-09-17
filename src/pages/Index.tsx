import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { ArrowRight, Star, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const products = useStore((state) => state.products);
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our most popular cybersecurity merchandise, loved by CTF champions worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="tech-glow transition-bounce hover:scale-105 group">
              <Link to="/products">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
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
      
      {/* Trust Badges */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <Shield className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Secure Checkout</h3>
              <p className="text-muted-foreground">256-bit SSL encryption protects your data</p>
            </div>
            
            <div className="space-y-4">
              <Users className="w-12 h-12 text-accent mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Community Driven</h3>
              <p className="text-muted-foreground">Designed by and for the CTF community</p>
            </div>
            
            <div className="space-y-4">
              <Star className="w-12 h-12 text-cyber-green mx-auto" />
              <h3 className="text-xl font-semibold text-foreground">Premium Quality</h3>
              <p className="text-muted-foreground">High-quality materials and printing</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                  FlagForge
                </span>
                <span className="block text-xs text-muted-foreground -mt-1">
                  STORE
                </span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Premium cybersecurity merchandise for CTF champions and security enthusiasts worldwide.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 FlagForge Store. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
