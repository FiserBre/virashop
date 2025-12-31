export type Category = 'Vše' | 'Muži' | 'Ženy' | 'Doplňky';

export type ClothingType = 'headwear' | 'top' | 'bottom' | 'shoes' | 'accessory';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'S/M' | 'L/XL' | '30' | '32' | '34' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '57' | '59' | '61' | 'One Size';

export type Color = 'Černá' | 'Bílá' | 'Šedá' | 'Modrá' | 'Béžová' | 'Hnědá' | 'Zelená' | 'Červená' | 'Multi';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  type: ClothingType;
  brand: string;
  sizes: Size[];
  color: Color;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OutfitState {
  headwear: Product | null;
  top: Product | null;
  bottom: Product | null;
  shoes: Product | null;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface User {
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface FilterState {
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  categories: Category[];
}