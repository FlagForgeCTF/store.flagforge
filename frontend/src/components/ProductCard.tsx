import { Link } from "react-router-dom";
import { type Product } from "@/lib/store";
import { formatDualCurrency } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-wrapper group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-200 dark:hover:border-red-700 hover:-translate-y-2 transition-all duration-500 ease-out">
      <div className="product-element-top relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700 aspect-[3/4] mb-4">
        <Link to={`/product/${product.id}`} className="product-image-link block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>
        
        {/* Select Button - appears on hover at bottom */}
        <div className="wd-add-btn absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0">
          <Link
            to={`/product/${product.id}`}
            className="block w-full bg-black hover:bg-red-600 text-white text-center py-2 px-2 font-semibold text-xs transition-all duration-300 ease-in-out"
          >
            Select Options
          </Link>
        </div>
      </div>
      

      
      {/* Product Info */}
      <h3 className="wd-entities-title mb-2">
        <Link 
          to={`/product/${product.id}`}
          className="text-base font-semibold text-gray-900 dark:text-white hover:text-red-500 dark:hover:text-red-500 transition-all duration-300 ease-in-out line-clamp-2 hover:scale-105 inline-block"
        >
          {product.name}
        </Link>
      </h3>
      
      <div className="price text-sm font-bold text-red-500 dark:text-red-500 transition-all duration-300 ease-in-out group-hover:scale-110 inline-block">
        {formatDualCurrency(product.price)}
      </div>
    </div>
  );
}