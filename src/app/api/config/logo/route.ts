import { NextResponse } from 'next/server';

// Demo: This can be changed on the server without app marketplace redeployment
// The image URL can be updated in a database or environment variable
export async function GET() {
  return NextResponse.json({
    url: process.env.LOGO_URL || '/ambetter-logo-new.png',
    lastUpdated: new Date().toISOString(),
  });
}
