
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, TransactionFilters } from '../types';

interface TransactionsState {
  transactions: Transaction[];
  filters: TransactionFilters;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  setFilters: (filters: TransactionFilters) => void;
  getFilteredTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
}

export const useTransactionsStore = create<TransactionsState>()(
  persist(
    (set, get) => ({
      transactions: [],
      filters: { type: 'all' },
      
      addTransaction: (transactionData) => {
        const transaction: Transaction = {
          ...transactionData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        }));
      },
      
      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },
      
      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },
      
      setFilters: (filters) => {
        set({ filters });
      },
      
      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        return transactions.filter((transaction) => {
          if (filters.type && filters.type !== 'all' && transaction.type !== filters.type) {
            return false;
          }
          
          if (filters.category && transaction.category !== filters.category) {
            return false;
          }
          
          if (filters.dateRange) {
            const transactionDate = new Date(transaction.date);
            const startDate = new Date(filters.dateRange.start);
            const endDate = new Date(filters.dateRange.end);
            
            if (transactionDate < startDate || transactionDate > endDate) {
              return false;
            }
          }
          
          return true;
        });
      },
      
      getTotalIncome: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      },
      
      getTotalExpenses: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      },
      
      getBalance: () => {
        const { getTotalIncome, getTotalExpenses } = get();
        return getTotalIncome() - getTotalExpenses();
      },
    }),
    {
      name: 'budget-tracker-transactions',
    }
  )
);
