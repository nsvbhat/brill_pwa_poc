'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isBiometricSupported, authenticateWithBiometric } from '@/lib/biometric-utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [demoEmail] = useState('john.doe@example.com');

  useEffect(() => {
    const checkBiometric = async () => {
      const supported = await isBiometricSupported();
      setBiometricAvailable(supported);
      // Auto-fill demo email
      setEmail(demoEmail);
    };
    checkBiometric();
  }, [demoEmail]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      if (email && password.length >= 6) {
        // Store in localStorage (simple demo auth)
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError('Please enter valid email and password (min 6 characters)');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setBiometricLoading(true);
    setError('');

    try {
      console.log('🔐 Initiating biometric authentication...');
      const success = await authenticateWithBiometric(demoEmail);

      if (success) {
        // Store in localStorage
        localStorage.setItem('authToken', 'biometric-token-' + Date.now());
        localStorage.setItem('userEmail', demoEmail);
        
        console.log('✅ Biometric login successful');
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError('Biometric authentication failed. Please try again or use password login.');
      }
    } catch (err) {
      console.error('Biometric login error:', err);
      setError('Biometric authentication unavailable. Please use password login.');
    } finally {
      setBiometricLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center px-4 py-8">
      {/* Home Button */}
      <Link 
        href="/"
        className="fixed top-4 left-4 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all text-xs sm:text-sm flex items-center gap-2 backdrop-blur-sm"
      >
        <span>🏠</span>
        <span className="hidden sm:inline">Home</span>
      </Link>

      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg p-3 inline-block mb-4">
            <img 
              src="/ambetter-logo.png"
              alt="Ambetter Health" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Ambetter Health
          </h1>
          <p className="text-pink-100 text-sm sm:text-base">
            Affordable Health Coverage
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-xs sm:text-sm">{error}</p>
            </div>
          )}

          {/* Biometric Login Option */}
          {biometricAvailable && (
            <>
              <button
                type="button"
                onClick={handleBiometricLogin}
                disabled={biometricLoading}
                className="w-full mb-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 sm:py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {biometricLoading ? (
                  <>
                    <span>⏳</span>
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <span>👆</span>
                    <span>Sign In with Fingerprint / Face</span>
                  </>
                )}
              </button>

              <div className="mb-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-pink-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-500"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-pink-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-xs sm:text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
            <p className="text-xs sm:text-sm text-pink-600 font-medium mb-2">Demo Login:</p>
            <p className="text-xs text-pink-600">Any email + password (min 6 chars)</p>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <div>
              <a href="#" className="text-pink-600 hover:text-pink-700 text-xs sm:text-sm font-medium">
                Forgot password?
              </a>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-pink-600 hover:text-pink-700 font-medium">
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-white text-xs sm:text-sm font-medium">Secure & Encrypted</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⏰</div>
            <p className="text-white text-xs sm:text-sm font-medium">24/7 Access</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📱</div>
            <p className="text-white text-xs sm:text-sm font-medium">Mobile Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
