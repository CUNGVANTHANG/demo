import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Shop, ProductDetail } from './pages/Shop';
import { Cart, Checkout, Success } from './pages/Cart';
import { BlogList, BlogDetail, RecipeList, RecipeDetail, PromotionList, PromotionDetail, OriginList, OriginDetail } from './pages/Extra';
import { CartItem, Product } from './types';

// --- Context Setup ---
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const ScrollToTop = () => {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      <Router>
        <ScrollToTop /> {/* Ensure page scrolls to top on navigation */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              
              {/* Level 2 & 3: Shop -> Product Detail */}
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              
              {/* Level 2 & 3: Blog -> Blog Detail */}
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              
              {/* Level 2 & 3: Recipes -> Recipe Detail */}
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              
              {/* Level 2 & 3: Promotions -> Promotion Detail */}
              <Route path="/promotions" element={<PromotionList />} />
              <Route path="/promotions/:id" element={<PromotionDetail />} />

               {/* Level 2 & 3: Origins -> Origin Detail */}
               <Route path="/origins" element={<OriginList />} />
               <Route path="/origins/:id" element={<OriginDetail />} />

              {/* Level 4: Cart -> Checkout -> Success */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              
              {/* Fallback */}
              <Route path="*" element={<div className="p-10 text-center">404 - Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
