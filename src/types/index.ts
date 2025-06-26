
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string; // ISO string
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  type: "income" | "expense" | "both";
}

export interface TransactionFilters {
  type?: "income" | "expense" | "all";
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}
