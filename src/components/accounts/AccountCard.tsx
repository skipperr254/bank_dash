import React from 'react';
import { CreditCard, Wallet, PiggyBank } from 'lucide-react';
import type { Account } from '../../types';

const accountIcons = {
  checking: Wallet,
  savings: PiggyBank,
  credit: CreditCard,
};

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
}

export default function AccountCard({ account, onClick }: AccountCardProps) {
  const Icon = accountIcons[account.account_type];

  return (
    <div 
      onClick={onClick}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-gray-500 uppercase">
          {account.account_type}
        </span>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-600">Account Number</p>
        <p className="text-lg font-medium">
          ••••{account.account_number.slice(-4)}
        </p>
        
        <p className="text-sm text-gray-600">Balance</p>
        <p className="text-2xl font-semibold text-gray-900">
          ${account.balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
}