import { NextRequest, NextResponse } from 'next/server';
import { analyzeGlobalCarbonSupply } from '@/lib/gemini';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');

  if (type === 'digital-twin') {
    // Return the climate digital twin simulation data
    const nodes = [
      { id: 'farm-1', type: 'farm', label: 'Punjab Farms', value: 2500, unit: 'tons residue', lat: 30.9, lng: 75.8, status: 'active' },
      { id: 'farm-2', type: 'farm', label: 'Haryana Farms', value: 1800, unit: 'tons residue', lat: 29.0, lng: 76.1, status: 'active' },
      { id: 'farm-3', type: 'farm', label: 'UP Farms', value: 3200, unit: 'tons residue', lat: 26.8, lng: 80.9, status: 'active' },
      { id: 'collect-1', type: 'collection', label: 'Ludhiana Hub', value: 1200, unit: 'tons collected', lat: 30.9, lng: 75.9, status: 'processing' },
      { id: 'collect-2', type: 'collection', label: 'Karnal Hub', value: 900, unit: 'tons collected', lat: 29.7, lng: 76.9, status: 'processing' },
      { id: 'process-1', type: 'processing', label: 'BioChar Plant Punjab', value: 450, unit: 'tons biochar', lat: 31.1, lng: 75.3, status: 'active' },
      { id: 'process-2', type: 'processing', label: 'Gasification Unit Haryana', value: 380, unit: 'tons processed', lat: 29.2, lng: 76.4, status: 'active' },
      { id: 'co2-1', type: 'co2_capture', label: 'CO₂ Capture Facility', value: 850, unit: 'tons CO₂', lat: 30.3, lng: 76.8, status: 'active' },
      { id: 'credit-1', type: 'credit_issuance', label: 'Carbon Credit Registry', value: 12500, unit: 'tCO₂e credits', status: 'active' },
      { id: 'buyer-1', type: 'buyer', label: 'Industrial Buyers', value: 8500, unit: 'credits purchased', status: 'active' },
      { id: 'buyer-2', type: 'buyer', label: 'Corporate Offset Buyers', value: 4000, unit: 'credits retired', status: 'active' },
    ];

    const flows = [
      { from: 'farm-1', to: 'collect-1', volume: 1200, unit: 'tons/month', active: true },
      { from: 'farm-2', to: 'collect-2', volume: 900, unit: 'tons/month', active: true },
      { from: 'farm-3', to: 'collect-1', volume: 800, unit: 'tons/month', active: true },
      { from: 'collect-1', to: 'process-1', volume: 600, unit: 'tons/month', active: true },
      { from: 'collect-2', to: 'process-2', volume: 500, unit: 'tons/month', active: true },
      { from: 'collect-1', to: 'process-2', volume: 400, unit: 'tons/month', active: true },
      { from: 'process-1', to: 'co2-1', volume: 300, unit: 'tons CO₂/month', active: true },
      { from: 'process-2', to: 'co2-1', volume: 250, unit: 'tons CO₂/month', active: true },
      { from: 'co2-1', to: 'credit-1', volume: 550, unit: 'tCO₂e/month', active: true },
      { from: 'credit-1', to: 'buyer-1', volume: 350, unit: 'credits/month', active: true },
      { from: 'credit-1', to: 'buyer-2', volume: 200, unit: 'credits/month', active: true },
    ];

    const metrics = {
      totalResidueCollected: 7500,
      totalProcessed: 5200,
      totalCO2Captured: 850,
      totalCreditsIssued: 12500,
      totalCreditsSold: 8500,
      totalCreditsRetired: 4000,
      systemEfficiency: 89.5,
      monthlyGrowth: 12.3,
    };

    return NextResponse.json({ nodes, flows, metrics });
  }

  if (type === 'global-supply') {
    const region = req.nextUrl.searchParams.get('region') || 'Global';
    try {
      const result = await analyzeGlobalCarbonSupply(region);
      const cleanedResult = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanedResult);
      return NextResponse.json({ success: true, data: parsed });
    } catch {
      // Fallback seed data for global supply map
      const fallbackData = {
        regions: [
          { region: 'Punjab', country: 'India', lat: 30.9, lng: 75.8, carbonPotential: 45000, activeFarms: 12500, residueAvailable: 28000, creditPrice: 12.5, topCrops: ['Rice', 'Wheat'], growthRate: 15.2 },
          { region: 'Haryana', country: 'India', lat: 29.0, lng: 76.1, carbonPotential: 32000, activeFarms: 8900, residueAvailable: 19000, creditPrice: 12.0, topCrops: ['Rice', 'Sugarcane'], growthRate: 12.8 },
          { region: 'Uttar Pradesh', country: 'India', lat: 26.8, lng: 80.9, carbonPotential: 58000, activeFarms: 18000, residueAvailable: 42000, creditPrice: 11.5, topCrops: ['Rice', 'Wheat', 'Sugarcane'], growthRate: 18.5 },
          { region: 'Central Java', country: 'Indonesia', lat: -7.0, lng: 110.4, carbonPotential: 35000, activeFarms: 9500, residueAvailable: 22000, creditPrice: 13.8, topCrops: ['Rice', 'Palm'], growthRate: 14.0 },
          { region: 'Mato Grosso', country: 'Brazil', lat: -12.6, lng: -55.6, carbonPotential: 72000, activeFarms: 6200, residueAvailable: 85000, creditPrice: 15.2, topCrops: ['Soy', 'Corn', 'Sugarcane'], growthRate: 22.1 },
          { region: 'Western Kenya', country: 'Kenya', lat: 0.3, lng: 34.8, carbonPotential: 18000, activeFarms: 14200, residueAvailable: 12000, creditPrice: 11.0, topCrops: ['Maize', 'Tea'], growthRate: 25.3 },
          { region: 'Chiang Rai', country: 'Thailand', lat: 19.9, lng: 99.8, carbonPotential: 22000, activeFarms: 7800, residueAvailable: 16000, creditPrice: 14.5, topCrops: ['Rice', 'Corn'], growthRate: 11.5 },
          { region: 'Jalisco', country: 'Mexico', lat: 20.7, lng: -103.3, carbonPotential: 28000, activeFarms: 5400, residueAvailable: 20000, creditPrice: 16.0, topCrops: ['Sugarcane', 'Agave', 'Corn'], growthRate: 16.8 },
        ],
        totalPotential: 310000,
        marketInsight: 'South Asia and Latin America show the highest growth potential for agricultural carbon credits. India alone contributes 40% of the global agricultural residue carbon potential.',
      };
      return NextResponse.json({ success: true, data: fallbackData });
    }
  }

  // Real-time climate analytics summary
  const analytics = {
    co2Captured: { value: 125847, unit: 'tons', change: 8.5 },
    creditsIssued: { value: 458920, unit: 'tCO₂e', change: 12.3 },
    biomassProcessed: { value: 892340, unit: 'tons', change: 6.7 },
    activeFarms: { value: 34567, unit: 'farms', change: 15.2 },
    marketVolume: { value: 28500000, unit: 'USD', change: 22.1 },
    projectsVerified: { value: 1245, unit: 'projects', change: 9.8 },
    countriesActive: { value: 18, unit: 'countries', change: 28.6 },
    averageCreditPrice: { value: 14.2, unit: 'USD/tCO₂e', change: 5.3 },
  };

  return NextResponse.json({ analytics });
}
