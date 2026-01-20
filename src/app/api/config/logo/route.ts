import { NextResponse } from 'next/server';

// Demo: Returns the logo URL that can be used for dynamic updates
// In a real app, this could be connected to a database or CMS
export async function GET() {
  return NextResponse.json({
    url: process.env.LOGO_URL || '/ambetter-logo.png',
    lastUpdated: new Date().toISOString(),
  });
}
