import { Link } from "react-router-dom";
import { type Product } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-wrapper group max-w-sm mx-auto">
      <div className="product-element-top relative overflow-hidden rounded-lg bg-muted aspect-[3/4]">
        <Link to={`/product/${product.id}`} className="product-image-link block h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
        
        {/* Select Button - appears on hover at bottom */}
        <div className="wd-add-btn absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.id}`}
            className="block w-full bg-black text-white text-center py-2 px-3 font-medium text-sm"
          >
            Select
          </Link>
        </div>
      </div>
      
      {/* Size Swatches for T-shirts */}
      {product.sizes && (
        <div className="wd-swatches-grid flex gap-2 mt-3">
          {product.sizes.map((size) => (
            <div key={size} className="wd-swatch">
              <span className="inline-block px-2 py-1 text-xs border rounded-full hover:bg-muted transition-colors cursor-pointer">
                {size}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {/* Product Info */}
      <h3 className="wd-entities-title mt-3 mb-2">
        <Link 
          to={`/product/${product.id}`}
          className="text-base font-semibold hover:text-primary transition-colors line-clamp-2"
        >
          {product.name}
        </Link>
      </h3>
      
      <span className="price text-lg font-bold text-primary">
        ${product.price}
      </span>
    </div>
  );
}