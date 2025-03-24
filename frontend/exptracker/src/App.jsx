import React from 'react';
import { TransactionProvider } from './contexts/TransactionContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <TransactionProvider>
      <Dashboard />
    </TransactionProvider>
  );
}

export default App;

// import React from 'react'
// import ExpenseTrackerWebsite from './components/ExpenseTrackerWebsite'

// function App() {
//   return (
//     <ExpenseTrackerWebsite />
//   )
// }

// export default App