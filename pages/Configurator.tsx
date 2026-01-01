import React, { useState, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, Stars } from '@react-three/drei';
import { PRODUCTS } from '../constants';
import { Product, OutfitState, ClothingType, Color } from '../types';
import { suggestOutfit } from '../services/geminiService';
import { Sparkles, RefreshCw, ShoppingBag, Box, ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';

// Fix for TypeScript not recognizing R3F elements in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
      boxGeometry: any;
      color: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

// --- 3D Components ---

const getColorHex = (colorName: Color | string): string => {
  const map: Record<string, string> = {
    'Černá': '#1a1a1a',
    'Bílá': '#f5f5f5',
    'Šedá': '#808080',
    'Modrá': '#1e3a8a',
    'Béžová': '#d6c0a1',
    'Hnědá': '#5d4037',
    'Zelená': '#14532d',
    'Červená': '#b91c1c',
    'Multi': '#6366f1',
  };
  return map[colorName] || '#cccccc';
};

const Mannequin = ({ outfit }: { outfit: OutfitState }) => {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Body Base */}
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.15, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.75, 32]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <group position={[-0.25, 1.35, 0]} rotation={[0, 0, 0.2]}>
        <mesh position={[0, -0.3, 0]}>
           <cylinderGeometry args={[0.045, 0.04, 0.7]} />
           <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>
      <group position={[0.25, 1.35, 0]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, -0.3, 0]}>
           <cylinderGeometry args={[0.045, 0.04, 0.7]} />
           <meshStandardMaterial color="#e0e0e0" />
        </mesh>
      </group>
      <mesh position={[-0.1, 0.4, 0]}>
         <cylinderGeometry args={[0.06, 0.04, 0.85]} />
         <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0.1, 0.4, 0]}>
         <cylinderGeometry args={[0.06, 0.04, 0.85]} />
         <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      {/* CLOTHING LAYERS */}
      {outfit.headwear && (
        <group position={[0, 1.82, 0]}>
           <mesh>
             <sphereGeometry args={[0.13, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
             <meshStandardMaterial color={getColorHex(outfit.headwear.color)} roughness={0.8} />
           </mesh>
           {outfit.headwear.name.toLowerCase().includes('kšilt') && (
             <mesh position={[0, 0, 0.12]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.18, 0.01, 0.15]} />
                <meshStandardMaterial color={getColorHex(outfit.headwear.color)} />
             </mesh>
           )}
           {outfit.headwear.name.toLowerCase().includes('klobouk') && (
             <mesh position={[0, -0.05, 0]}>
                <cylinderGeometry args={[0.25, 0.14, 0.02, 32]} />
                <meshStandardMaterial color={getColorHex(outfit.headwear.color)} />
             </mesh>
           )}
        </group>
      )}

      {outfit.top && (
        <group position={[0, 1.1, 0]}>
           <mesh scale={[1.05, 1.02, 1.05]}>
              <cylinderGeometry args={[0.185, 0.155, 0.76, 32]} />
              <meshStandardMaterial color={getColorHex(outfit.top.color)} roughness={0.9} />
           </mesh>
           <group position={[-0.25, 0.25, 0]} rotation={[0, 0, 0.2]}>
              <mesh position={[0, -0.15, 0]}>
                 <cylinderGeometry args={[0.06, 0.055, 0.35]} />
                 <meshStandardMaterial color={getColorHex(outfit.top.color)} roughness={0.9} />
              </mesh>
           </group>
           <group position={[0.25, 0.25, 0]} rotation={[0, 0, -0.2]}>
              <mesh position={[0, -0.15, 0]}>
                 <cylinderGeometry args={[0.06, 0.055, 0.35]} />
                 <meshStandardMaterial color={getColorHex(outfit.top.color)} roughness={0.9} />
              </mesh>
           </group>
        </group>
      )}

      {outfit.bottom && (
        <group position={[0, 0.4, 0]}>
            <mesh position={[0, 0.4, 0]}>
               <cylinderGeometry args={[0.16, 0.17, 0.25]} />
               <meshStandardMaterial color={getColorHex(outfit.bottom.color)} roughness={0.7} />
            </mesh>
            <mesh position={[-0.1, -0.05, 0]}>
               <cylinderGeometry args={[0.075, 0.06, 0.85]} />
               <meshStandardMaterial color={getColorHex(outfit.bottom.color)} roughness={0.7} />
            </mesh>
            <mesh position={[0.1, -0.05, 0]}>
               <cylinderGeometry args={[0.075, 0.06, 0.85]} />
               <meshStandardMaterial color={getColorHex(outfit.bottom.color)} roughness={0.7} />
            </mesh>
        </group>
      )}

      {outfit.shoes && (
        <group>
           <mesh position={[-0.1, 0, 0.05]}>
              <boxGeometry args={[0.1, 0.08, 0.25]} />
              <meshStandardMaterial color={getColorHex(outfit.shoes.color)} />
           </mesh>
           <mesh position={[0.1, 0, 0.05]}>
              <boxGeometry args={[0.1, 0.08, 0.25]} />
              <meshStandardMaterial color={getColorHex(outfit.shoes.color)} />
           </mesh>
        </group>
      )}
    </group>
  );
};

