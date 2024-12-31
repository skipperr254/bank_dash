import React from 'react';
import { Receipt, Plus } from 'lucide-react';
import BillCard from '../components/bills/BillCard';
import { supabase } from '../lib/supabase';
import type { BillPayment } from '../types';

export default function Bills() {
  const [bills, setBills] = React.useState<BillPayment[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchBills() {
      try {
        const { data } = await supabase
          .from('bill_payments')
          .select('*')
          .order('due_date', { ascending: true });
        
        setBills(data || []);
      } catch (error) {
        console.error('Error fetching bills:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBills();
  }, []);

  const handlePayBill = async (billId: string) => {
    try {
      await supabase
        .from('bill_payments')
        .update({ status: 'paid' })
        .eq('id', billId);

      setBills(bills.map(bill => 
        bill.id === billId ? { ...bill, status: 'paid' } : bill
      ));
    } catch (error) {
      console.error('Error paying bill:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
          <div className="p-2 bg-blue-50 rounded-full">
            <Receipt className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Bill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <BillCard
            key={bill.id}
            bill={bill}
            onPay={() => handlePayBill(bill.id)}
          />
        ))}
      </div>
    </div>
  );
}