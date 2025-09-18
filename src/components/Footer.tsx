import { Link } from "react-router-dom";
import {
  Linkedin,
  Instagram,
  Github,
  ShoppingBag,
  Mail,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/flagforge/",
      icon: <Linkedin className="w-5 h-5 text-[#0077B5]" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/flag.forge/",
      icon: <Instagram className="w-5 h-5 text-[#E4405F]" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/FlagForgeCTF/",
      icon: <Github className="w-5 h-5 text-[#181717] dark:text-[#ffffff]" />,
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-12 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between relative">
          {/* Brand Section */}
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="/flagforge-logo.png" alt="logo" className="h-12 w-auto" />
            <div>
              <span className="self-center text-xl font-semibold whitespace-nowrap text-gray-700 dark:text-gray-300">
                FlagForge
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 pt-1">
                STORE
              </span>
            </div>
          </Link>

          {/* Social Media Icons in the middle */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-lg"
                aria-label={`Visit our ${social.name} page`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 dark:text-gray-400 sm:mb-0">
            <li>
              <Link to="/cart" className="hover:text-red-500 transition-all duration-300 ease-in-out hover:scale-105 me-4 md:me-6">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500 transition-all duration-300 ease-in-out hover:scale-105 me-4 md:me-6">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                onClick={scrollToTop}
                className="hover:text-red-500 transition-all duration-300 ease-in-out hover:scale-105 me-4 md:me-6"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 relative">
          <div className="hidden md:block"></div>
          <span className="text-[14px] text-gray-600 dark:text-gray-400 absolute left-1/2 transform -translate-x-1/2">
            © Maintained By Shyena Inc.
          </span>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Secure checkout
            </span>
            <a
              href="mailto:contact@flagforge.xyz"
              className="flex items-center hover:text-red-500"
            >
              <Mail className="w-4 h-4 mr-1" />
              contact@flagforge.xyz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
