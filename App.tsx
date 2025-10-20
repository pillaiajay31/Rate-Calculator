import React, { useState, useCallback, useEffect } from 'react';
import { Product, Transaction } from './types';
import { INITIAL_PRODUCTS, PRODUCT_COLORS } from './constants';
import Calculator from './components/Calculator';
import History from './components/History';
import ProductManager from './components/ProductManager';
import { SpiceIcon, ChevronDownIcon, SunIcon, MoonIcon } from './components/icons';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      return storedTheme || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleNewTransaction = useCallback((transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev.slice(0, 49)]); // Keep last 50 transactions
  }, []);

  const handleClearHistory = useCallback(() => {
    setTransactions([]);
  }, []);

  const handleAddProduct = useCallback((newProduct: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...newProduct, id: new Date().toISOString() }]);
  }, []);

  const handleUpdateProduct = useCallback((productId: string, newPrice: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, pricePerUnit: newPrice } : p));
  }, []);

  const handleDeleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  return (
    <div className="min-h-screen bg-base-100-light dark:bg-base-100-dark text-text-primary-light dark:text-text-primary-dark font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        <header className="relative text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="p-2 bg-base-200-light dark:bg-base-200-dark rounded-full">
                {/* LOGO-PLACEHOLDER */}
                <SpiceIcon />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-brand-primary-light to-orange-500 text-transparent bg-clip-text">
              Masala & Oil Calculator
            </h1>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Live price and weight calculations for your shop.</p>
          
          <button onClick={toggleTheme} className="absolute top-0 right-0 p-2 rounded-full bg-base-200-light dark:bg-base-200-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-brand-primary-light transition-colors duration-300" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
                <Calculator products={products} onNewTransaction={handleNewTransaction} />
            </div>
            <div className="lg:col-span-3">
                <History transactions={transactions} onClearHistory={handleClearHistory} />
            </div>
        </main>

        <section className="container mx-auto max-w-4xl mt-12">
            <button
                onClick={() => setIsManagerOpen(prev => !prev)}
                className="w-full flex justify-between items-center bg-base-200-light dark:bg-base-200-dark p-4 rounded-t-2xl hover:bg-base-300-light dark:hover:bg-base-300-dark transition-colors duration-300"
                aria-expanded={isManagerOpen}
                aria-controls="product-manager"
            >
                <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">Manage Products</h2>
                <ChevronDownIcon open={isManagerOpen} />
            </button>
            {isManagerOpen && (
                <div id="product-manager">
                    <ProductManager 
                        products={products}
                        onAddProduct={handleAddProduct}
                        onUpdateProduct={handleUpdateProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />
                </div>
            )}
        </section>

        <footer className="text-center mt-12 text-text-secondary-light dark:text-text-secondary-dark text-sm">
            <p>Built for efficiency. &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;