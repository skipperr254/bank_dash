import React from 'react';
import { User } from '../../types';

interface ProfileSectionProps {
  user: User;
  onUpdate: (data: Partial<User>) => void;
}

export default function ProfileSection({ user, onUpdate }: ProfileSectionProps) {
  const [fullName, setFullName] = React.useState(user.full_name);
  const [email, setEmail] = React.useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ full_name: fullName });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
          <p className="mt-1 text-sm text-gray-500">
            Contact support to change your email address
          </p>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}