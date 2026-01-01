import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, Menu, X, Search, User, LogOut } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  setIsCartOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, setIsCartOpen }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => {
    // Check if location path includes the path (simple check)
    // For shop filters, we check query params manually if needed, but simple path check is okay for styling
    if (path === '/' && location.pathname !== '/') return 'text-slate-500 dark:text-slate-400';
    return location.pathname === path.split('?')[0]
      ? 'text-black dark:text-white font-bold' 
      : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors';
  };

  const navLinks = [
    { name: 'Domů', path: '/' },
    { name: 'Katalog', path: '/shop' },
    { name: 'Muži', path: '/shop?category=Muži' }, 
    { name: 'Ženy', path: '/shop?category=Ženy' },
    { name: 'Doplňky', path: '/shop?category=Doplňky' },
    { name: 'Konfigurátor', path: '/configurator' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-100 dark:border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 -ml-2 text-slate-900 dark:text-white"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>

              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-none flex items-center justify-center text-white dark:text-black font-bold text-lg transform group-hover:rotate-12 transition-transform">
                  <img src="/images/logo.png" alt="logo" />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase hidden sm:block">
                  VIRA
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-sm tracking-wide uppercase ${isActive(link.path)}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-slate-900 dark:text-white hover:opacity-70 transition-opacity hidden sm:block">
                <Search size={20} />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Profile Dropdown / Login Link */}
              <div className="relative hidden sm:block">
                 {isAuthenticated ? (
                   <button 
                     onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                     className="p-2 text-slate-900 dark:text-white hover:opacity-70 transition-opacity flex items-center gap-2"
                   >
                     <User size={20} />
                   </button>
                 ) : (
                   <Link to="/login" className="p-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white hover:opacity-70">
                     Přihlásit
                   </Link>
                 )}

                 {/* Dropdown */}
                 {isAuthenticated && isProfileMenuOpen && (
                   <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-slate-200 dark:border-white/10 shadow-xl rounded-md py-1 animate-fade-in-up">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-white/10">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Přihlášen jako</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      </div>
                      <button 
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2"
                      >
                        <LogOut size={14} /> Odhlásit se
                      </button>
                   </div>
                 )}
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-black dark:bg-white dark:text-black rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Hamburger Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`absolute inset-y-0 left-0 w-[300px] bg-white dark:bg-black shadow-2xl transform transition-transform duration-300 flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex justify-between items-center border-b border-slate-100 dark:border-white/10">
             <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                Menu
             </span>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 dark:text-slate-400">
               <X size={24} />
             </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-6">
            <div className="flex flex-col space-y-6">
               {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className="text-xl font-medium text-slate-900 dark:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
               ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-slate-100 dark:border-white/10">
              <p className="text-sm text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-4">Účet</p>
              <div className="flex flex-col space-y-4">
                 {isAuthenticated ? (
                   <>
                     <div className="text-base font-bold text-slate-900 dark:text-white">Ahoj, {user?.name}</div>
                     <button onClick={logout} className="text-base text-left text-red-600">Odhlásit se</button>
                   </>
                 ) : (
                   <>
                     <Link to="/login" className="text-base text-slate-600 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Přihlásit se</Link>
                     <Link to="/register" className="text-base text-slate-600 dark:text-slate-300" onClick={() => setIsMobileMenuOpen(false)}>Registrace</Link>
                   </>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;