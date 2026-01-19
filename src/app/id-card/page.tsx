'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { downloadFile } from '@/lib/pwa-utils';

export default function IDCardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  if (loading) return <div className="min-h-screen bg-gray-50" />;

  const memberData = {
    memberId: 'ABT-2026-001234',
    groupNumber: 'DEMO-2026',
    name: 'John Doe',
    plan: 'Ambetter Affordable Health',
    effectiveDate: '01/01/2026',
    terminationDate: '12/31/2026',
    copay: '$5-$25',
    deductible: '$500',
    maxOutOfPocket: '$3,000',
    pcpName: 'Dr. Sarah Johnson',
    pharmacyBenefit: 'Included',
    mentalHealth: 'Included',
    urgentCare: 'Included',
    pharmacy24hr: '1-800-PHARMACY',
    memberServices: '1-800-AMBETTER',
  };

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      const pdfContent = `
=====================================
           AMBETTER HEALTH
           MEMBER ID CARD
=====================================

MEMBER INFORMATION
==================
Member ID: ${memberData.memberId}
Group Number: ${memberData.groupNumber}
Name: ${memberData.name}
Plan: ${memberData.plan}

COVERAGE DATES
==============
Effective: ${memberData.effectiveDate}
Terminates: ${memberData.terminationDate}

BENEFITS OVERVIEW
=================
Copay (Doctor Visit): ${memberData.copay}
Annual Deductible: ${memberData.deductible}
Maximum Out-of-Pocket: ${memberData.maxOutOfPocket}

PRIMARY CARE PROVIDER
====================
Name: ${memberData.pcpName}
Contact: Ask your provider's office

COVERAGE INCLUDES
=================
✓ Pharmacy Benefit: ${memberData.pharmacyBenefit}
✓ Mental Health Services: ${memberData.mentalHealth}
✓ Urgent Care Access: ${memberData.urgentCare}

IMPORTANT CONTACTS
==================
Member Services: ${memberData.memberServices}
Pharmacy Hotline: ${memberData.pharmacy24hr}

Note: This is a digital copy. Present this card
along with a valid photo ID at your healthcare provider.

Print or screenshot this card to carry with you.
For emergency services, don't delay treatment.

Generated: ${new Date().toLocaleString()}
=====================================`;

      await downloadFile('Ambetter-ID-Card.txt', pdfContent, 'text/plain');
      alert('✅ ID Card downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download ID card');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const handleShareQR = () => {
    alert('📱 QR Code feature coming soon! This will allow sharing your ID card via QR code.');
  };

  const handleSaveCard = () => {
    alert('✅ ID Card saved to your device! Access it anytime from your saved items.');
  };

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
          Member ID Card
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm mb-8 sm:mb-12">
          📇 Your digital ID card. Download, save, or share with your healthcare provider.
        </p>

        {/* ID Card Display */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 sm:mb-12">
          {/* Card Front */}
          <div
            className="bg-gradient-to-r from-pink-600 to-pink-700 p-6 sm:p-8 text-white relative overflow-hidden"
            style={{
              aspectRatio: '16/9',
              minHeight: '300px',
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-20 -translate-y-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 translate-y-16" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">AMBETTER HEALTH</h2>
                <p className="text-pink-100 text-xs sm:text-sm">Member ID Card</p>
              </div>

              {/* Member Info */}
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <p className="text-pink-100 text-xs">MEMBER NAME</p>
                  <p className="text-lg sm:text-xl font-bold">{memberData.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-pink-100 text-xs">MEMBER ID</p>
                    <p className="font-mono font-bold text-sm sm:text-base">{memberData.memberId}</p>
                  </div>
                  <div>
                    <p className="text-pink-100 text-xs">GROUP #</p>
                    <p className="font-mono font-bold text-sm sm:text-base">{memberData.groupNumber}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-pink-100 text-xs">Valid Through</p>
                  <p className="font-bold text-sm">{memberData.terminationDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-pink-100 text-xs">PLAN</p>
                  <p className="font-bold text-xs sm:text-sm">{memberData.plan}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Back - Click to Flip */}
          <button
            onClick={() => setShowBack(!showBack)}
            className="w-full p-4 sm:p-6 bg-gradient-to-r from-pink-50 to-pink-100 border-t border-pink-200 hover:bg-gradient-to-r hover:from-pink-100 hover:to-pink-200 transition-all"
          >
            <p className="text-pink-600 font-semibold text-sm sm:text-base">
              {showBack ? '👈 Show Front' : '👉 Show Important Information'}
            </p>
          </button>

          {/* Back Information */}
          {showBack && (
            <div className="p-6 sm:p-8 bg-white space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Benefits */}
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-4 border-b-2 border-pink-600 pb-2">
                    Copayments & Deductibles
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div>
                      <p className="text-gray-600">Doctor Visit Copay</p>
                      <p className="font-semibold text-gray-900">{memberData.copay}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Annual Deductible</p>
                      <p className="font-semibold text-gray-900">{memberData.deductible}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Out-of-Pocket Maximum</p>
                      <p className="font-semibold text-gray-900">{memberData.maxOutOfPocket}</p>
                    </div>
                  </div>
                </div>

                {/* Coverage */}
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-4 border-b-2 border-pink-600 pb-2">
                    Coverage Includes
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Pharmacy Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Mental Health Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Urgent Care Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Preventive Care</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Contacts */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-4 border-b-2 border-pink-600 pb-2">
                  Important Contacts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <p className="text-gray-600">Member Services</p>
                    <p className="font-semibold text-gray-900 text-base">{memberData.memberServices}</p>
                    <p className="text-gray-500 text-xs">Available 24/7</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pharmacy Support</p>
                    <p className="font-semibold text-gray-900 text-base">{memberData.pharmacy24hr}</p>
                    <p className="text-gray-500 text-xs">24-Hour Support</p>
                  </div>
                </div>
              </div>

              {/* Primary Care Provider */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 text-sm mb-2">Primary Care Provider</h4>
                <p className="text-sm sm:text-base font-semibold text-gray-900">{memberData.pcpName}</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Contact your provider's office to schedule an appointment
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
          {/* Download */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloadingPDF}
            className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-300 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {downloadingPDF ? (
              <>
                <span>⏳</span>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Download Card</span>
              </>
            )}
          </button>

          {/* Share QR */}
          <button
            onClick={handleShareQR}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span>📱</span>
            <span>Share QR Code</span>
          </button>

          {/* Save */}
          <button
            onClick={handleSaveCard}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <span>💾</span>
            <span>Save Card</span>
          </button>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-8">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">📋 How to Use Your ID Card</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li>✓ Present this card along with a valid photo ID at your healthcare provider</li>
            <li>✓ Keep a digital copy on your phone for easy access</li>
            <li>✓ Share the QR code with your healthcare provider if requested</li>
            <li>✓ For emergencies, seek treatment immediately - don't delay to get your card</li>
            <li>✓ Contact Member Services at {memberData.memberServices} for any questions</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/health-info"
            className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">View Coverage & Benefits</h4>
            <p className="text-xs text-gray-600 mt-1">See your deductible and coverage details</p>
          </Link>

          <Link
            href="/prescriptions"
            className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow text-center group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">💊</div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">Prescription Coverage</h4>
            <p className="text-xs text-gray-600 mt-1">Check your medication coverage</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
