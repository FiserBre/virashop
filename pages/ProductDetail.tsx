import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { ArrowLeft, Star, ShoppingBag, Truck, ShieldCheck, Share2 } from 'lucide-react';

interface ProductDetailProps {
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes[0]);
      window.scrollTo(0, 0);
      
      // Suggest related products from same category
      setRelatedProducts(
        PRODUCTS
          .filter(p => p.category === found.category && p.id !== found.id)
          .slice(0, 4)
      );
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb / Back */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-slate-500 hover:text-black dark:hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="ml-2 font-bold text-sm uppercase tracking-wide">Zpět</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="space-y-4 animate-slide-in-right">
           <div className="aspect-[4/5] w-full overflow-hidden bg-gray-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
             />
           </div>
           {/* Mock thumbnails */}
           <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image].map((img, i) => (
                <div key={i} className="aspect-square bg-gray-100 dark:bg-white/5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
           </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col animate-fade-in-up">
           <div className="mb-2 flex items-center gap-2">
             <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 dark:bg-white/10 px-2 py-1 rounded">
                {product.brand}
             </span>
             <span className="text-xs font-medium text-slate-500">{product.category}</span>
           </div>
           
           <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase leading-none mb-4">
             {product.name}
           </h1>

           <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{product.price} Kč</span>
              <div className="flex items-center text-yellow-500">
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" />
                 <Star size={16} fill="currentColor" className="opacity-50" />
                 <span className="text-xs text-slate-400 ml-2 text-black dark:text-white">(24 hodnocení)</span>
              </div>
           </div>

           <p className="text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
             {product.description} Navrženo pro maximální komfort a styl. Vyrobeno z prémiových materiálů, které zaručují dlouhou životnost.
           </p>

           {/* Size Selector */}
           <div className="mb-8">
             <div className="flex justify-between mb-2">
               <span className="text-sm font-bold uppercase">Vyberte velikost</span>
               <span className="text-sm underline cursor-pointer text-slate-500 hover:text-black dark:hover:text-white">Tabulka velikostí</span>
             </div>
             <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
               {product.sizes.map(size => (
                 <button
                   key={size}
                   onClick={() => setSelectedSize(size)}
                   className={`py-3 text-sm font-bold border transition-all ${
                     selectedSize === size
                       ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                       : 'border-slate-200 text-slate-600 hover:border-black dark:border-white/20 dark:text-slate-400 dark:hover:border-white'
                   }`}
                 >
                   {size}
                 </button>
               ))}
             </div>
           </div>

           {/* Actions */}
           <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-slate-300 dark:border-white/20 w-32">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-12 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10">-</button>
                <span className="flex-1 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-12 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10">+</button>
              </div>
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-indigo-600 text-white h-12 flex items-center justify-center gap-2 font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
              >
                <ShoppingBag size={20} />
                Přidat do košíku
              </button>
              <button className="h-12 w-12 border border-slate-300 dark:border-white/20 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <Share2 size={20} />
              </button>
           </div>

           {/* Benefits */}
           <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-start gap-3">
                 <Truck className="text-slate-400" size={24} />
                 <div>
                   <h4 className="font-bold text-sm uppercase">Doprava zdarma</h4>
                   <p className="text-xs text-slate-500">Nad 5000 Kč</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <ShieldCheck className="text-slate-400" size={24} />
                 <div>
                   <h4 className="font-bold text-sm uppercase">Záruka kvality</h4>
                   <p className="text-xs text-slate-500">2 roky záruka</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
         <h2 className="text-2xl font-black uppercase mb-8 border-b border-slate-200 dark:border-white/10 pb-4">Mohlo by se vám líbit</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, i) => (
              <div key={p.id} className="group cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                 <div className="aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-white/5 mb-4">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white uppercase text-sm">{p.name}</h3>
                 <p className="text-slate-500 text-sm">{p.price} Kč</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default ProductDetail;