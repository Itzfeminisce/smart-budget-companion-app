
import { useState } from 'react';
import { useTransactionsStore } from '../stores/useTransactionsStore';
import { useCategoriesStore } from '../stores/useCategoriesStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { X } from 'lucide-react';

export const TransactionsList = () => {
  const allTransactions = useTransactionsStore((state) => state.transactions);
  const filters = useTransactionsStore((state) => state.filters);
  const setFilters = useTransactionsStore((state) => state.setFilters);
  const removeTransaction = useTransactionsStore((state) => state.removeTransaction);
  const categories = useCategoriesStore((state) => state.categories);

  // Filter transactions based on current filters
  const filteredTransactions = allTransactions.filter((transaction) => {
    if (filters.type && filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }
    
    if (filters.category && transaction.category !== filters.category) {
      return false;
    }
    
    return true;
  });

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category?.color || '#6b7280';
  };

  const handleTypeFilter = (value: string) => {
    setFilters({ 
      ...filters, 
      type: value === 'all' ? 'all' : value as 'income' | 'expense' | 'all'
    });
  };

  const handleCategoryFilter = (value: string) => {
    setFilters({ 
      ...filters, 
      category: value === 'all' ? undefined : value 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <div className="flex gap-4 flex-wrap">
          <Select
            value={filters.type || 'all'}
            onValueChange={handleTypeFilter}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category || 'all'}
            onValueChange={handleCategoryFilter}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions found</p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getCategoryColor(transaction.category) }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge
                    variant={transaction.type === 'income' ? 'default' : 'secondary'}
                    className={transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTransaction(transaction.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
