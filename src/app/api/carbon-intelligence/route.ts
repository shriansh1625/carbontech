import { NextRequest, NextResponse } from 'next/server';
import { predictCarbonOutcomes } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { farmSize, cropType, residueAmount, practices } = await request.json();

    if (!farmSize || !cropType) {
      return NextResponse.json({ error: 'farmSize and cropType are required' }, { status: 400 });
    }

    const result = await predictCarbonOutcomes(
      farmSize,
      cropType,
      residueAmount || farmSize * 2,
      practices || ['residue_collection']
    );

    try {
      const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({ success: true, prediction: parsed });
    } catch {
      return NextResponse.json({ success: true, rawPrediction: result });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Prediction failed';
    // Fallback with estimated data
    return NextResponse.json({
      success: true,
      prediction: {
        estimatedCredits: 12.5,
        co2CapturePotential: 8.3,
        biomassProductionPotential: 15.0,
        estimatedRevenue: 125000,
        confidenceScore: 72,
        recommendations: [
          'Implement no-till farming to increase soil carbon sequestration',
          'Use cover crops during off-season to boost organic matter',
          'Collect and sell crop residue instead of burning',
          'Consider biochar application to improve soil carbon storage',
        ],
        breakdown: { biochar: 4.5, energy: 22.0, co2Avoidance: 6.8 },
      },
      fallback: true,
      error: message,
    });
  }
}
