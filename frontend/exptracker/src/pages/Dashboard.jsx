import React from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import BalanceCard from '../components/dashboard/BalanceCard';
import TransactionList from '../components/transactions/TransactionList';
import AddTransactionModal from '../components/transactions/AddTransactionModal';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-2">
            <Sidebar />
          </div>

          {/* Main content area */}
          <div className="col-span-10">
            <BalanceCard />
            <TransactionList />
          </div>
        </div>
      </main>
      
      <AddTransactionModal />
      <Footer />
    </div>
  );
};

export default Dashboard;