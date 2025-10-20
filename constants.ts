import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Turmeric Powder', pricePerUnit: 400, unit: 'kg', color: 'bg-yellow-500' },
  { id: '2', name: 'Chilli Powder', pricePerUnit: 600, unit: 'kg', color: 'bg-red-600' },
  { id: '3', name: 'Coriander Powder', pricePerUnit: 350, unit: 'kg', color: 'bg-emerald-700' },
  { id: '4', name: 'Cumin Seeds', pricePerUnit: 800, unit: 'kg', color: 'bg-amber-800' },
  { id: '5', name: 'Garam Masala', pricePerUnit: 1200, unit: 'kg', color: 'bg-orange-700' },
  { id: '6', name: 'Mustard Oil', pricePerUnit: 180, unit: 'L', color: 'bg-amber-500' },
  { id: '7', name: 'Sunflower Oil', pricePerUnit: 150, unit: 'L', color: 'bg-yellow-400' },
  { id: '8', name: 'Groundnut Oil', pricePerUnit: 220, unit: 'L', color: 'bg-orange-400' },
  { id: '9', name: 'Black Pepper', pricePerUnit: 1000, unit: 'kg', color: 'bg-gray-800' },
  { id: '10', name: 'Cloves', pricePerUnit: 1500, unit: 'kg', color: 'bg-rose-900' },
];

export const PRODUCT_COLORS = [
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
    'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
    'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500',
    'bg-rose-500',
];