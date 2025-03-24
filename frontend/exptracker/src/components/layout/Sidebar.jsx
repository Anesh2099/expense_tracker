import React from 'react';
import { Home, Receipt, PieChart, Bell } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <nav className="space-y-4">
        <button className="flex items-center space-x-2 w-full p-2 bg-purple-100 rounded-md text-purple-900 font-medium">
          <Home size={20} />
          <span>Dashboard</span>
        </button>
        <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md text-gray-600">
          <Receipt size={20} />
          <span>Transactions</span>
        </button>
        <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md text-gray-600">
          <PieChart size={20} />
          <span>Analytics</span>
        </button>
        <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100 rounded-md text-gray-600">
          <Bell size={20} />
          <span>Reminders</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;