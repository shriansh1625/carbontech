import { NextResponse } from 'next/server';

export async function GET() {
  // Demo carbon credit projects for the public marketplace
  const projects = [
    { id: '1', name: 'Punjab No-Burn Initiative', type: 'Stubble Management', credits: 500, price: 800, available: 350, location: 'Punjab', verified: true },
    { id: '2', name: 'Haryana Biochar Project', type: 'Biochar Production', credits: 300, price: 1200, available: 180, location: 'Haryana', verified: true },
    { id: '3', name: 'MP Soil Carbon Project', type: 'Soil Carbon', credits: 800, price: 600, available: 600, location: 'Madhya Pradesh', verified: true },
    { id: '4', name: 'UP Rice Paddy Methane Reduction', type: 'Methane Reduction', credits: 450, price: 950, available: 200, location: 'Uttar Pradesh', verified: true },
    { id: '5', name: 'Rajasthan Agroforestry Project', type: 'Agroforestry', credits: 1200, price: 700, available: 900, location: 'Rajasthan', verified: false },
    { id: '6', name: 'Maharashtra Cover Crop Program', type: 'Cover Cropping', credits: 350, price: 550, available: 350, location: 'Maharashtra', verified: true },
  ];

  return NextResponse.json({ projects });
}
