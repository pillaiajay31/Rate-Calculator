import React from 'react';
import { Transaction } from '../types';
import { TrashIcon } from './icons';

interface HistoryProps {
  transactions: Transaction[];
  onClearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ transactions, onClearHistory }) => {
  return (
    <div className="bg-base-200-light dark:bg-base-200-dark p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">History</h2>
        {transactions.length > 0 && (
            <button onClick={onClearHistory} className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-red-500 transition-colors duration-300">
                <TrashIcon />
                Clear
            </button>
        )}
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
        {transactions.length === 0 ? (
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-center py-8">No transactions yet.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className={`bg-base-300-light dark:bg-base-300-dark p-4 rounded-lg flex justify-between items-center border-l-4 ${tx.productColor.replace('bg-', 'border-')}`}>
              <div>
                <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">{tx.productName}</p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {tx.inputValue.toLocaleString()} {tx.inputUnit} → {tx.resultValue.toFixed(2)} {tx.resultUnit}
                </p>
              </div>
              <p className="text-xs text-gray-500">{tx.timestamp.toLocaleTimeString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;