import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-background/90 dark:bg-background/95" />
      </div>
      
      {/* Binary Pattern Overlay */}
      <div className="absolute inset-0 binary-pattern opacity-50 dark:opacity-30" />
      
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Official FlagForge Merchandise</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">
              Gear Up
            </span>{" "}
            <br />
            <span className="text-foreground">
              for CTF Dominance
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Represent the cybersecurity community with premium FlagForge merchandise. 
            From champion tees to hacker stickers, show your CTF pride.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              asChild
              size="lg" 
              className="tech-glow transition-bounce hover:scale-105 group"
            >
              <Link to="/products">
                Shop Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="tech-glow transition-bounce hover:scale-105"
            >
              View Catalog
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">1000+</div>
              <div className="text-sm text-muted-foreground">CTF Players Equipped</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">Premium</div>
              <div className="text-sm text-muted-foreground">Quality Materials</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <Shield className="w-8 h-8 text-cyber-green" />
              </div>
              <div className="text-2xl font-bold text-foreground">Secure</div>
              <div className="text-sm text-muted-foreground">Payment & Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}