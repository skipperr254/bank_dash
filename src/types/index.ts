export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

export interface Account {
  id: string;
  user_id: string;
  account_type: 'checking' | 'savings' | 'credit';
  account_number: string;
  balance: number;
  currency: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  account_id: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description: string;
  category: string;
  created_at: string;
  recipient_name?: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface BillPayment {
  id: string;
  user_id: string;
  payee: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'pending' | 'overdue';
  category: string;
  recurring: boolean;
}