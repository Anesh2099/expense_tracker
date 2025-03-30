import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../contexts/TransactionContext';
import { getCurrentDateString } from '../utils/formatters';

const AddIncome = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useTransactions();

  // State for income-specific fields
  const [formData, setFormData] = useState({
    date: getCurrentDateString()
  });
  
  const [incomeDetails, setIncomeDetails] = useState({
    income: '',
    emi: 0,
    rent: 0,
    investment: 0,
    others: 0
  });

  // Calculate balance for income
  const calculateIncomeBalance = () => {
    const { income, emi, rent, investment, others } = incomeDetails;
    const totalIncome = parseFloat(income || 0);
    const totalReductions = 
      parseFloat(emi || 0) + 
      parseFloat(rent || 0) + 
      parseFloat(investment || 0) + 
      parseFloat(others || 0);
    
    // Ensure we return a number
    const balance = Math.max(totalIncome - totalReductions, 0);
    return isNaN(balance) ? 0 : balance;
  };

  // Handle input changes for income details
  const handleIncomeDetailsChange = (e) => {
    const { name, value } = e.target;
    setIncomeDetails(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value)
    }));
  };
  
  // Handle date change
  const handleDateChange = (e) => {
    setFormData({
      ...formData,
      date: e.target.value
    });
  };

  // Handle form submission for income
  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    
    // Ensure income is a valid number
    const incomeValue = parseFloat(incomeDetails.income);
    if (isNaN(incomeValue) || incomeValue <= 0) {
      alert('Please enter a valid income amount');
      return;
    }
    
    // Prepare transaction data
    const transactionData = {
      id: Date.now(), // Use timestamp as unique ID
      date: formData.date,
      amount: calculateIncomeBalance(),
      description: `Income (after deductions)`,
      type: 'income',
      category: 'Salary' // Default income category
    };

    // Additional metadata for income breakdown
    const incomeBreakdown = {
      totalIncome: incomeDetails.income,
      emi: incomeDetails.emi,
      rent: incomeDetails.rent,
      investment: incomeDetails.investment,
      others: incomeDetails.others
    };

    // Call submit with transaction data and income breakdown
    handleSubmit(e, transactionData, incomeBreakdown);
    
    // Navigate back to dashboard after submission
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Income</h1>
      </div>
      
      <form onSubmit={handleIncomeSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Income</label>
          <input
            type="number"
            name="income"
            value={incomeDetails.income}
            onChange={handleIncomeDetailsChange}
            placeholder="Enter total income"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">EMI</label>
          <input
            type="number"
            name="emi"
            value={incomeDetails.emi}
            onChange={handleIncomeDetailsChange}
            placeholder="Enter EMI amount"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rent</label>
          <input
            type="number"
            name="rent"
            value={incomeDetails.rent}
            onChange={handleIncomeDetailsChange}
            placeholder="Enter rent amount"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Investment</label>
          <input
            type="number"
            name="investment"
            value={incomeDetails.investment}
            onChange={handleIncomeDetailsChange}
            placeholder="Enter investment amount"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Others</label>
          <input
            type="number"
            name="others"
            value={incomeDetails.others}
            onChange={handleIncomeDetailsChange}
            placeholder="Enter other deductions"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Balance</label>
          <input
            type="number"
            value={calculateIncomeBalance()}
            readOnly
            className="w-full p-3 border rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleDateChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700"
          >
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIncome;