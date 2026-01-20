'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Scenario1() {
  const [logoUrl, setLogoUrl] = useState('/ambetter-logo.png');
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    fetch('/api/config/logo')
      .then((res) => res.json())
      .then((data) => {
        setLogoUrl(data.url);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 inline-block text-sm sm:text-base">
          ← Back to Home
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Scenario 1: Dynamic Image Updates
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            🖼️ Change Server Image → Client Sees Update (No App Redeployment)
          </h2>
          <p className="text-gray-700 text-xs sm:text-sm">
            The app fetches the logo URL from the API at runtime. Update the image URL on your server 
            or in environment variables, and the PWA will immediately display the new logo without 
            requiring any marketplace update.
          </p>
        </div>

        {/* Live Demo */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Live Demo</h3>

          {loading ? (
            <div className="text-center py-8 text-xs sm:text-sm">Loading...</div>
          ) : (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="bg-gray-100 p-4 sm:p-8 rounded-lg border-2 border-dashed border-gray-300 w-full sm:w-auto">
                <img
                  src={logoUrl}
                  alt="Current Logo"
                  className="h-16 sm:h-20 object-contain mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23ddd%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23999%22%3ELogo%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm break-all px-2">
                Logo URL: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{logoUrl}</code>
              </p>
            </div>
          )}
        </div>

        {/* How to Test */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">How to Test This</h3>
          <ol className="space-y-3 sm:space-y-4 list-decimal list-inside text-gray-700 text-xs sm:text-sm">
            <li>
              <strong>Update the environment variable:</strong>
              <p className="ml-4 sm:ml-6 text-xs sm:text-sm text-gray-600 mt-1">
                In your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>, change:
              </p>
              <pre className="ml-3 sm:ml-6 bg-gray-900 text-white p-2 sm:p-3 rounded text-xs sm:text-sm mt-2 overflow-x-auto">
LOGO_URL=/your-new-logo.png
              </pre>
            </li>
            <li>
              <strong>Refresh the browser:</strong> The new logo will appear without any app code changes.
            </li>
            <li>
              <strong>No marketplace update required:</strong> Users already have the app installed 
              and will see the new image on next refresh.
            </li>
          </ol>
        </div>

        {/* Implementation */}
        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Implementation Details</h3>

          <button
            onClick={() => setShowCode(!showCode)}
            className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded mb-3 sm:mb-4 hover:bg-blue-700 text-xs sm:text-sm"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>

          {showCode && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-xs sm:text-sm">API Route: /api/config/logo</h4>
                <pre className="bg-gray-900 text-white p-2 sm:p-4 rounded overflow-x-auto text-xs sm:text-sm">
{`import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    url: process.env.LOGO_URL || '/ambetter-logo.png',
    lastUpdated: new Date().toISOString(),
  });
}`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Client Component: Navigation.tsx</h4>
                <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`useEffect(() => {
  fetch('/api/config/logo')
    .then((res) => res.json())
    .then((data) => setLogoUrl(data.url))
    .catch(() => {});
}, []);

// Then render:
<img src={logoUrl} alt="Logo" />`}
                </pre>
              </div>
            </div>
          )}

          <div className="mt-4 sm:mt-6 bg-green-50 border border-green-200 rounded p-3 sm:p-4">
            <h4 className="font-semibold text-green-900 mb-2 text-xs sm:text-sm">✓ Key Benefits</h4>
            <ul className="space-y-1 sm:space-y-2 text-green-800 text-xs sm:text-sm">
              <li>• Update branding instantly across all devices</li>
              <li>• No app marketplace redeployment needed</li>
              <li>• Changes are reflected on app refresh</li>
              <li>• Works with any static asset (images, fonts, etc.)</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
