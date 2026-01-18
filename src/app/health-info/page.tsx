'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function HealthInfoPage() {
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
          Health Information
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm mb-8 sm:mb-12">
          📋 Access your health records, coverage details, and claim history 24/7.
        </p>

        {/* Coverage Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">📄 Coverage Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Plan Type:</span>
                <span className="font-semibold text-gray-900">HMO</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Member ID:</span>
                <span className="font-semibold text-gray-900">AMB123456789</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Group #:</span>
                <span className="font-semibold text-gray-900">78901</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Effective Date:</span>
                <span className="font-semibold text-gray-900">01/01/2026</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-medium text-xs sm:text-sm transition-colors">
              Download ID Card
            </button>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">💰 Deductibles & Costs</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Deductible:</span>
                <span className="font-semibold text-gray-900">$500</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Out-of-Pocket Max:</span>
                <span className="font-semibold text-gray-900">$3,500</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Copay (Office Visit):</span>
                <span className="font-semibold text-gray-900">$25</span>
              </div>
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="text-gray-600">Specialist Copay:</span>
                <span className="font-semibold text-gray-900">$40</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded font-medium text-xs sm:text-sm transition-colors">
              View Full Details
            </button>
          </div>
        </div>

        {/* Health Records */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">📊 Recent Claims</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Date</th>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Service</th>
                  <th className="text-left p-2 sm:p-3 font-semibold text-gray-900">Provider</th>
                  <th className="text-right p-2 sm:p-3 font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3 text-gray-600">01/15/2026</td>
                  <td className="p-2 sm:p-3 text-gray-900">Office Visit</td>
                  <td className="p-2 sm:p-3 text-gray-600">Dr. Smith</td>
                  <td className="text-right p-2 sm:p-3 text-gray-900">$25.00</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3 text-gray-600">01/10/2026</td>
                  <td className="p-2 sm:p-3 text-gray-900">Lab Work</td>
                  <td className="p-2 sm:p-3 text-gray-600">Quest Labs</td>
                  <td className="text-right p-2 sm:p-3 text-gray-900">$0.00</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-2 sm:p-3 text-gray-600">01/05/2026</td>
                  <td className="p-2 sm:p-3 text-gray-900">Prescription</td>
                  <td className="p-2 sm:p-3 text-gray-600">CVS Pharmacy</td>
                  <td className="text-right p-2 sm:p-3 text-gray-900">$10.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 text-pink-600 hover:text-pink-700 font-medium text-xs sm:text-sm">
            View All Claims →
          </button>
        </div>

        {/* Available Services */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">🏥 Available Services</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
              <span className="text-green-600">✓</span> Primary Care Physicians
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
              <span className="text-green-600">✓</span> Specialist Visits
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
              <span className="text-green-600">✓</span> Emergency Care
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
              <span className="text-green-600">✓</span> Preventive Care
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
              <span className="text-green-600">✓</span> Mental Health Services
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-900">
              <span className="text-green-600">✓</span> Urgent Care Centers
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
