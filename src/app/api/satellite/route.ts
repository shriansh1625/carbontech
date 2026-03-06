import { NextResponse } from 'next/server';
import { getAllFarms } from '@/lib/firestore';
import type { SatelliteFarmData } from '@/lib/types';

const demoFarms = [
  { id: 'f1', farmerId: 'u1', farmerName: 'Rajesh Kumar', name: 'Kumar Organic Farm', location: 'Ludhiana, Punjab', lat: 30.91, lng: 75.85, area: 15, cropType: 'Rice', practices: ['no_till', 'residue_collection'], residueAvailable: 22, createdAt: '2025-06-15' },
  { id: 'f2', farmerId: 'u2', farmerName: 'Amit Singh', name: 'Singh Family Fields', location: 'Karnal, Haryana', lat: 29.69, lng: 76.98, area: 25, cropType: 'Wheat', practices: ['cover_crops', 'biochar'], residueAvailable: 40, createdAt: '2025-07-01' },
  { id: 'f3', farmerId: 'u3', farmerName: 'Priya Patel', name: 'Patel Green Acres', location: 'Ahmedabad, Gujarat', lat: 23.02, lng: 72.57, area: 10, cropType: 'Cotton', practices: ['organic_farming'], residueAvailable: 12, createdAt: '2025-08-10' },
  { id: 'f4', farmerId: 'u4', farmerName: 'Suresh Yadav', name: 'Yadav Bio Farm', location: 'Bhopal, MP', lat: 23.26, lng: 77.41, area: 30, cropType: 'Soybean', practices: ['no_till', 'cover_crops', 'residue_collection'], residueAvailable: 55, createdAt: '2025-05-20' },
  { id: 'f5', farmerId: 'u5', farmerName: 'Lakshmi Devi', name: 'Devi Sustainable Farm', location: 'Lucknow, UP', lat: 26.85, lng: 80.95, area: 8, cropType: 'Sugarcane', practices: ['residue_collection'], residueAvailable: 18, createdAt: '2025-09-01' },
  { id: 'f6', farmerId: 'u6', farmerName: 'Vikram Reddy', name: 'Reddy Agro Estate', location: 'Nagpur, Maharashtra', lat: 21.15, lng: 79.09, area: 45, cropType: 'Rice', practices: ['no_till', 'biochar', 'cover_crops'], residueAvailable: 85, createdAt: '2025-04-15' },
  { id: 'f7', farmerId: 'u7', farmerName: 'Gurpreet Kaur', name: 'Kaur Heritage Farm', location: 'Amritsar, Punjab', lat: 31.63, lng: 74.87, area: 20, cropType: 'Wheat', practices: ['organic_farming', 'residue_collection'], residueAvailable: 32, createdAt: '2025-06-25' },
  { id: 'f8', farmerId: 'u8', farmerName: 'Mohan Das', name: 'Das Eco Fields', location: 'Jaipur, Rajasthan', lat: 26.92, lng: 75.78, area: 12, cropType: 'Mustard', practices: ['no_till'], residueAvailable: 14, createdAt: '2025-10-05' },
];

function generateSatelliteData(farmId: string): SatelliteFarmData {
  const seed = farmId.charCodeAt(farmId.length - 1);
  return {
    farmId,
    ndvi: 0.4 + (seed % 5) * 0.1,
    soilMoisture: 20 + (seed % 6) * 10,
    residueBurning: seed % 7 === 0,
    soilCarbonEstimate: 1.5 + (seed % 4) * 0.8,
    biomassCollected: 5 + (seed % 10) * 8,
    lastUpdated: new Date().toISOString(),
    carbonReductionStatus: seed % 3 === 0 ? 'needs_attention' : seed % 5 === 0 ? 'critical' : 'on_track',
  };
}

export async function GET() {
  try {
    const firestoreFarms = await getAllFarms();
    const farms = firestoreFarms.length > 0 ? firestoreFarms : demoFarms;
    const satelliteData = farms.map((f) => ({
      farm: f,
      satellite: generateSatelliteData(f.id),
    }));

    return NextResponse.json({
      farms: satelliteData,
      total: farms.length,
      summary: {
        totalArea: farms.reduce((sum, f) => sum + f.area, 0),
        avgNDVI: satelliteData.reduce((sum, s) => sum + s.satellite.ndvi, 0) / farms.length,
        burningDetected: satelliteData.filter((s) => s.satellite.residueBurning).length,
        onTrack: satelliteData.filter((s) => s.satellite.carbonReductionStatus === 'on_track').length,
      },
    });
  } catch {
    const satelliteData = demoFarms.map((f) => ({
      farm: f,
      satellite: generateSatelliteData(f.id),
    }));
    return NextResponse.json({
      farms: satelliteData,
      total: demoFarms.length,
      summary: {
        totalArea: demoFarms.reduce((sum, f) => sum + f.area, 0),
        avgNDVI: 0.65,
        burningDetected: 1,
        onTrack: 6,
      },
    });
  }
}
