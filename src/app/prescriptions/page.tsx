'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function PrescriptionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
          Prescription Coverage
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm mb-8 sm:mb-12">
          💊 Check coverage status and refill your prescriptions.
        </p>

        {/* Coverage Status */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Coverage Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-xs sm:text-sm text-gray-600">Formulary Tier 1</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">$5 - $10 Copay</p>
              <p className="text-xs text-gray-500 mt-1">Generic drugs</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <p className="text-xs sm:text-sm text-gray-600">Formulary Tier 2</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900">$25 - $35 Copay</p>
              <p className="text-xs text-gray-500 mt-1">Brand name</p>
            </div>
          </div>
        </div>

        {/* Current Prescriptions */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Your Prescriptions</h2>
          <div className="space-y-4">
            {/* Prescription 1 */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Lisinopril 10mg</h3>
                  <p className="text-xs text-gray-600 mt-1">Prescribed by: Dr. Sarah Johnson</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      ✓ Covered
                    </span>
                    <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                      Tier 1 - $5
                    </span>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-3 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm transition-colors">
                  Refill Now
                </button>
              </div>
            </div>

            {/* Prescription 2 */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Metformin 500mg</h3>
                  <p className="text-xs text-gray-600 mt-1">Prescribed by: Dr. James Wilson</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      ✓ Covered
                    </span>
                    <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                      Tier 1 - $5
                    </span>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-3 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm transition-colors">
                  Refill Now
                </button>
              </div>
            </div>

            {/* Prescription 3 - Not Covered */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">Premium Brand X 250mg</h3>
                  <p className="text-xs text-gray-600 mt-1">Prescribed by: Dr. Emily Davis</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      ⚠️ Prior Auth Needed
                    </span>
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Not Covered
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Generic alternative (Tier 1 - $5) is available</p>
                </div>
                <button className="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded font-medium text-xs sm:text-sm transition-colors">
                  View Alternatives
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Locator */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">🏪 Find a Network Pharmacy</h3>
          <p className="text-xs sm:text-sm text-gray-700 mb-4">
            Search our network of thousands of pharmacies to fill your prescriptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Enter your ZIP code"
              className="flex-1 px-3 sm:px-4 py-2 border-2 border-pink-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900 placeholder-gray-600"
            />
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors">
              Search
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
