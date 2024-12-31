import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, CreditCard } from 'lucide-react';
import ProfileSection from '../components/settings/ProfileSection';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

export default function Settings() {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleUpdateProfile = async (data: Partial<User>) => {
    try {
      if (user) {
        await supabase
          .from('users')
          .update(data)
          .eq('id', user.id);
        
        setUser({ ...user, ...data });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <div className="p-2 bg-blue-50 rounded-full">
          <SettingsIcon className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfileSection user={user} onUpdate={handleUpdateProfile} />
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Push notifications</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">Security</h2>
            </div>
            <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Change Password
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
            </div>
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Manage Payment Methods
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}