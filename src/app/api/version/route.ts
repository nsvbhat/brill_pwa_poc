import { NextResponse } from 'next/server';

export function GET() {
  const version = process.env.NEXT_PUBLIC_CACHE_VERSION || '1.0.0';
  return NextResponse.json({ 
    version: `ambetter-v${version}`,
    timestamp: new Date().toISOString()
  });
}
