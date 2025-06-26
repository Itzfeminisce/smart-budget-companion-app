
import { useTransactionsStore } from '../stores/useTransactionsStore';
import { useCategoriesStore } from '../stores/useCategoriesStore';
import { StatCard } from './ui/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { format, subDays, startOfDay } from 'date-fns';

export const Dashboard = () => {
  const transactions = useTransactionsStore((state) => state.transactions);
  const totalIncome = useTransactionsStore((state) => state.getTotalIncome());
  const totalExpenses = useTransactionsStore((state) => state.getTotalExpenses());
  const balance = useTransactionsStore((state) => state.getBalance());
  const categories = useCategoriesStore((state) => state.categories);

  // Calculate spending by category for pie chart
  const categorySpending = categories
    .filter((cat) => cat.type === 'expense' || cat.type === 'both')
    .map((category) => {
      const amount = transactions
        .filter((t) => t.type === 'expense' && t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        name: category.name,
        value: amount,
        color: category.color,
      };
    })
    .filter((item) => item.value > 0);

  // Calculate last 7 days spending for trend chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
    const dateStr = format(date, 'yyyy-MM-dd');
    
    const dayExpenses = transactions
      .filter((t) => t.type === 'expense' && format(new Date(t.date), 'yyyy-MM-dd') === dateStr)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dayIncome = transactions
      .filter((t) => t.type === 'income' && format(new Date(t.date), 'yyyy-MM-dd') === dateStr)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      date: format(date, 'MMM d'),
      expenses: dayExpenses,
      income: dayIncome,
    };
  });

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Balance"
          value={`$${balance.toFixed(2)}`}
          icon={<Wallet className="h-5 w-5 text-blue-600" />}
          className={balance >= 0 ? "border-green-200" : "border-red-200"}
        />
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toFixed(2)}`}
          icon={<TrendingUp className="h-5 w-5 text-green-600" />}
          className="border-green-200"
        />
        <StatCard
          title="Total Expenses"
          value={`$${totalExpenses.toFixed(2)}`}
          icon={<TrendingDown className="h-5 w-5 text-red-600" />}
          className="border-red-200"
        />
        <StatCard
          title="Transactions"
          value={transactions.length.toString()}
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {categorySpending.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categorySpending}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-300 flex items-center justify-center text-gray-500">
                No expense data to display
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>7-Day Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={last7Days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, '']} />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
