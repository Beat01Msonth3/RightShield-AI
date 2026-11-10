import { NextResponse } from 'next/server';
import { validateChatRequest } from '@/lib/utils/validation';
import { sanitizeInput } from '@/lib/utils/sanitization';
import { checkRateLimit } from '@/lib/utils/rate-limit';
import { runRAGPipeline } from '@/lib/rag';
import { getCrisisResponse } from '@/lib/safety/crisis';
import {
  extractVictimRoleFromMessage,
  getDomesticViolenceResponse,
} from '@/lib/safety/domestic-violence';
import { getSexualViolenceResponse } from '@/lib/safety/sexual-violence';
import { generateAIResponse } from '@/lib/ai/provider';
import { getDemoResponse } from '@/lib/demo/responses';

export async function POST(req: Request) {
  try {
    // 1. Extract IP for rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // 2. Parse & Validate request body
    const body = await req.json().catch(() => null);

    const validation = validateChatRequest(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: validation.error || 'Invalid request' },
        { status: 400 }
      );
    }

    const { message, language, demoMode } = validation.data;
    const sanitizedMsg = sanitizeInput(message);

    // 3. Check Demo Mode
    if (demoMode || process.env.NEXT_PUBLIC_DEMO_MODE === 'true') {
      const demoData = getDemoResponse(sanitizedMsg);
      return NextResponse.json({
        success: true,
        data: demoData,
        safetyLevel: 'safe',
        demo: true,
      });
    }

    // 4. Run RAG Pipeline & Pre-LLM Safety Classifier
    const ragResult = await runRAGPipeline(sanitizedMsg);
    const { context, safetyClassification } = ragResult;

    // 5. Intercept Crisis / Immediate Danger Flow
    if (safetyClassification.requiresCrisisFlow) {
      const crisisData = getCrisisResponse(
        safetyClassification.level as 'crisis' | 'immediate_danger'
      );
      return NextResponse.json({
        success: true,
        data: crisisData,
        safetyLevel: safetyClassification.level,
      });
    }

    // 6. Extract the situation ONCE — used by both DV and SV branches below
    const situation = extractVictimRoleFromMessage(sanitizedMsg);

    // Clear domestic-violence disclosures receive deterministic survivor-first guidance.
    if (safetyClassification.flags.includes('domestic_violence')) {
      return NextResponse.json({
        success: true,
        data: getDomesticViolenceResponse(situation),
        safetyLevel: safetyClassification.level,
      });
    }

    // Sexual-violence disclosures receive deterministic survivor-first guidance.
    if (safetyClassification.flags.includes('sexual_violence')) {
      return NextResponse.json({
        success: true,
        data: getSexualViolenceResponse(situation),
        safetyLevel: safetyClassification.level,
      });
    }

    // 7. Generate AI Response via Multi-provider chain
    const aiData = await generateAIResponse(sanitizedMsg, context, language);

    // 8. Return structured output with security headers
    return NextResponse.json(
      {
        success: true,
        data: aiData,
        safetyLevel: safetyClassification.level,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0, must-revalidate',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
        },
      }
    );
  } catch (err) {
    // Log error type only, NEVER request content
    console.error('[API /chat] Error:', (err as Error).message);
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}