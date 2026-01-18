'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check if user is logged in
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('authToken');

    if (!email || !token) {
      router.push('/login');
      return;
    }

    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Welcome back! 👋
          </h1>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* View Health Info */}
          <Link
            href="/health-info"
            className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3">📋</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              Health Information
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Access your health records 24/7
            </p>
          </Link>

          {/* Check Prescription */}
          <Link
            href="/prescriptions"
            className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3">💊</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              Prescriptions
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Check coverage & refill
            </p>
          </Link>

          {/* Pay Premium */}
          <Link
            href="/payments"
            className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3">💳</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              Pay Premium
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Manage monthly payments
            </p>
          </Link>

          {/* Enrollment */}
          <Link
            href="/enrollment"
            className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3">📝</div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              Enrollment
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              Talk to licensed agents
            </p>
          </Link>
        </div>

        {/* Coming Soon Features */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-pink-700 mb-4">
            Available 24/7
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-pink-700">View coverage details</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-pink-700">Download ID cards</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-pink-700">Check claims status</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-pink-700">Find doctors & facilities</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-pink-700">Update personal info</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-pink-700">Message support</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
