import { NextRequest, NextResponse } from 'next/server';
import { findGovernmentSchemes } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { farmSize, cropType, state, practices } = body;

    if (!farmSize || !cropType || !state) {
      return NextResponse.json({ error: 'farmSize, cropType, and state are required' }, { status: 400 });
    }

    const result = await findGovernmentSchemes(farmSize, cropType, state, practices || []);

    try {
      const cleanedResult = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const schemes = JSON.parse(cleanedResult);
      return NextResponse.json({ success: true, schemes });
    } catch {
      // Return well-structured fallback schemes
      const fallbackSchemes = [
        {
          name: 'Crop Residue Management (CRM) Scheme',
          ministry: 'Ministry of Agriculture & Farmers Welfare',
          description: 'Financial assistance for in-situ management of crop residue through farm mechanization',
          eligibility: ['Farmers in Punjab, Haryana, UP, NCR Delhi'],
          benefits: ['50-80% subsidy on crop residue management machinery'],
          maxSubsidy: 150000,
          category: 'machinery',
          matchScore: 90,
        },
        {
          name: 'PM-KUSUM (Solar Energy)',
          ministry: 'Ministry of New and Renewable Energy',
          description: 'Install solar pumps and grid-connected solar power plants on farmland',
          eligibility: ['All farmers with agricultural land'],
          benefits: ['60% subsidy on solar pumps', 'Additional income from solar energy'],
          maxSubsidy: 300000,
          category: 'energy',
          matchScore: 75,
        },
        {
          name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
          ministry: 'Ministry of Agriculture',
          description: 'Promote farm mechanization especially for small and marginal farmers',
          eligibility: ['Small and marginal farmers', 'SC/ST/Women farmers get priority'],
          benefits: ['40-50% subsidy on farm machinery'],
          maxSubsidy: 200000,
          category: 'machinery',
          matchScore: 85,
        },
        {
          name: 'National Biogas and Organic Manure Programme',
          ministry: 'Ministry of New & Renewable Energy',
          description: 'Setup biogas plants using agricultural waste and crop residue',
          eligibility: ['Farmers and dairy owners', 'Rural households'],
          benefits: ['Central subsidy for biogas plant installation'],
          maxSubsidy: 50000,
          category: 'environment',
          matchScore: 70,
        },
        {
          name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
          ministry: 'Ministry of Agriculture',
          description: 'Promote organic farming with carbon-positive practices',
          eligibility: ['Clusters of 50+ farmers', 'Farmers adopting organic practices'],
          benefits: ['₹50,000/hectare over 3 years'],
          maxSubsidy: 250000,
          category: 'agriculture',
          matchScore: 80,
        },
      ];
      return NextResponse.json({ success: true, schemes: fallbackSchemes, fallback: true });
    }
  } catch {
    return NextResponse.json({ error: 'Failed to find government schemes' }, { status: 500 });
  }
}
