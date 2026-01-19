'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { downloadFile, captureFromCamera, getFileExtension } from '@/lib/pwa-utils';

export default function PrescriptionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [cameraSupported, setCameraSupported] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    setLoading(false);
    
    // Check if camera is supported
    const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setCameraSupported(hasCamera);
  }, [router]);

  if (loading) return <div className="min-h-screen bg-gray-50" />;

  const handleDownloadPrescription = async () => {
    try {
      // Create a sample prescription PDF content
      const pdfContent = `
AMBETTER HEALTH - PRESCRIPTION
==============================

Patient: John Doe
Date: ${new Date().toLocaleDateString()}

Prescriptions:
1. Lisinopril 10mg
   Qty: 30 tablets
   Refills: 3
   
2. Metformin 500mg
   Qty: 60 tablets
   Refills: 5

This is a sample prescription document.
Please contact your pharmacy to refill.
      `;

      await downloadFile('Ambetter-Prescriptions.txt', pdfContent, 'text/plain');
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download prescription');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Simulate upload (in real app, send to server)
      console.log('📤 Uploading file:', file.name, file.size, 'bytes');
      
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setUploadedFile(`${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      console.log('✅ File uploaded successfully');
      alert(`✅ Prescription uploaded: ${file.name}`);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload prescription');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCameraCapture = async () => {
    setUploading(true);
    try {
      console.log('📸 Opening camera...');
      const blob = await captureFromCamera();
      
      if (blob) {
        setUploadedFile(`Camera-Capture-${Date.now()}.jpg (${(blob.size / 1024).toFixed(2)} KB)`);
        console.log('✅ Photo captured and uploaded');
        alert('✅ Prescription photo captured and uploaded');
      } else {
        alert('Failed to capture photo');
      }
    } catch (error) {
      console.error('Camera capture failed:', error);
      alert('Camera not available or permission denied');
    } finally {
      setUploading(false);
    }
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
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 sm:p-6 mb-8 sm:mb-12">
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

        {/* Download & Upload Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">📄 Prescription Documents</h3>
          <p className="text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
            Download your prescriptions or upload new ones from your device or camera.
          </p>

          {/* Download Button */}
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-white rounded-lg border-2 border-dashed border-purple-300">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">⬇️ Download Prescriptions</h4>
            <button
              onClick={handleDownloadPrescription}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              📥 Download as Text
            </button>
            <p className="text-xs text-purple-600 mt-2">
              Download your current prescriptions to your device
            </p>
          </div>

          {/* Upload Section */}
          <div className="p-4 sm:p-5 bg-white rounded-lg border-2 border-dashed border-blue-300">
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">⬆️ Upload New Prescription</h4>
            
            <div className="space-y-3">
              {/* File Upload */}
              <div>
                <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-2">
                  From Device Storage
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {uploading ? '⏳ Uploading...' : '📁 Choose File'}
                </button>
              </div>

              {/* Camera Capture */}
              {cameraSupported && (
                <div>
                  <label className="text-xs sm:text-sm text-gray-700 font-medium block mb-2">
                    From Camera
                  </label>
                  <button
                    onClick={handleCameraCapture}
                    disabled={uploading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {uploading ? '⏳ Capturing...' : '📷 Take Photo'}
                  </button>
                </div>
              )}

              {/* Upload Status */}
              {uploadedFile && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-green-800">
                    ✅ <strong>Uploaded:</strong> {uploadedFile}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
