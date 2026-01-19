'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Coverage',
    question: 'What does my plan cover?',
    answer:
      'Your Ambetter plan includes preventive care, office visits, hospital services, emergency care, mental health services, and prescription drug coverage. Visit your ID card or Health Information page for detailed benefits.',
  },
  {
    id: '2',
    category: 'Coverage',
    question: 'What is a deductible?',
    answer:
      "A deductible is the amount you must pay out of your own pocket for covered health services before your plan begins to share the cost. Your annual deductible is listed on your ID card. Once you've met your deductible, you typically pay a copay or coinsurance for services.",
  },
  {
    id: '3',
    category: 'Prescriptions',
    question: 'How do I refill my prescription?',
    answer:
      'You can refill your prescription by contacting your pharmacy directly, using the pharmacy app, or calling the pharmacy number on your ID card. You can also visit the Prescriptions section of this app to check coverage and refill status.',
  },
  {
    id: '4',
    category: 'Prescriptions',
    question: 'Are my medications covered?',
    answer:
      'Visit the Prescriptions page in this app to search for your medication and see its coverage tier and copay amount. We cover most common medications. If your medication is not covered, your doctor may request prior authorization.',
  },
  {
    id: '5',
    category: 'Doctors & Hospitals',
    question: 'How do I find an in-network doctor?',
    answer:
      'Use the "Find Care" section of this app to search our network of in-network doctors, specialists, and hospitals. Visiting in-network providers ensures you get the lowest copay and coinsurance rates.',
  },
  {
    id: '6',
    category: 'Doctors & Hospitals',
    question: 'What if my doctor is not in-network?',
    answer:
      'If your doctor is not in-network, you can still receive care, but you will pay a higher copay and coinsurance. We encourage you to find an in-network provider. Contact Member Services for assistance.',
  },
  {
    id: '7',
    category: 'Payments',
    question: 'How do I pay my premium?',
    answer:
      'You can pay your premium through the "Pay Premium" section of this app using a credit or debit card, or by setting up automatic payments. You can also pay by mail or phone by calling Member Services.',
  },
  {
    id: '8',
    category: 'Payments',
    question: 'Why was I charged more than usual?',
    answer:
      'Premium amounts may change due to plan updates, subsidy changes, or life events. Check the Payments section for a detailed billing breakdown. Contact Member Services for specific questions about your bill.',
  },
  {
    id: '9',
    category: 'Account',
    question: 'How do I update my information?',
    answer:
      'You can update your name, address, phone number, and email through the account settings. For coverage changes due to life events (marriage, birth, job loss), contact Member Services.',
  },
  {
    id: '10',
    category: 'Account',
    question: 'Is my personal information secure?',
    answer:
      'Yes. We use industry-standard encryption and security measures to protect your personal and health information. Your data is never shared without your consent.',
  },
  {
    id: '11',
    category: 'Account',
    question: 'What is the biometric login feature?',
    answer:
      'Biometric login allows you to sign in using your fingerprint or face recognition on compatible devices. This provides a secure and convenient way to access your account without remembering your password.',
  },
  {
    id: '12',
    category: 'ID Card',
    question: 'How do I download my ID card?',
    answer:
      'Go to the ID Card section in this app and click "Download Card" to save a digital copy to your device. You can also take a screenshot or print the card to carry with you.',
  },
];

const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function SupportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    let results = faqs;

    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter((f) => f.category === selectedCategory);
    }

    // Filter by search text
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      results = results.filter(
        (f) =>
          f.question.toLowerCase().includes(query) ||
          f.answer.toLowerCase().includes(query)
      );
    }

    setFilteredFAQs(results);
  }, [searchText, selectedCategory]);

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
          Support & FAQ
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm mb-8 sm:mb-12">
          ❓ Find answers to common questions or contact our support team.
        </p>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-8">
          {/* Search Input */}
          <div className="mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2">
              Search Questions
            </label>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="e.g., How do I refill my prescription?"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-xs sm:text-sm bg-white text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredFAQs.length}</span> answer
          {filteredFAQs.length !== 1 ? 's' : ''}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-pink-600"
              >
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full p-4 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-left">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-xl text-pink-600 flex-shrink-0 mt-1">
                    {expandedId === faq.id ? '▼' : '▶'}
                  </div>
                </button>

                {/* Expanded Answer */}
                {expandedId === faq.id && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-3xl mb-4">🔍</div>
              <p className="text-gray-600 text-sm sm:text-base">No questions found matching your search.</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">Try adjusting your search terms.</p>
            </div>
          )}
        </div>

        {/* Contact Support Section */}
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-200 rounded-lg p-4 sm:p-6 lg:p-8 mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 mb-6">
            Our member services team is here to help. Contact us using any of these methods:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="bg-white rounded-lg p-4 sm:p-5">
              <div className="text-2xl mb-2">📞</div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Call Us</p>
              <p className="text-xs sm:text-sm text-pink-600 font-mono">1-800-AMBETTER</p>
              <p className="text-xs text-gray-600 mt-2">Available 24/7, 7 days a week</p>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg p-4 sm:p-5">
              <div className="text-2xl mb-2">📧</div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Email Us</p>
              <p className="text-xs sm:text-sm text-pink-600 font-mono">support@ambetterhealth.com</p>
              <p className="text-xs text-gray-600 mt-2">We'll respond within 24 hours</p>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-lg p-4 sm:p-5">
              <div className="text-2xl mb-2">💬</div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Live Chat</p>
              <button className="text-xs sm:text-sm text-pink-600 font-medium hover:underline">
                Start a conversation
              </button>
              <p className="text-xs text-gray-600 mt-2">Mon-Fri, 8 AM - 8 PM EST</p>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-lg p-4 sm:p-5">
              <div className="text-2xl mb-2">📍</div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">Visit Us</p>
              <p className="text-xs sm:text-sm text-gray-700">Find a local Ambetter office</p>
              <button className="text-xs sm:text-sm text-pink-600 font-medium hover:underline mt-2">
                Find locations
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/id-card"
            className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📇</div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">View ID Card</h4>
            <p className="text-xs text-gray-600 mt-1">Download and share your card</p>
          </Link>

          <Link
            href="/find-care"
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">🏥</div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">Find a Provider</h4>
            <p className="text-xs text-gray-600 mt-1">Search our network of doctors</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