// --- Configurator Steps Logic ---

interface ConfiguratorProps {
  addAllToCart: (products: Product[]) => void;
}

const STEPS = [
  { id: 'headwear', label: 'Hlava', icon: '🧢' },
  { id: 'top', label: 'Svršek', icon: '👕' },
  { id: 'bottom', label: 'Spodek', icon: '👖' },
  { id: 'shoes', label: 'Obuv', icon: '👟' },
  { id: 'summary', label: 'Shrnutí', icon: '✅' }
] as const;

const Configurator: React.FC<ConfiguratorProps> = ({ addAllToCart }) => {
  const [outfit, setOutfit] = useState<OutfitState>({
    headwear: null,
    top: null,
    bottom: null,
    shoes: null
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (product: Product) => {
    setOutfit(prev => ({
      ...prev,
      [product.type]: product
    }));
  };

  const handleAISuggestion = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const suggestedIds = await suggestOutfit(prompt);
      const newOutfit = { ...outfit };
      let foundAny = false;

      suggestedIds.forEach(id => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            // @ts-ignore
            newOutfit[product.type] = product;
            foundAny = true;
        }
      });

      if (foundAny) {
          setOutfit(newOutfit);
          // Optional: Jump to summary if AI fills everything
          // setCurrentStep(STEPS.length - 1); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = (outfit.headwear?.price || 0) + (outfit.top?.price || 0) + (outfit.bottom?.price || 0) + (outfit.shoes?.price || 0);
  const currentOutfitList = [outfit.headwear, outfit.top, outfit.bottom, outfit.shoes].filter(Boolean) as Product[];

  const currentStepData = STEPS[currentStep];
  const isSummary = currentStepData.id === 'summary';

  // Filter products for current step
  const activeProducts = useMemo(() => {
    if (isSummary) return [];
    return PRODUCTS.filter(p => p.type === currentStepData.id);
  }, [currentStepData.id, isSummary]);

  return (
    <div className="h-[calc(100vh-80px)] bg-slate-50 dark:bg-neutral-950 overflow-hidden flex flex-col lg:flex-row relative">
      
      {/* LEFT SIDE: WIZARD UI */}
      <div className="w-full lg:w-[450px] bg-white/90 dark:bg-black/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 z-20 flex flex-col h-full shadow-2xl transition-all">
        
        {/* Header / Progress */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-black text-2xl uppercase tracking-tighter text-slate-900 dark:text-white">
              Konfigurátor
            </h2>
            <div className="text-sm font-bold text-slate-500">
               Krok {currentStep + 1} / {STEPS.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex justify-between relative mb-2">
             <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-white/10 -z-10 -translate-y-1/2"></div>
             {STEPS.map((step, index) => (
               <div 
                 key={step.id}
                 className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                   index <= currentStep 
                     ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                     : 'bg-slate-200 dark:bg-white/10 text-slate-400'
                 }`}
               >
                 {index < currentStep ? <Check size={14} /> : index + 1}
               </div>
             ))}
          </div>
          <div className="text-center font-bold uppercase text-sm mt-2 text-indigo-600 dark:text-indigo-400">
             {STEPS[currentStep].label}
          </div>
        </div>

        {/* AI Stylist (Visible in all steps except summary maybe?) */}
        {!isSummary && (
          <div className="px-6 py-4 bg-indigo-50/50 dark:bg-indigo-900/10 border-b border-indigo-100 dark:border-white/5">
             <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="AI Tip: Na svatbu, do parku..."
                  className="flex-1 px-3 py-2 text-sm rounded border border-indigo-200 dark:border-white/20 bg-white dark:bg-black/50 focus:ring-1 focus:ring-indigo-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleAISuggestion()}
                />
                <button
                   onClick={handleAISuggestion}
                   disabled={isLoading}
                   className="bg-indigo-600 text-white px-3 rounded hover:bg-indigo-700 transition-colors"
                >
                   {isLoading ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                </button>
             </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin">
           {isSummary ? (
             <div className="space-y-4 animate-fade-in-up">
                <h3 className="text-lg font-bold mb-4 dark:text-white">Váš vybraný outfit</h3>
                {currentOutfitList.length === 0 ? (
                   <div className="text-center py-10 text-slate-500">
                      <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Zatím jste nic nevybrali.</p>
                   </div>
                ) : (
                   <div className="space-y-3">
                      {currentOutfitList.map(item => (
                         <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
                            <img src={item.image} className="w-16 h-16 object-cover rounded-md" alt="" />
                            <div className="flex-1">
                               <p className="font-bold text-sm dark:text-white">{item.name}</p>
                               <p className="text-xs text-slate-500">{item.brand}</p>
                            </div>
                            <p className="font-bold text-sm dark:text-white">{item.price} Kč</p>
                         </div>
                      ))}
                   </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
                   <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-medium text-slate-600 dark:text-slate-300">Celková cena</span>
                      <span className="text-3xl font-black text-slate-900 dark:text-white">{totalPrice} Kč</span>
                   </div>
                </div>
             </div>
           ) : (
             <div className="grid grid-cols-2 gap-4 animate-fade-in-up">
                {activeProducts.map((product) => (
                   <div 
                     key={product.id}
                     onClick={() => handleSelect(product)}
                     className={`cursor-pointer group relative rounded-xl border transition-all duration-200 overflow-hidden bg-white dark:bg-white/5
                       ${(outfit[currentStepData.id as keyof OutfitState]?.id === product.id)
                         ? 'border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 ring-offset-white dark:ring-offset-black' 
                         : 'border-slate-200 dark:border-white/10 hover:border-slate-400'
                       }`}
                   >
                     <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-black/20">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     </div>
                     <div className="p-3">
                        <p className="font-bold text-xs text-slate-900 dark:text-white truncate uppercase mb-1">{product.name}</p>
                        <p className="text-xs text-slate-500 mb-2">{product.brand}</p>
                        <div className="flex justify-between items-center">
                           <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{product.price} Kč</span>
                           {(outfit[currentStepData.id as keyof OutfitState]?.id === product.id) && 
                              <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                 <Check size={12} />
                              </div>
                           }
                        </div>
                     </div>
                   </div>
                ))}
             </div>
           )}
        </div>
        
        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/50 backdrop-blur-md flex gap-4">
           {currentStep > 0 && (
             <button
               onClick={() => setCurrentStep(currentStep - 1)}
               className="flex-1 py-4 border border-slate-300 dark:border-white/20 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
             >
               <ChevronLeft size={16} /> Zpět
             </button>
           )}
           
           {isSummary ? (
              <button
                disabled={currentOutfitList.length === 0}
                onClick={() => addAllToCart(currentOutfitList)}
                className="flex-[2] bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} /> Koupit Vše
              </button>
           ) : (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-[2] bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Další Krok <ChevronRight size={16} />
              </button>
           )}
        </div>
      </div>

      {/* RIGHT SIDE: REAL 3D SCENE (R3F) */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-300 dark:from-neutral-900 dark:to-black overflow-hidden order-first lg:order-last">
        
        {/* 3D Canvas Container */}
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 40 }}>
               <Suspense fallback={null}>
                 <color attach="background" args={['transparent']} />
                 <ambientLight intensity={0.6} />
                 <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                 <pointLight position={[-10, -10, -10]} intensity={0.5} />
                 <Environment preset="city" />
                 <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                 <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                   <Mannequin outfit={outfit} />
                 </Float>

                 <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
                 <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
               </Suspense>
            </Canvas>
        </div>

        {/* Total Price Overlay (Floating) */}
        <div className="absolute top-6 right-6 pointer-events-none">
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/20">
               <span className="text-xs font-bold uppercase text-slate-500 block">Celkem</span>
               <span className="text-2xl font-black text-slate-900 dark:text-white">{totalPrice} Kč</span>
            </div>
        </div>

        {/* Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-slate-500 dark:text-white/50">
               <Box size={16} />
               <span className="text-[10px] uppercase font-bold tracking-[0.2em]">3D Náhled</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Configurator;