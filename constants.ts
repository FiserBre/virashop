import { Product } from './types';

export const PRODUCTS: Product[] = [
  // --- HEADWEAR ---
  {
    id: 'h1',
    name: 'Kšiltovka',
    price: 850,
    category: 'Doplňky',
    type: 'headwear',
    brand: 'VIRA',
    sizes: ['One Size'],
    color: 'Černá',
    image: '/images/headwear/cap-street.jpg',
    description: 'Kšiltovka na cesty.'
  },
  {
    id: 'h2',
    name: 'Kulich',
    price: 650,
    category: 'Doplňky',
    type: 'headwear',
    brand: 'VIRA',
    sizes: ['One Size'],
    color: 'Šedá',
    image: '/images/headwear/beanie-merino.jpg',
    description: 'Teplá zimní čepice z prémiové vlny.'
  },
  {
    id: 'h3',
    name: 'Taška',
    price: 590,
    category: 'Doplňky',
    type: 'headwear',
    brand: 'VIRA',
    sizes: ['S/M', 'L/XL'],
    color: 'Béžová',
    image: '/images/headwear/bucket-retro.jpg',
    description: 'Supr taška'
  },
  {
    id: 'h4',
    name: 'čepice',
    price: 990,
    category: 'Doplňky',
    type: 'headwear',
    brand: 'VIRA',
    sizes: ['One Size'],
    color: 'Červená',
    image: '/images/head/chicago.jpg',
    description: 'Klasická čepice.'
  },

  // --- TOPS ---
  {
    id: 't1',
    name: 'Essential Tee',
    price: 890,
    category: 'Muži',
    type: 'top',
    brand: 'VIRA',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Bílá',
    image: '/images/tops/tee-essential.jpg',
    description: 'Prémiová bavlna'
  },
  {
    id: 't2',
    name: 'Oversized mikina',
    price: 2490,
    category: 'Ženy',
    type: 'top',
    brand: 'VIRA',
    sizes: ['XS', 'S', 'M', 'L'],
    color: 'Béžová',
    image: '/images/tops/hoodie-oversized.jpg',
    description: 'Maximální pohodlí'
  },

  // --- BOTTOMS ---
  {
    id: 'b1',
    name: 'Dziny',
    price: 2100,
    category: 'Muži',
    type: 'bottom',
    brand: 'VIRA',
    sizes: ['30', '32', '34', '36'],
    color: 'Černá',
    image: '/images/bottoms/jeans-slim.jpg',
    description: 'Pohodlné džíny.'
  },
  {
    id: 'b2',
    name: 'Teplaky',
    price: 1900,
    category: 'Ženy',
    type: 'bottom',
    brand: 'VIRA',
    sizes: ['36', '38', '40'],
    color: 'Bílá',
    image: '/images/bottoms/trousers-linen.jpg',
    description: 'Kalhoty z praného lnu.'
  },
  {
    id: 'b3',
    name: 'Cargo Pants',
    price: 3500,
    category: 'Muži',
    type: 'bottom',
    brand: 'VIRA',
    sizes: ['30', '32', '34'],
    color: 'Zelená',
    image: '/images/bottoms/pants-cargo.jpg',
    description: 'super kalhoty'
  },
  {
    id: 'b4',
    name: 'Kraťasy',
    price: 1200,
    category: 'Muži',
    type: 'bottom',
    brand: 'VIRA',
    sizes: ['30', '32', '34', '36'],
    color: 'Béžová',
    image: '/images/bottoms/shorts-chino.jpg',
    description: 'Kraťasy pro letní dny.'
  },

  // --- SHOES ---
  {
    id: 's1',
    name: 'Air Force 1',
    price: 2990,
    category: 'Muži',
    type: 'shoes',
    brand: 'Nike / VIRA',
    sizes: ['41', '42', '43', '44', '45'],
    color: 'Bílá',
    image: '/images/shoes/af1.jpg',
    description: 'custom.'
  },
  {
    id: 's2',
    name: 'Tretry',
    price: 4500,
    category: 'Muži',
    type: 'shoes',
    brand: 'VIRA',
    sizes: ['41', '42', '43', '44'],
    color: 'Hnědá',
    image: '/images/shoes/chelsea.jpg',
    description: 'Ručně šité boty.'
  },
  {
    id: 's3',
    name: 'Ponožky',
    price: 200,
    category: 'Muži',
    type: 'shoes',
    brand: 'VIRA',
    sizes: ['41', '42', '43', '44'],
    color: 'Hnědá',
    image: '/images/shoes/chelsea.jpg',
    description: 'pohodlne ponozky.'
  },
];