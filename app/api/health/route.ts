import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'RightsGuard AI API',
    timestamp: new Date().toISOString(),
    demoMode: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
    features: {
      sessionOnlyPrivacy: true,
      offlineSupport: true,
      ragEnabled: true,
      multiProviderAI: true,
    },
  });
}
