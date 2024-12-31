import React from 'react';
import { ArrowLeftRight } from 'lucide-react';
import TransferForm from '../components/transfers/TransferForm';
import TransactionList from '../components/accounts/TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import { supabase } from '../lib/supabase';

export default function Transfers() {
  const { transactions, loading } = useTransactions();

  const handleTransfer = async (data: {
    fromAccount: string;
    toAccount: string;
    amount: number;
    description: string;
  }) => {
    try {
      // Create withdrawal transaction
      await supabase.from('transactions').insert([
        {
          account_id: data.fromAccount,
          type: 'withdrawal',
          amount: data.amount,
          description: data.description,
          status: 'completed',
        },
      ]);

      // Create deposit transaction
      await supabase.from('transactions').insert([
        {
          account_id: data.toAccount,
          type: 'deposit',
          amount: data.amount,
          description: data.description,
          status: 'completed',
        },
      ]);

      // Update account balances
      await supabase.rpc('transfer_funds', {
        from_account: data.fromAccount,
        to_account: data.toAccount,
        amount: data.amount,
      });
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transfers</h1>
        <div className="p-2 bg-blue-50 rounded-full">
          <ArrowLeftRight className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Make a Transfer</h2>
          <TransferForm onSubmit={handleTransfer} />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Transfers</h2>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <TransactionList 
              transactions={transactions.filter(t => t.type === 'transfer')} 
            />
          )}
        </div>
      </div>
    </div>
  );
}