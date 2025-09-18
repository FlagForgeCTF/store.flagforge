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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
      <Header />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900 py-20 lg:py-12 transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 transition-all duration-500 ease-in-out hover:scale-105">
  <span className="text-red-500 transition-colors duration-300 ease-in-out">FlagForge</span>{' '}
  <span className="text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">Collection</span>
</h1>

          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300 ease-in-out">
            Premium cybersecurity merchandise for CTF champions
          </p>
        </div>
      </section>

      <main className="bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-5 py-2">

          {/* Filters */}
          <div className="flex justify-center space-x-4 mb-12">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all'
                ? "bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg font-medium"
              }
            >
              All Products
            </Button>
            <Button
              variant={filter === 'tshirt' ? 'default' : 'outline'}
              onClick={() => setFilter('tshirt')}
              className={filter === 'tshirt'
                ? "bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg font-medium"
              }
            >
              T-Shirts
            </Button>
            <Button
              variant={filter === 'sticker' ? 'default' : 'outline'}
              onClick={() => setFilter('sticker')}
              className={filter === 'sticker'
                ? "bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
                : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-lg font-medium"
              }
            >
              Stickers
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                No products found
              </h3>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 ease-in-out">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Loved by CTF Champions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what the cybersecurity community says about our gear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ayush Pantha",
                role: "Security Research Analyst, Bhairav Tech",
                content: "The tshirt is awesome with its minimal design and dark theme!",
                rating: 4
              },
              {
                name: "Dikshya Shrestha",
                role: "CAP | CNSP | Bug Hunter",
                content: "It's minimal design with my name on my back is really good and unique!",
                rating: 5
              },
              {
                name: "Manash Hada",
                role: "Penetration Tester",
                content: "Having each player’s name on the back of the T-shirt, matched with the team’s theme color, looks awesome!",
                rating: 4
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-200 dark:hover:border-red-700 hover:-translate-y-2 transition-all duration-500 ease-out">
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current transition-transform duration-300 ease-in-out hover:scale-125" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
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