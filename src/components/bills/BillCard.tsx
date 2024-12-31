import React from 'react';
import { Receipt, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { BillPayment } from '../../types';

interface BillCardProps {
  bill: BillPayment;
  onPay?: () => void;
}

export default function BillCard({ bill, onPay }: BillCardProps) {
  const getStatusIcon = () => {
    switch (bill.status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Receipt className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <h3 className="text-lg font-medium text-gray-900">{bill.payee}</h3>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          bill.status === 'paid'
            ? 'bg-green-100 text-green-800'
            : bill.status === 'overdue'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {bill.status}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-semibold text-gray-900">
          ${bill.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Due {format(new Date(bill.due_date), 'MMM d, yyyy')}
        </p>
        {bill.recurring && (
          <p className="text-sm text-blue-600">Recurring payment</p>
        )}
      </div>

      {bill.status === 'pending' && onPay && (
        <button
          onClick={onPay}
          className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Pay Now
        </button>
      )}
    </div>
  );
}