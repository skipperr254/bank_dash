import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Transaction } from '../types';

export function useTransactions(accountId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        let query = supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });

        if (accountId) {
          query = query.eq('account_id', accountId);
        }

        const { data, error } = await query;

        if (error) throw error;
        setTransactions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [accountId]);

  return { transactions, loading, error };
}