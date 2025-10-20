import React, { useState, useMemo, useCallback } from 'react';
import { Product, CalculationMode, Transaction } from '../types';
import { SwapIcon, AddIcon } from './icons';

interface CalculatorProps {
  products: Product[];
  onNewTransaction: (transaction: Transaction) => void;
}

const Calculator: React.FC<CalculatorProps> = ({ products, onNewTransaction }) => {
  const [mode, setMode] = useState<CalculationMode>('priceToWeight');
  const [selectedProductId, setSelectedProductId] = useState<string>(products.length > 0 ? products[0].id : '');
  const [inputValue, setInputValue] = useState<string>('');

  const selectedProduct = useMemo(() => products.find(p => p.id === selectedProductId), [products, selectedProductId]);

  const calculatedResult = useMemo(() => {
    if (!inputValue || !selectedProduct) return null;

    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) return null;

    if (mode === 'priceToWeight') {
      const resultValue = (value / selectedProduct.pricePerUnit) * 1000;
      return { value: resultValue, unit: selectedProduct.unit === 'kg' ? 'g' : 'ml', inputUnit: '₹' as const, resultUnit: (selectedProduct.unit === 'kg' ? 'g' : 'ml') as 'g' | 'ml' };
    } else {
      const resultValue = (value / 1000) * selectedProduct.pricePerUnit;
      return { value: resultValue, unit: '₹', inputUnit: (selectedProduct.unit === 'kg' ? 'g' : 'ml') as 'g' | 'ml', resultUnit: '₹' as const };
    }
  }, [inputValue, selectedProduct, mode]);

  const handleAddToHistory = useCallback(() => {
    if (!calculatedResult || !selectedProduct || !inputValue) return;

    const newTransaction: Transaction = {
      id: new Date().toISOString(),
      productName: selectedProduct.name,
      productColor: selectedProduct.color,
      mode,
      inputValue: parseFloat(inputValue),
      inputUnit: calculatedResult.inputUnit,
      resultValue: calculatedResult.value,
      resultUnit: calculatedResult.resultUnit,
      timestamp: new Date(),
    };
    onNewTransaction(newTransaction);
    setInputValue('');
  }, [calculatedResult, selectedProduct, mode, inputValue, onNewTransaction]);
  
  const toggleMode = () => {
    setMode(prevMode => prevMode === 'priceToWeight' ? 'weightToPrice' : 'priceToWeight');
    setInputValue('');
  };

  const isAddButtonDisabled = !calculatedResult || calculatedResult.value <= 0;
  const productBorderColor = selectedProduct?.color ? selectedProduct.color.replace('bg-', 'border-') : 'border-transparent';


  return (
    <div className="bg-base-200-light dark:bg-base-200-dark p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Calculator</h2>
        <button onClick={toggleMode} aria-label="Swap calculation mode" className="p-2 rounded-full bg-base-300-light dark:bg-base-300-dark text-text-primary-light dark:text-text-primary-dark hover:bg-brand-primary-light transition-colors duration-300">
          <SwapIcon />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="product" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
            Select Product
          </label>
          <select
            id="product"
            value={selectedProductId}
            onChange={(e) => {
                setSelectedProductId(e.target.value);
                setInputValue('');
            }}
            className={`w-full bg-base-300-light dark:bg-base-300-dark border-2 text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-primary-light transition-all duration-300 appearance-none ${productBorderColor} focus:${productBorderColor}`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} - ₹{product.pricePerUnit}/{product.unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="input-value" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
            {mode === 'priceToWeight' ? 'Enter Amount (₹)' : `Enter Weight (${selectedProduct?.unit === 'kg' ? 'g' : 'ml'})`}
          </label>
          <input
            type="number"
            id="input-value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={mode === 'priceToWeight' ? 'e.g., 100' : 'e.g., 250'}
            className={`w-full bg-base-300-light dark:bg-base-300-dark border-2 text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-primary-light transition-all duration-300 ${productBorderColor} focus:${productBorderColor}`}
          />
        </div>

        <div className={`bg-base-100-light dark:bg-base-100-dark text-center p-4 rounded-lg mt-4 border-b-4 ${productBorderColor}`}>
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Result</p>
            <p className="text-brand-primary-light dark:text-brand-primary-dark font-bold text-3xl h-10 flex items-center justify-center">
                {calculatedResult ? `${calculatedResult.unit === '₹' ? '₹ ' : ''}${calculatedResult.value.toFixed(2)}${calculatedResult.unit !== '₹' ? ` ${calculatedResult.unit}` : ''}` : '0.00'}
            </p>
        </div>

        <button
          onClick={handleAddToHistory}
          disabled={isAddButtonDisabled}
          className="w-full flex items-center justify-center gap-2 bg-brand-primary-light text-base-100-dark font-bold py-3 px-4 rounded-lg hover:bg-brand-primary-dark transition-all duration-300 disabled:bg-base-300-light dark:disabled:bg-base-300-dark disabled:cursor-not-allowed disabled:text-text-secondary-light dark:disabled:text-text-secondary-dark"
        >
          <AddIcon/>
          Add to History
        </button>
      </div>
    </div>
  );
};

export default Calculator;