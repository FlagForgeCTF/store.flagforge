import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'tshirt' | 'sticker';
  description: string;
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: '1',
          name: 'FlagForge Logo Tee',
          price: 15,
          image: '/src/assets/tshirt-flagforge.jpg',
          category: 'tshirt',
          description: 'Show your FlagForge pride with our premium logo tee. Perfect for CTF competitions and daily wear. Made from high-quality cotton blend for maximum comfort.',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          id: '2',
          name: 'FlagForge Logo Sticker',
          price: 1,
          image: '/src/assets/stickers-pack.jpg',
          category: 'sticker',
          description: 'Premium waterproof sticker featuring the FlagForge logo and cybersecurity-themed designs. Perfect for laptops, water bottles, and more.',
        },

      ],
      cart: [],
      
      addToCart: (product, selectedSize) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id && item.selectedSize === selectedSize
          );
          
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id && item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1, selectedSize }],
            };
          }
        });
      },
      
      removeFromCart: (productId, selectedSize) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === productId && item.selectedSize === selectedSize)
          ),
        }));
      },
      
      updateQuantity: (productId, quantity, selectedSize) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId && item.selectedSize === selectedSize
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter((item) => item.quantity > 0),
        }));
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'flagforge-cart',
    }
  )
);