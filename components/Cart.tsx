import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in-up" 
        onClick={onClose} 
      />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-white dark:bg-black shadow-2xl transform transition-transform animate-slide-in-right border-l border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between px-4 py-6 border-b border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Košík ({cart.length})</h2>
              <button onClick={onClose} className="text-slate-400 hover:text-black dark:hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <ShoppingBagIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Váš košík je prázdný</p>
                  <button onClick={onClose} className="mt-4 text-sm underline hover:text-black dark:hover:text-white">
                    Zpět do obchodu
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-slate-200 dark:divide-white/10">
                  {cart.map((item, index) => (
                    <li key={item.id} className="flex py-6 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white">
                            <h3>{item.name}</h3>
                            <p className="ml-4">{item.price * item.quantity} Kč</p>
                          </div>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.brand} | {item.sizes[0]}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center space-x-2 border border-slate-200 dark:border-white/20 p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-medium w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium text-red-500 hover:text-red-600 transition-colors p-2"
                            aria-label="Odstranit"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-slate-200 dark:border-white/10 px-4 py-6 sm:px-6 bg-slate-50 dark:bg-black">
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white mb-4">
                <p className="uppercase">Mezisoučet</p>
                <p>{total} Kč</p>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500 mb-6">
                Doprava a daně budou vypočteny v dalším kroku.
              </p>
              <button
                className={`w-full flex items-center justify-center space-x-2 px-6 py-4 text-base font-bold text-white uppercase tracking-widest transition-all duration-300 ${
                  cart.length === 0 
                    ? 'bg-slate-300 dark:bg-white/10 cursor-not-allowed text-slate-500 dark:text-slate-500' 
                    : 'bg-black dark:bg-white dark:text-black hover:bg-slate-900 dark:hover:bg-slate-200 hover:scale-[1.02]'
                }`}
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                <span>Přejít k pokladně</span>
                {cart.length > 0 && <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

export default Cart;