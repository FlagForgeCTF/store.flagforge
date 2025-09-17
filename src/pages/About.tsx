import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Award, Code, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 mb-20">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">About FlagForge Store</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">
              Empowering
            </span>{" "}
            <br />
            <span className="text-foreground">
              Cybersecurity Champions
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            FlagForge Store is the official merchandise hub for the cybersecurity community. 
            We create premium gear that celebrates the art of ethical hacking, CTF competitions, 
            and the pursuit of digital security excellence.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that cybersecurity is more than just a profession—it's a mindset, 
              a community, and a way of thinking that deserves to be celebrated. Our merchandise 
              represents the values of curiosity, persistence, and ethical problem-solving 
              that define the best in our field.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every design is crafted with input from real CTF players, security researchers, 
              and ethical hackers who understand what it means to think outside the box 
              and protect the digital world.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-lg border tech-glow">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Precision</h3>
              <p className="text-sm text-muted-foreground">
                Every detail matters in both security and design
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border tech-glow">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Built by and for the cybersecurity community
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border tech-glow">
              <Code className="w-8 h-8 text-cyber-green mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Constantly evolving like the threats we face
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border tech-glow">
              <Lock className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">
                Trust and protection in everything we do
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted/30 rounded-2xl p-12 mb-20">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What We Stand For
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <Award className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Quality First</h3>
                <p className="text-muted-foreground">
                  Premium materials and craftsmanship that match the excellence 
                  of the cybersecurity community
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <Shield className="w-16 h-16 text-accent mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Ethical Values</h3>
                <p className="text-muted-foreground">
                  Supporting responsible disclosure, ethical hacking, and 
                  positive contributions to digital security
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <Users className="w-16 h-16 text-cyber-green mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">Community Focus</h3>
                <p className="text-muted-foreground">
                  Every purchase supports CTF education, security research, 
                  and the growth of our community
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Join the Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wear your passion for cybersecurity with pride. Browse our collection 
            and find the perfect gear to represent your skills and values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="tech-glow transition-bounce hover:scale-105"
            >
              <Link to="/products">
                Shop Collection
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="tech-glow transition-bounce hover:scale-105"
            >
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}