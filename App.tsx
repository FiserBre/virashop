import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Configurator from './pages/Configurator';
import Checkout from './pages/Checkout';
import Cart from './components/Cart';
import { Product, CartItem } from './types';
import { AuthProvider } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';

const App: React.FC = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const addAllToCart = (products: Product[]) => {
    setCart(prev => {
      let newCart = [...prev];
      products.forEach(product => {
        const existingIndex = newCart.findIndex(item => item.id === product.id);
        if (existingIndex > -1) {
          newCart[existingIndex].quantity += 1;
        } else {
          newCart.push({ ...product, quantity: 1 });
        }
      });
      return newCart;
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <AuthProvider>
        <HashRouter>
          <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 font-sans text-slate-900 dark:text-white">
            <Navbar cart={cart} setIsCartOpen={setIsCartOpen} />
            
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop addToCart={addToCart} />} />
                <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/configurator" element={<Configurator addAllToCart={addAllToCart} />} />
                <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
              </Routes>
            </main>

            <Cart 
              isOpen={isCartOpen} 
              onClose={() => setIsCartOpen(false)} 
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          </div>
        </HashRouter>
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;