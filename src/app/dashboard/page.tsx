'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
// import { APP_VERSION } from '@/lib/version';

interface DynamicService {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  color: string;
  isNew: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [dynamicServices, setDynamicServices] = useState<DynamicService[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

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

    // Fetch dynamic services from server
    fetch('/api/services/list')
      .then((res) => res.json())
      .then((data) => {
        setDynamicServices(data.services || []);
        setServicesLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load dynamic services:', err);
        setServicesLoading(false);
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Version Badge */}
      {/* <div className="fixed top-16 right-4 bg-[#00d4ff] text-white text-xs sm:text-sm px-3 py-1.5 rounded-full font-semibold shadow-lg z-40">
        {APP_VERSION.split('-')[1]}
      </div> */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Welcome back! 👋
          </h1>
        </div>

        {/* Dynamic Services Grid */}
        {servicesLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading services...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {/* Render all services dynamically */}
              {dynamicServices.map((service) => (
                <Link
                  key={service.id}
                  href={service.url}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-t-4"
                  style={{ borderTopColor: service.color }}
                >
                  <div className="text-3xl sm:text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {service.name}
                    {service.isNew && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded ml-2">
                        New
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {service.description}
                  </p>
                </Link>
              ))}

              {/* Sign Out Button - Always Last */}
              <button
                onClick={handleLogout}
                className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-gray-600 hover:bg-gray-50"
              >
                <div className="text-3xl sm:text-4xl mb-3">🚪</div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                  Sign Out
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Securely logout
                </p>
              </button>
            </div>

            {/* Dynamic Services Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-3">
                ✨ All Services Are Dynamic
              </h2>
              <p className="text-blue-800 text-xs sm:text-sm mb-3">
                Every service displayed here is fetched from the server. Add, update, or remove services without redeploying the app!
              </p>
              <p className="text-blue-700 text-xs sm:text-sm">
                <strong>{dynamicServices.length}</strong> service(s) currently available. {dynamicServices.filter(s => s.isNew).length} new this release.
              </p>
            </div>
          </>
        )}

        {/* Coming Soon Features */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-blue-900 mb-4">
            Available 24/7
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-blue-900">View coverage details</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-blue-900">Download ID cards</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-blue-900">Check claims status</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-blue-900">Find doctors & facilities</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-blue-900">Update personal info</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✓</span>
              <span className="text-xs sm:text-sm text-blue-900">Message support</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
