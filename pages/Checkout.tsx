import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { Check, ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 129;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };

  useEffect(() => {
    if (cart.length === 0 && step === 'form') {
      navigate('/');
    }
  }, [cart, navigate, step]);

  if (step === 'success') {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fade-in-up">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-scale-in">
          <Check size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-black uppercase text-center mb-4 text-slate-900 dark:text-white">Objednávka přijata</h1>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Děkujeme za váš nákup. Potvrzení objednávky bylo odesláno na váš email.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Pokračovat v nákupu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-slate-500 hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="ml-1 font-medium">Zpět do obchodu</span>
      </button>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        {/* Left Column: Form */}
        <section className="lg:col-span-7 bg-white dark:bg-black">
          <h1 className="text-3xl font-black uppercase mb-8 text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">
            Pokladna
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                1. Kontaktní údaje
              </h2>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                  <input required type="email" id="email" className="mt-1 block w-full border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:ring-black focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Jméno</label>
                  <input required type="text" id="firstName" className="mt-1 block w-full border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:ring-black focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Příjmení</label>
                  <input required type="text" id="lastName" className="mt-1 block w-full border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:ring-black focus:border-black dark:focus:border-white" />
                </div>
                <div className="sm:col-span-2">
                   <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Adresa</label>
                   <input required type="text" id="address" className="mt-1 block w-full border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:ring-black focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Město</label>
                  <input required type="text" id="city" className="mt-1 block w-full border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:ring-black focus:border-black dark:focus:border-white" />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-slate-700 dark:text-slate-300">PSČ</label>
                  <input required type="text" id="zip" className="mt-1 block w-full border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:ring-black focus:border-black dark:focus:border-white" />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div>
               <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                2. Doprava <Truck size={20} className="text-slate-400" />
              </h2>
              <div className="space-y-4">
                 <div className="relative border border-slate-200 dark:border-white/20 p-4 flex justify-between items-center cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                    <div className="flex items-center">
                       <input type="radio" name="delivery" defaultChecked className="h-4 w-4 text-black focus:ring-black dark:bg-black dark:checked:bg-white" />
                       <span className="ml-3 font-medium dark:text-white">PPL / DPD Kurýr</span>
                    </div>
                    <span className="font-bold dark:text-white">{shipping === 0 ? 'Zdarma' : '129 Kč'}</span>
                 </div>
              </div>
            </div>

            {/* Payment Method */}
             <div>
               <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                3. Platba <CreditCard size={20} className="text-slate-400" />
              </h2>
              <div className="space-y-4">
                 <div className="relative border border-slate-200 dark:border-white/20 p-4 flex justify-between items-center cursor-pointer hover:border-black dark:hover:border-white transition-colors bg-slate-50 dark:bg-white/5">
                    <div className="flex items-center">
                       <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-black focus:ring-black dark:bg-black dark:checked:bg-white" />
                       <span className="ml-3 font-medium dark:text-white">Kartou online</span>
                    </div>
                    <div className="flex space-x-2">
                       <div className="w-8 h-5 bg-gray-300 rounded"></div>
                       <div className="w-8 h-5 bg-gray-300 rounded"></div>
                    </div>
                 </div>
                 <div className="relative border border-slate-200 dark:border-white/20 p-4 flex justify-between items-center cursor-pointer hover:border-black dark:hover:border-white transition-colors">
                    <div className="flex items-center">
                       <input type="radio" name="payment" className="h-4 w-4 text-black focus:ring-black dark:bg-black dark:checked:bg-white" />
                       <span className="ml-3 font-medium dark:text-white">Apple Pay / Google Pay</span>
                    </div>
                 </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-5 text-lg font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                `Dokončit objednávku (${total} Kč)`
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
               <ShieldCheck size={16} />
               <span>Platba je 100% zabezpečená</span>
            </div>

          </form>
        </section>

        {/* Right Column: Order Summary */}
        <section className="lg:col-span-5 mt-12 lg:mt-0">
          <div className="bg-gray-50 dark:bg-white/5 p-6 sticky top-24 border border-slate-200 dark:border-white/10 animate-slide-in-right">
             <h2 className="text-lg font-bold uppercase mb-6 dark:text-white">Shrnutí objednávky</h2>
             <ul className="divide-y divide-slate-200 dark:divide-white/10 mb-6">
                {cart.map((item) => (
                  <li key={item.id} className="py-4 flex">
                     <div className="h-16 w-16 flex-shrink-0 overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-black">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                     </div>
                     <div className="ml-4 flex-1">
                        <div className="flex justify-between text-sm font-medium dark:text-white">
                           <h3>{item.name}</h3>
                           <p>{item.price * item.quantity} Kč</p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Vel: {item.sizes[0]} | Množství: {item.quantity}</p>
                     </div>
                  </li>
                ))}
             </ul>

             <div className="space-y-4 border-t border-slate-200 dark:border-white/10 pt-6 text-sm">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <p>Mezisoučet</p>
                   <p>{subtotal} Kč</p>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <p>Doprava</p>
                   <p>{shipping === 0 ? 'Zdarma' : `${shipping} Kč`}</p>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-4 border-t border-slate-200 dark:border-white/10">
                   <p>Celkem k úhradě</p>
                   <p>{total} Kč</p>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;