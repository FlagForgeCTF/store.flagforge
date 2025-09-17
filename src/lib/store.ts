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
          price: 25,
          image: '/src/assets/tshirt-flagforge.jpg',
          category: 'tshirt',
          description: 'Show your FlagForge pride with our premium logo tee. Perfect for CTF competitions and daily wear.',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          id: '2',
          name: 'CTF Champion Tee',
          price: 28,
          image: '/src/assets/tshirt-champion.jpg',
          category: 'tshirt',
          description: 'Celebrate your CTF victories with this champion-themed shirt. For the elite competitors.',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          id: '3',
          name: 'Hacker Mindset Tee',
          price: 26,
          image: '/src/assets/tshirt-hacker.jpg',
          category: 'tshirt',
          description: 'Embrace the hacker philosophy with this binary-coded design. Think like a hacker, dress like one.',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
          id: '4',
          name: 'FlagForge Logo Sticker Pack',
          price: 8,
          image: '/src/assets/stickers-pack.jpg',
          category: 'sticker',
          description: 'Premium sticker pack featuring the FlagForge logo and cybersecurity-themed designs.',
        },
        {
          id: '5',
          name: 'Binary Code Sticker',
          price: 5,
          image: '/src/assets/stickers-pack.jpg',
          category: 'sticker',
          description: 'Express your binary fluency with this sleek binary code sticker.',
        },
        {
          id: '6',
          name: 'Lock Icon Sticker',
          price: 5,
          image: '/src/assets/stickers-pack.jpg',
          category: 'sticker',
          description: 'Secure your laptop with this iconic cybersecurity lock sticker.',
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