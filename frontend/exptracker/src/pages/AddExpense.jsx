import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../contexts/TransactionContext';
import { CATEGORIES } from '../constants/categories';
import { getCurrentDateString, formatDate } from '../utils/formatters';

const AddExpense = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useTransactions();
  
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Shopping',
    date: getCurrentDateString()
  });
  
  // State for receipt image
  const [receiptImage, setReceiptImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Remove image
  const handleRemoveImage = () => {
    setReceiptImage(null);
    setImagePreview('');
  };
  
  // Submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Ensure amount is a valid number
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid expense amount');
      return;
    }
    
    // Prepare transaction data
    const transactionData = {
      id: Date.now(),
      date: formatDate(formData.date),
      amount: amount,
      description: formData.description,
      category: formData.category,
      type: 'expense',
      // Include receipt image if available
      receipt: receiptImage ? {
        name: receiptImage.name,
        url: imagePreview, // Use preview URL for demonstration
        // In a real app, you'd upload this to storage and get a URL
      } : null
    };
    
    // Submit the transaction
    handleSubmit(e, transactionData);
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Expense</h1>
      </div>
      
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            min="0.01"
            step="0.01"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            {CATEGORIES.expense.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        
        {/* Receipt Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Receipt Image (Optional)</label>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="receipt-upload"
            />
            <label 
              htmlFor="receipt-upload"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              Choose File
            </label>
            {receiptImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-2 text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Receipt Preview:</p>
              <div className="border rounded-lg p-2">
                <img 
                  src={imagePreview} 
                  alt="Receipt preview" 
                  className="max-h-48 mx-auto" 
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Filename: {receiptImage.name}
              </p>
            </div>
          )}
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
            className="px-6 py-3 rounded-lg text-white bg-purple-600 hover:bg-purple-700"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;