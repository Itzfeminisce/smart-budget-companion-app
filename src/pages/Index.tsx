
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Dashboard } from '../components/Dashboard';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionsList } from '../components/TransactionsList';
import { useTransactionsStore } from '../stores/useTransactionsStore';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'add-transaction' | 'transactions'>('dashboard');
  
  // Initialize with some sample data for educational purposes
  const addTransaction = useTransactionsStore((state) => state.addTransaction);
  const transactions = useTransactionsStore((state) => state.transactions);

  useEffect(() => {
    // Add some sample data if no transactions exist (for demonstration)
    if (transactions.length === 0) {
      const sampleTransactions = [
        {
          title: 'Salary Payment',
          amount: 3500,
          category: 'Salary',
          type: 'income' as const,
          date: new Date().toISOString(),
        },
        {
          title: 'Grocery Shopping',
          amount: 85.50,
          category: 'Food & Dining',
          type: 'expense' as const,
          date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        },
        {
          title: 'Gas Station',
          amount: 45.00,
          category: 'Transportation',
          type: 'expense' as const,
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
        {
          title: 'Netflix Subscription',
          amount: 15.99,
          category: 'Entertainment',
          type: 'expense' as const,
          date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        },
        {
          title: 'Freelance Project',
          amount: 850,
          category: 'Freelance',
          type: 'income' as const,
          date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        },
      ];

      sampleTransactions.forEach((transaction) => {
        addTransaction(transaction);
      });
    }
  }, [addTransaction, transactions.length]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-transaction':
        return (
          <div className="flex justify-center">
            <TransactionForm />
          </div>
        );
      case 'transactions':
        return <TransactionsList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderCurrentView()}
    </Layout>
  );
};

export default Index;
