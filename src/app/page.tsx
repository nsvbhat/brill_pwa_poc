'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="bg-white rounded-lg p-3">
              <img 
                src="/ambetter-logo.png"
                alt="Ambetter Health" 
                className="h-20 w-auto"
              />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-pink-900 mb-3 sm:mb-4">
            Ambetter Health
          </h1>
          <p className="text-pink-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8">
            Your health, simplified. Access your health information 24/7 with our mobile-first PWA.
          </p>
          <Link
            href="/login"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-xs sm:text-sm"
          >
            Sign In to Your Account
          </Link>
        </div>

        {/* Key Features Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10 text-center">
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">💬</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Enrollment Questions
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Chat with our licensed agents about coverage options.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">📋</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Health Information
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Access your health records and coverage details 24/7.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">💊</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Prescription Coverage
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Check coverage and refill prescriptions instantly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">💳</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Pay Premium
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Manage your monthly payments easily.
              </p>
            </div>
          </div>
        </div>

        {/* PWA Benefits Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 lg:mb-10 text-center">
            Why Ambetter PWA?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Benefit 1 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 sm:p-6 rounded-lg border border-pink-200">
              <div className="text-2xl mb-3">📱</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Install on Home Screen
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                One tap install. No app store needed.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-lg border border-green-200">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Instant loading. Works offline too.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-lg border border-purple-200">
              <div className="text-2xl mb-3">🔄</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Always Up to Date
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                Auto-updates without you doing anything.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 sm:p-6 rounded-lg border border-orange-200">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                HTTPS encrypted. Your data is safe.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 sm:p-6 rounded-lg border border-pink-200">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Works Everywhere
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                iOS, Android, or web browser.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 sm:p-6 rounded-lg border border-yellow-200">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                Free to Use
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm">
                No subscription or download fees.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12 border-l-4 border-pink-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Demo Login Info
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-3">
                Try the app with demo credentials:
              </p>
              <div className="bg-pink-50 p-3 sm:p-4 rounded-lg border border-pink-200">
                <p className="text-xs sm:text-sm text-pink-700 mb-2">
                  <strong>Email:</strong> demo@ambetter.com
                </p>
                <p className="text-xs sm:text-sm text-pink-700 mb-2">
                  <strong>Password:</strong> Any password (min 6 chars)
                </p>
                <p className="text-xs text-pink-600">
                  This is a demo app - just for demonstration purposes.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Link
                href="/login"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-colors text-center text-xs sm:text-sm"
              >
                Start Exploring →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <p className="text-pink-700 text-xs sm:text-sm mb-4">
            Ready to experience Ambetter Health?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/login"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-xs sm:text-sm"
            >
              Sign In
            </Link>
            <a
              href="#"
              className="border-2 border-pink-600 text-pink-600 hover:bg-pink-50 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-xs sm:text-sm"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
