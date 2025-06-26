
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Category } from '../types';

interface CategoriesState {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  removeCategory: (id: string) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  getIncomeCategories: () => Category[];
  getExpenseCategories: () => Category[];
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', color: '#ef4444', type: 'expense' },
  { id: '2', name: 'Transportation', color: '#f97316', type: 'expense' },
  { id: '3', name: 'Shopping', color: '#eab308', type: 'expense' },
  { id: '4', name: 'Entertainment', color: '#22c55e', type: 'expense' },
  { id: '5', name: 'Bills & Utilities', color: '#3b82f6', type: 'expense' },
  { id: '6', name: 'Healthcare', color: '#8b5cf6', type: 'expense' },
  { id: '7', name: 'Salary', color: '#10b981', type: 'income' },
  { id: '8', name: 'Freelance', color: '#06b6d4', type: 'income' },
  { id: '9', name: 'Investments', color: '#84cc16', type: 'income' },
  { id: '10', name: 'Other Income', color: '#f59e0b', type: 'income' },
];

export const useCategoriesStore = create<CategoriesState>()(
  persist(
    (set, get) => ({
      categories: defaultCategories,
      
      addCategory: (categoryData) => {
        const category: Category = {
          ...categoryData,
          id: crypto.randomUUID(),
        };
        
        set((state) => ({
          categories: [...state.categories, category],
        }));
      },
      
      removeCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },
      
      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },
      
      getIncomeCategories: () => {
        const { categories } = get();
        return categories.filter((c) => c.type === 'income' || c.type === 'both');
      },
      
      getExpenseCategories: () => {
        const { categories } = get();
        return categories.filter((c) => c.type === 'expense' || c.type === 'both');
      },
    }),
    {
      name: 'budget-tracker-categories',
    }
  )
);
