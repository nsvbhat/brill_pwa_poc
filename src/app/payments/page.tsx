'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function PaymentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div className="min-h-screen bg-gray-50" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Link
          href="/dashboard"
          className="text-pink-600 hover:text-pink-800 mb-6 inline-block text-xs sm:text-sm"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Pay Your Premium
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm mb-8 sm:mb-12">
          💳 Manage your monthly premium payments online.
        </p>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Current Month Premium</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">$328.50</p>
            <p className="text-xs text-gray-500 mt-2">Due: 02/01/2026</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Next Payment</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">Paid ✓</p>
            <p className="text-xs text-gray-500 mt-2">Paid on 01/15/2026</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-gray-600 mb-2">Account Status</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">Active</p>
            <p className="text-xs text-gray-500 mt-2">Coverage through 12/31/2026</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Payment Methods</h2>
          
          <div className="space-y-4">
            {/* Bank Account */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">Bank Account</p>
                  <p className="text-xs text-gray-600 mt-1">Checking ending in 4321</p>
                  <p className="text-xs text-gray-500 mt-1">✓ Auto-pay enabled (1st of each month)</p>
                </div>
                <button className="text-pink-600 hover:text-pink-700 text-xs sm:text-sm font-medium">
                  Change
                </button>
              </div>
            </div>

            {/* Credit Card */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">Credit Card</p>
                  <p className="text-xs text-gray-600 mt-1">Visa ending in 9876</p>
                  <p className="text-xs text-gray-500 mt-1">Expires 12/2027</p>
                </div>
                <button className="text-pink-600 hover:text-pink-700 text-xs sm:text-sm font-medium">
                  Use This
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Make One-Time Payment
          </button>
        </div>

        {/* Payment History */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Date</th>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Amount</th>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Method</th>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3 text-gray-600">01/15/2026</td>
                  <td className="p-2 sm:p-3 text-gray-900">$328.50</td>
                  <td className="p-2 sm:p-3 text-gray-600">Auto-pay (Bank)</td>
                  <td className="p-2 sm:p-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Processed
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3 text-gray-600">12/15/2025</td>
                  <td className="p-2 sm:p-3 text-gray-900">$328.50</td>
                  <td className="p-2 sm:p-3 text-gray-600">Auto-pay (Bank)</td>
                  <td className="p-2 sm:p-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Processed
                    </span>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3 text-gray-600">11/15/2025</td>
                  <td className="p-2 sm:p-3 text-gray-900">$328.50</td>
                  <td className="p-2 sm:p-3 text-gray-600">Auto-pay (Bank)</td>
                  <td className="p-2 sm:p-3">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Processed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Auto-Pay Settings */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">⚙️ Auto-Pay Settings</h3>
          <p className="text-xs sm:text-sm text-pink-900 mb-4">
            Your premium is automatically deducted from your bank account on the 1st of each month. No action needed!
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-xs sm:text-sm text-gray-900">Auto-Pay</p>
              <p className="text-xs text-gray-600">Bank Account ending in 4321</p>
            </div>
            <div className="flex gap-2">
              <button className="text-pink-600 hover:text-pink-700 text-xs sm:text-sm font-medium">
                Modify
              </button>
              <button className="text-red-600 hover:text-red-700 text-xs sm:text-sm font-medium">
                Disable
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
