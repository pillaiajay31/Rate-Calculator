import React, { useState } from 'react';
import { Product } from '../types';
import { EditIcon, SaveIcon, TrashIcon, AddIcon, XIcon } from './icons';
import { PRODUCT_COLORS } from '../constants';

interface ProductManagerProps {
    products: Product[];
    onAddProduct: (product: Omit<Product, 'id'>) => void;
    onUpdateProduct: (productId: string, newPrice: number) => void;
    onDeleteProduct: (productId: string) => void;
}

const ProductManager: React.FC<ProductManagerProps> = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedPrice, setEditedPrice] = useState('');

    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductUnit, setNewProductUnit] = useState<'kg' | 'L'>('kg');
    const [newProductColor, setNewProductColor] = useState(PRODUCT_COLORS[0]);

    const handleEditClick = (product: Product) => {
        setEditingId(product.id);
        setEditedPrice(String(product.pricePerUnit));
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedPrice('');
    };

    const handleSaveClick = (productId: string) => {
        const newPrice = parseFloat(editedPrice);
        if (!isNaN(newPrice) && newPrice > 0) {
            onUpdateProduct(productId, newPrice);
            handleCancelEdit();
        }
    };

    const handleDeleteClick = (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            onDeleteProduct(productId);
        }
    };
    
    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        const price = parseFloat(newProductPrice);
        if (newProductName.trim() && !isNaN(price) && price > 0) {
            onAddProduct({
                name: newProductName.trim(),
                pricePerUnit: price,
                unit: newProductUnit,
                color: newProductColor,
            });
            setNewProductName('');
            setNewProductPrice('');
            setNewProductUnit('kg');
            setNewProductColor(PRODUCT_COLORS[0]);
        }
    };

    return (
        <div className="bg-base-200-light dark:bg-base-200-dark p-6 sm:p-8 rounded-b-2xl shadow-2xl w-full max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="w-full bg-base-300-light dark:bg-base-300-dark text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-primary-light"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price per Unit (₹)"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        className="w-full bg-base-300-light dark:bg-base-300-dark text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-primary-light"
                        required
                    />
                </div>
                <div>
                     <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                        Product Color
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 bg-base-300-light dark:bg-base-300-dark rounded-lg">
                       {PRODUCT_COLORS.map(color => (
                           <button type="button" key={color} onClick={() => setNewProductColor(color)} className={`w-8 h-8 rounded-full ${color} transition-transform duration-200 ${newProductColor === color ? 'ring-2 ring-offset-2 ring-offset-base-200-light dark:ring-offset-base-200-dark ring-brand-primary-light' : ''}`}></button>
                       ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <select
                        value={newProductUnit}
                        onChange={(e) => setNewProductUnit(e.target.value as 'kg' | 'L')}
                        className="w-full sm:w-auto bg-base-300-light dark:bg-base-300-dark text-text-primary-light dark:text-text-primary-dark rounded-lg p-3 focus:ring-2 focus:ring-brand-primary-light appearance-none"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                    >
                        <option value="kg">₹/kg</option>
                        <option value="L">₹/L</option>
                    </select>
                    <button type="submit" className="w-full sm:w-auto flex-grow bg-brand-primary-light text-base-100-dark font-bold p-3 rounded-lg hover:bg-brand-primary-dark flex items-center justify-center gap-2">
                        <AddIcon /> Add Product
                    </button>
                </div>
            </form>

            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-4">Existing Products</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {products.map(product => (
                    <div key={product.id} className={`bg-base-300-light dark:bg-base-300-dark p-3 rounded-lg flex items-center justify-between border-l-4 ${product.color.replace('bg-', 'border-')}`}>
                        <div className="flex-1 flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${product.color}`}></div>
                            <div>
                                <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{product.name}</p>
                                {editingId === product.id ? (
                                    <input
                                        type="number"
                                        value={editedPrice}
                                        onChange={(e) => setEditedPrice(e.target.value)}
                                        className="bg-base-100-light dark:bg-base-100-dark text-text-primary-light dark:text-text-primary-dark rounded-md p-1 w-24"
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">₹{product.pricePerUnit}/{product.unit}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {editingId === product.id ? (
                                <>
                                    <button onClick={() => handleSaveClick(product.id)} className="text-green-400 hover:text-green-300 p-2"><SaveIcon /></button>
                                    <button onClick={handleCancelEdit} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark p-2"><XIcon/></button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEditClick(product)} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-brand-primary-light p-2"><EditIcon /></button>
                                    <button onClick={() => handleDeleteClick(product.id)} className="text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 p-2"><TrashIcon /></button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManager;