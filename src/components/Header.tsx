import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useStore } from "@/lib/store";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const getTotalItems = useStore((state) => state.getTotalItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/flagforge-logo.png"
              alt="FlagForge Logo"
              className="h-10 w-auto lg:h-16 object-contain"
            />
            <div>
              <span className="text-xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                FlagForge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:text-red-500 dark:hover:text-red-500 hover:scale-105 ${isActive(item.path) ? "text-red-500 dark:text-red-500" : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 dark:bg-red-500 rounded-full transition-all duration-300 ease-in-out" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle - Desktop Only */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <Link to="/cart">
              <Button
                variant="outline"
                size="icon"
                className="relative border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 ease-in-out"
              >
                <ShoppingCart className="h-4 w-4 transition-transform duration-300 ease-in-out hover:scale-110" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium transition-all duration-300 ease-in-out">
                    {getTotalItems()}
                  </span>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out hover:text-red-500 dark:hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 ${isActive(item.path)
                      ? "text-red-500 dark:text-red-500 bg-gray-50 dark:bg-gray-800"
                      : "text-gray-600 dark:text-gray-300"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
