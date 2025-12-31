import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product, FilterState, Category } from '../types';
import { Plus, SlidersHorizontal, Eye } from 'lucide-react';
import ProductFilters from '../components/ProductFilters';

interface ShopProps {
  addToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ addToCart }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    sizes: [],
    colors: [],
    priceRange: [0, 10000],
  });

  // Effect to sync URL params with state
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const decodedCat = decodeURIComponent(categoryParam) as Category;
      if (['Muži', 'Ženy', 'Doplňky'].includes(decodedCat)) {
        setFilters(prev => ({
          ...prev,
          categories: [decodedCat]
        }));
      }
    } else {
      setFilters(prev => ({ ...prev, categories: [] }));
    }
  }, [searchParams]);

  const availableBrands = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.brand))).sort(), []);
  const availableColors = useMemo(() => Array.from(new Set(PRODUCTS.map(p => p.color))).sort(), []);
  const availableSizes = useMemo(() => {
     const allSizes = PRODUCTS.flatMap(p => p.sizes);
     return Array.from(new Set(allSizes)).sort((a, b) => {
        const order = ['XS', 'S', 'S/M', 'M', 'L', 'L/XL', 'XL', 'XXL', '30', '32', '34', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '57', '59', '61', 'One Size'];
        return order.indexOf(a) - order.indexOf(b);
     });
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;
      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) return false;
      if (filters.sizes.length > 0) {
        const hasSize = product.sizes.some(s => filters.sizes.includes(s));
        if (!hasSize) return false;
      }
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      
      <div className="flex justify-between items-end mb-8 sticky top-16 z-30 bg-white/95 dark:bg-black/95 py-4 backdrop-blur-sm -mx-4 px-4 lg:mx-0 lg:px-0 lg:static lg:bg-transparent lg:dark:bg-transparent transition-all border-b border-slate-100 dark:border-white/10 lg:border-none">
        <div className="animate-slide-in-right">
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            {filters.categories.length === 1 ? filters.categories[0] : 'Všechny produkty'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filteredProducts.length} položek
          </p>
        </div>
        
        <button 
          onClick={() => setIsMobileFiltersOpen(true)}
          className="lg:hidden flex items-center space-x-2 border border-slate-300 dark:border-white/20 rounded-full px-4 py-2 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
        >
          <SlidersHorizontal size={18} />
          <span className="font-medium">Filtry</span>
        </button>
      </div>

      <div className="flex items-start">
        <ProductFilters 
          filters={filters}
          setFilters={setFilters}
          availableBrands={availableBrands}
          availableColors={availableColors}
          availableSizes={availableSizes}
          isOpenMobile={isMobileFiltersOpen}
          closeMobile={() => setIsMobileFiltersOpen(false)}
          resultCount={filteredProducts.length}
        />

        <div className="flex-1 w-full">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-slate-300 dark:border-white/10 rounded-xl animate-fade-in-up">
               <p className="text-lg">Nebyly nalezeny žádné produkty odpovídající filtru.</p>
               <button 
                 onClick={() => setFilters({ categories: [], brands: [], sizes: [], colors: [], priceRange: [0, 10000] })}
                 className="mt-4 text-black dark:text-white font-bold underline hover:no-underline"
               >
                 Vymazat filtry
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200 dark:bg-gray-900 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                       <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="p-3 bg-white text-black rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
                        title="Přidat do košíku"
                      >
                        <Plus size={20} />
                      </button>
                      <button
                        className="p-3 bg-black text-white rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:scale-110"
                        title="Zobrazit detail"
                      >
                        <Eye size={20} />
                      </button>
                    </div>

                    {Math.random() > 0.7 && (
                      <span className="absolute top-3 left-3 bg-white dark:bg-black text-black dark:text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider animate-pulse-slow">
                        Novinka
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-base font-medium text-slate-900 dark:text-white">
                        {product.price} Kč
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{product.brand}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{product.sizes.length} velikostí</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;