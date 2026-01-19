'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface Provider {
  id: string;
  name: string;
  specialty: string;
  location: string;
  distance: string;
  rating: number;
  phone: string;
  acceptingPatients: boolean;
  languages: string[];
}

const sampleProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Primary Care Physician',
    location: 'Downtown Medical Center, 123 Main St',
    distance: '0.5 miles',
    rating: 4.8,
    phone: '(555) 123-4567',
    acceptingPatients: true,
    languages: ['English', 'Spanish'],
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Cardiologist',
    location: 'Heart Health Clinic, 456 Oak Ave',
    distance: '2.3 miles',
    rating: 4.9,
    phone: '(555) 234-5678',
    acceptingPatients: true,
    languages: ['English'],
  },
  {
    id: '3',
    name: 'Dr. Emily Davis',
    specialty: 'Pediatrician',
    location: 'Children\'s Medical Group, 789 Pine Rd',
    distance: '1.8 miles',
    rating: 4.7,
    phone: '(555) 345-6789',
    acceptingPatients: true,
    languages: ['English', 'Spanish', 'French'],
  },
  {
    id: '4',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    location: 'Skin Care Center, 321 Elm St',
    distance: '3.2 miles',
    rating: 4.6,
    phone: '(555) 456-7890',
    acceptingPatients: false,
    languages: ['English', 'Mandarin'],
  },
  {
    id: '5',
    name: 'Dr. Lisa Rodriguez',
    specialty: 'Dentist',
    location: 'Bright Smile Dental, 654 Maple Dr',
    distance: '1.2 miles',
    rating: 4.9,
    phone: '(555) 567-8901',
    acceptingPatients: true,
    languages: ['English', 'Spanish'],
  },
  {
    id: '6',
    name: 'Happy Valley Urgent Care',
    specialty: 'Urgent Care Center',
    location: 'Happy Valley Center, 987 Cedar Ln',
    distance: '0.8 miles',
    rating: 4.5,
    phone: '(555) 678-9012',
    acceptingPatients: true,
    languages: ['English', 'Spanish'],
  },
];

const specialties = [
  'All Specialties',
  'Primary Care Physician',
  'Cardiologist',
  'Pediatrician',
  'Dermatologist',
  'Dentist',
  'Urgent Care',
];

export default function FindCarePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [filteredProviders, setFilteredProviders] = useState(sampleProviders);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    let results = sampleProviders;

    // Filter by specialty
    if (selectedSpecialty !== 'All Specialties') {
      results = results.filter((p) => p.specialty === selectedSpecialty);
    }

    // Filter by search text
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.specialty.toLowerCase().includes(query)
      );
    }

    setFilteredProviders(results);
  }, [searchText, selectedSpecialty]);

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

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
          Find Care
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm mb-8 sm:mb-12">
          🏥 Search our network of in-network doctors, specialists, and hospitals near you.
        </p>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
          {/* Search Input */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
              Search by Doctor Name or Location
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="e.g., Dr. Johnson or Downtown Medical Center"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Specialty Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3">
              Filter by Specialty
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedSpecialty === specialty
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredProviders.length}</span> in-network provider
          {filteredProviders.length !== 1 ? 's' : ''}
        </div>

        {/* Providers List */}
        <div className="space-y-4 mb-12">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 sm:p-6 border-l-4 border-pink-600"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  {/* Provider Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 break-words">{provider.name}</h3>
                      {provider.acceptingPatients && (
                        <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          Accepting
                        </span>
                      )}
                      {!provider.acceptingPatients && (
                        <span className="ml-2 inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          Not Accepting
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-pink-600 font-medium mb-2">{provider.specialty}</p>

                    <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-3">
                      <div className="flex items-start gap-2">
                        <span className="text-base">📍</span>
                        <span className="break-words">{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">📏</span>
                        <span>{provider.distance}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">📞</span>
                        <span className="font-mono">{provider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-base">🗣️</span>
                        <span>{provider.languages.join(', ')}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(provider.rating))}
                        {provider.rating % 1 !== 0 && '½'}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        {provider.rating}/5 rating
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors whitespace-nowrap">
                      Schedule Appointment
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors whitespace-nowrap">
                      Call Provider
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-3xl mb-4">🔍</div>
              <p className="text-gray-600 text-sm sm:text-base">No providers found matching your search.</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-8">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">💡 About In-Network Providers</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li>✓ All listed providers are in-network and covered under your Ambetter plan</li>
            <li>✓ Visit an in-network provider to ensure lowest copay and deductible application</li>
            <li>✓ Your copay for office visits ranges from $5-$25 depending on the type of visit</li>
            <li>✓ Not seeing your preferred provider? Call Member Services at 1-800-AMBETTER</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/health-info"
            className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">View Your Benefits</h4>
            <p className="text-xs text-gray-600 mt-1">Check your coverage and deductible</p>
          </Link>

          <Link
            href="/id-card"
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📇</div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">Your ID Card</h4>
            <p className="text-xs text-gray-600 mt-1">View and download your member ID</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
