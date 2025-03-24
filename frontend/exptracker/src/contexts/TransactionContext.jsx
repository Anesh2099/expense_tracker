import React, { createContext, useState, useContext, useEffect } from 'react';
import { formatDate, getCurrentDateString } from '../utils/formatters';
import { getCategoryIcon, CATEGORIES } from '../constants/categories';


// Initial mock data
const initialTransactions = [
  { id: 1, date: '18 Aug', category: 'Shopping', description: 'Clothes and watch', amount: 1101.00, type: 'expense',  },
  { id: 2, date: '18 Aug', category: 'Shopping', description: 'Clothes and watch', amount: 18025.00, type: 'expense',  },
  { id: 3, date: '18 Aug', category: 'Education', description: 'Books and Stationary', amount: 5024.00, type: 'expense',  },
  { id: 4, date: '18 Aug', category: 'Food', description: 'Kirana and Ration', amount: 11021.00, type: 'expense',  },
  { id: 5, date: '17 Aug', category: 'Shopping', description: 'Clothes and watch', amount: 18025.00, type: 'expense',  }
];

// Create context
const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  // State for transactions and financial data
  const [transactions, setTransactions] = useState(initialTransactions);
  const [balance, setBalance] = useState(12560.00);
  const [monthlyData, setMonthlyData] = useState({
    exp: 25000,
    bal: 5000,
    inc: 30000,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
  });
  
  // Form state
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Shopping',
    date: getCurrentDateString()
  });
  
  // Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState('expense');
  
  // Update balance and monthly data whenever transactions change
  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    
    // Set balance based on income minus expenses
    setBalance(totalIncome - totalExpense);
    
    // Update monthly data
    setMonthlyData(prev => ({
      ...prev,
      inc: totalIncome,
      exp: totalExpense,
      bal: totalIncome - totalExpense
    }));
  }, [transactions]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new transaction
    const newTransaction = {
      id: transactions.length + 1,
      date: formatDate(formData.date),
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: transactionType,
      icon: getCategoryIcon(formData.category, transactionType)
    };
    
    // Add to transactions list
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Reset form and close modal
    setFormData({
      amount: '',
      description: '',
      category: transactionType === 'expense' ? 'Shopping' : 'Salary',
      date: getCurrentDateString()
    });
    
    setShowAddModal(false);
  };
  
  // Open modal with specific transaction type
  const openAddModal = (type) => {
    setTransactionType(type);
    setFormData(prev => ({
      ...prev,
      category: type === 'expense' ? 'Shopping' : 'Salary'
    }));
    setShowAddModal(true);
  };
  
  // Context value
  const value = {
    transactions,
    balance,
    monthlyData,
    formData,
    showAddModal,
    transactionType,
    handleInputChange,
    handleSubmit,
    openAddModal,
    setShowAddModal
  };
  
  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// Custom hook to use the transaction context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};