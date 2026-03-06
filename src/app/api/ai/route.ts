import { NextRequest, NextResponse } from 'next/server';
import { getFarmingAdvice, estimateCarbonCredits, analyzeResidue } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (!action) {
      return NextResponse.json({ error: 'Action is required' }, { status: 400 });
    }

    let result: string;

    switch (action) {
      case 'farming-advice': {
        if (!data?.question) {
          return NextResponse.json({ error: 'Question is required' }, { status: 400 });
        }
        result = await getFarmingAdvice(data.question);
        break;
      }
      case 'estimate-carbon': {
        const { farmSize, cropType, practices } = data || {};
        if (!farmSize || !cropType || !practices?.length) {
          return NextResponse.json({ error: 'farmSize, cropType, and practices are required' }, { status: 400 });
        }
        result = await estimateCarbonCredits(farmSize, cropType, practices);
        break;
      }
      case 'analyze-residue': {
        const { crop, amount } = data || {};
        if (!crop || !amount) {
          return NextResponse.json({ error: 'crop and amount are required' }, { status: 400 });
        }
        result = await analyzeResidue(crop, amount);
        break;
      }
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json({ error: 'AI service error' }, { status: 500 });
  }
}
