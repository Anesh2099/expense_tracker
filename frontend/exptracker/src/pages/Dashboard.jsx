import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../contexts/TransactionContext';
import BarChart from '../components/dashboard/BarChart';
import BalanceCard from '../components/dashboard/BalanceCard';

// Import other components you might have

const Dashboard = () => {
  const navigate = useNavigate();
  const { transactions, balance, monthlyData } = useTransactions();

  return (
    <div className="container mx-auto px-4">
      {/* <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/addIncome')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Income
          </button>
          <button
            onClick={() => navigate('/addExpense')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add Expense
          </button>
        </div>
      </div> */}

    <div className="flex flex-col items-center justify-center w-full px-6">
      <BalanceCard />
    </div>
    
      {/* Display your transactions list here */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-3">{transaction.date}</td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className="px-4 py-3">{transaction.category}</td>
                    <td className={`px-4 py-3 text-right font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {transaction.receipt && (
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => window.open(transaction.receipt.url, '_blank')}
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No transactions yet. Add your first transaction!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;