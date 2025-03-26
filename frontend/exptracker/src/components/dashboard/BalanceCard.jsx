import React from 'react';
import { Plus } from 'lucide-react';
import { useTransactions } from '../../contexts/TransactionContext';
import { formatCurrency } from '../../utils/formatters';
import BarChart from './BarChart';

const BalanceCard = () => {
  const { balance, openAddModal } = useTransactions();

  return (
    <div className="bg-white rounded-lg shadow mb-6 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Balance</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => openAddModal('income')}
            className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Income
          </button>
          <button 
            onClick={() => openAddModal('expense')}
            className="bg-purple-100 text-purple-900 hover:bg-purple-200 px-4 py-2 rounded-lg flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add Expense
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-5xl font-bold ${balance >= 0 ? 'text-purple-900' : 'text-red-600'} mb-2`}>
            ₹{formatCurrency(Math.abs(balance))}
          </p>
          <p className="text-gray-500">Available Balance</p>
        </div>
        
        <div className="w-1/2">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;