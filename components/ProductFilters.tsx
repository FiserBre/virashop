import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { FilterState, Category } from '../types';

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
  availableColors: string[];
  availableSizes: string[];
  isOpenMobile: boolean;
  closeMobile: () => void;
  resultCount: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  availableBrands,
  availableColors,
  availableSizes,
  isOpenMobile,
  closeMobile,
  resultCount
}) => {
  // Accordion state management
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    size: true,
    color: true,
    brand: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      // @ts-ignore
      const current = prev[key] as string[];
      const exists = current.includes(value);
      return {
        ...prev,
        [key]: exists ? current.filter(item => item !== value) : [...current, value]
      };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: 0 | 1) => {
    const newVal = parseInt(e.target.value) || 0;
    setFilters(prev => {
      const newRange = [...prev.priceRange] as [number, number];
      newRange[index] = newVal;
      return { ...prev, priceRange: newRange };
    });
  };

  const categories: Category[] = ['Muži', 'Ženy', 'Doplňky'];

  const FilterSection = ({ title, id, children }: { title: string, id: string, children: React.ReactNode }) => (
    <div className="border-b border-slate-200 dark:border-white/10 py-5">
      <button 
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full font-bold text-sm uppercase tracking-wide text-slate-900 dark:text-white mb-2 hover:text-slate-600 dark:hover:text-slate-300"
      >
        <span>{title}</span>
        {openSections[id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openSections[id] && (
        <div className="mt-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );

  const content = (
    <div className="space-y-1">
      <div className="flex justify-between items-center mb-6 lg:hidden border-b border-slate-100 dark:border-white/10 pb-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase">Filtry</h2>
        <button onClick={closeMobile} className="p-2 text-slate-500 dark:text-slate-400">
          <X size={24} />
        </button>
      </div>

      <FilterSection title="Kategorie" id="category">
        <div className="space-y-3">
          {categories.map(cat => (
            <label key={cat} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => handleCheckboxChange('categories', cat)}
                className="w-4 h-4 rounded-none border-slate-300 text-black focus:ring-0 focus:ring-offset-0 dark:border-white/30 dark:bg-black dark:checked:bg-white dark:checked:border-white"
              />
              <span className="ml-3 text-sm text-slate-600 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white transition-colors">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Cena (Kč)" id="price">
        <div className="space-y-4 px-1">
           <div className="flex gap-4">
             <div className="flex-1">
               <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 mb-1 block">Od</label>
               <input 
                 type="number" 
                 value={filters.priceRange[0]}
                 onChange={(e) => handlePriceChange(e, 0)}
                 className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
               />
             </div>
             <div className="flex-1">
               <label className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-500 mb-1 block">Do</label>
               <input 
                 type="number" 
                 value={filters.priceRange[1]}
                 onChange={(e) => handlePriceChange(e, 1)}
                 className="w-full px-3 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
               />
             </div>
           </div>
        </div>
      </FilterSection>

      <FilterSection title="Velikost" id="size">
        <div className="grid grid-cols-3 gap-2">
          {availableSizes.map(size => (
            <button
              key={size}
              onClick={() => handleCheckboxChange('sizes', size)}
              className={`px-2 py-2 text-xs font-bold border transition-all ${
                filters.sizes.includes(size)
                  ? 'border-black bg-black text-white dark:bg-white dark:border-white dark:text-black'
                  : 'border-slate-200 text-slate-600 hover:border-black dark:border-white/20 dark:text-slate-400 dark:hover:border-white dark:hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Barva" id="color">
        <div className="space-y-3">
          {availableColors.map(color => (
            <label key={color} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleCheckboxChange('colors', color)}
                className="w-4 h-4 rounded-none border-slate-300 text-black focus:ring-0 focus:ring-offset-0 dark:border-white/30 dark:bg-black dark:checked:bg-white dark:checked:border-white"
              />
              <span className="ml-3 text-sm text-slate-600 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white transition-colors">
                {color}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Značka" id="brand">
        <div className="space-y-3">
          {availableBrands.map(brand => (
            <label key={brand} className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleCheckboxChange('brands', brand)}
                className="w-4 h-4 rounded-none border-slate-300 text-black focus:ring-0 focus:ring-offset-0 dark:border-white/30 dark:bg-black dark:checked:bg-white dark:checked:border-white"
              />
              <span className="ml-3 text-sm text-slate-600 group-hover:text-black dark:text-slate-400 dark:group-hover:text-white transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>
      
      <div className="pt-8 lg:hidden">
         <button 
           onClick={closeMobile}
           className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-widest text-sm hover:opacity-90"
         >
           Zobrazit ({resultCount}) výsledků
         </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 pr-8 overflow-y-auto sticky top-24 max-h-[calc(100vh-6rem)]">
         <h2 className="text-sm font-bold uppercase tracking-widest mb-6 text-slate-900 dark:text-white">Filtry</h2>
         {content}
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpenMobile ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobile} />
        <div className={`absolute inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-black shadow-2xl transform transition-transform duration-300 ${isOpenMobile ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="h-full overflow-y-auto p-6">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;