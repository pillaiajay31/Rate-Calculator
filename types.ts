export interface Product {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: 'kg' | 'L';
  color: string;
}

export type CalculationMode = 'priceToWeight' | 'weightToPrice';

export interface Transaction {
  id: string;
  productName: string;
  productColor: string;
  mode: CalculationMode;
  inputValue: number;
  inputUnit: '₹' | 'g' | 'ml';
  resultValue: number;
  resultUnit: 'g' | 'ml' | '₹';
  timestamp: Date;
}