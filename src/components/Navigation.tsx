'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('authToken');
    if (email && token) {
      setUserEmail(email);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    router.push('/');
  };

  const isHomePage = pathname === '/';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={isLoggedIn ? '/dashboard' : '/'} className="flex items-center gap-2 sm:gap-3">
            <img 
              src="/ambetter-logo-new.png"
              alt="Ambetter Health" 
              className="h-8 sm:h-10 w-auto"
            />
            <span className="hidden sm:inline text-lg sm:text-xl font-bold text-pink-600">
              Ambetter
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/health-info"
                  className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Health Info
                </Link>
                <Link
                  href="/prescriptions"
                  className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Prescriptions
                </Link>
                <Link
                  href="/payments"
                  className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Payments
                </Link>
                <Link
                  href="/enrollment"
                  className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Enrollment
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="text-xs sm:text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1 hover:bg-gray-100 rounded"
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <div className="w-6 h-0.5 bg-gray-900"></div>
              <div className="w-6 h-0.5 bg-gray-900"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 mt-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-pink-600 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/health-info"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-pink-600 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Health Info
                </Link>
                <Link
                  href="/prescriptions"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-pink-600 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Prescriptions
                </Link>
                <Link
                  href="/payments"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-pink-600 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Payments
                </Link>
                <Link
                  href="/enrollment"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-pink-600 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enrollment
                </Link>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <p className="text-xs text-gray-600 px-2 py-2">{userEmail}</p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-xs sm:text-sm text-red-600 hover:text-red-700 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="block text-xs sm:text-sm text-gray-600 hover:text-pink-600 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/login"
                  className="block text-xs sm:text-sm text-pink-600 hover:text-pink-700 px-2 sm:px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
