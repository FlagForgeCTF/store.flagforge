import { Link } from "react-router-dom";
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  ShoppingBag,
  Mail,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/flagforge/",
      icon: <LinkedinIcon className="w-5 h-5 text-[#0077B5]" />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/flag.forge/",
      icon: <InstagramIcon className="w-5 h-5 text-[#E4405F]" />,
    },
    {
      name: "GitHub",
      url: "https://github.com/FlagForgeCTF/",
      icon: <GithubIcon className="w-5 h-5 text-[#181717] dark:text-[#ffffff]" />,
    },
  ];

  return (
    <footer className="bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="sm:flex sm:items-center sm:justify-between relative">
          {/* Brand Section */}
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="/flagforge-logo.png" alt="logo" height={60} width={60} className="h-15 w-15" />
            <div>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-foreground transition-colors duration-300">
                FlagForge
              </span>
              <span className="block text-xs text-muted-foreground -mt-1">
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
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-300"
                aria-label={`Visit our ${social.name} page`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-muted-foreground sm:mb-0 transition-colors duration-300">
            <li>
              <Link to="/products" className="hover:underline me-4 md:me-6">
                Products
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:underline me-4 md:me-6">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline me-4 md:me-6">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-border sm:mx-auto lg:my-3 transition-colors duration-300" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlagForge Store. All rights reserved.
          </span>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <ShoppingBag className="w-4 h-4 mr-1" />
              Secure checkout
            </span>
            <span className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              contact@flagforge.xyz
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
