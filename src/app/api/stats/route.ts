import { NextResponse } from 'next/server';

export async function GET() {
  // Public endpoint with platform statistics
  const stats = {
    totalFarmers: 856,
    totalAcres: 125000,
    carbonCreditsIssued: 45600,
    biomassTraded: 15200, // tons
    totalRevenueGenerated: 34500000,
    activeBuyers: 145,
    projectsVerified: 89,
    statesActive: 12,
    co2Prevented: 45600, // tCO2e
  };

  return NextResponse.json(stats);
}
