import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      
      {/* Featured Categories */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-black uppercase text-slate-900 dark:text-white mb-8 text-center sm:text-left">
          Procházet kategorie
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Muži', image: '/images/R.jpg', link: '/shop?category=Muži' },
            { name: 'Ženy', image: '/images/heavy-packs.jpg', link: '/shop?category=Ženy' },
            { name: 'Doplňky', image: '/images/doplnek.jpg', link: '/shop?category=Doplňky' },
          ].map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.link} 
              className="group relative h-[400px] overflow-hidden"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-3xl font-black text-white uppercase tracking-widest mb-4">
                  {cat.name}
                </span>
                <span className="flex items-center text-white text-sm font-bold uppercase tracking-wider opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Zobrazit <ArrowRight size={16} className="ml-2" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <section className="bg-slate-900 dark:bg-white/5 py-24 mb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase">
              Vylaď svůj styl s AI
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Vyzkoušej náš nový 3D konfigurátor a nech si poradit od umělé inteligence při výběru perfektního outfitu.
            </p>
            <Link 
              to="/configurator"
              className="inline-block bg-white text-black px-10 py-5 font-bold uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Spustit Konfigurátor
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;