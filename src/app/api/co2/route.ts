import { NextRequest, NextResponse } from 'next/server';
import { getAvailableCO2Listings, createCO2Listing, createCO2Order } from '@/lib/firestore';

const demoCO2Listings = [
  {
    id: 'co2-1',
    processorId: 'proc-1',
    processorName: 'GreenGas Punjab',
    co2Purity: 99.5,
    quantity: 250,
    pricePerTon: 12000,
    location: 'Ludhiana, Punjab',
    lat: 30.9,
    lng: 75.85,
    captureMethod: 'biomass_gasification' as const,
    storageType: 'compressed_gas' as const,
    transportOptions: ['Pipeline', 'Tanker Truck'],
    description: 'Food-grade CO₂ captured from rice straw gasification. Ideal for beverage carbonation and greenhouse enrichment.',
    status: 'available' as const,
    createdAt: '2026-02-15',
  },
  {
    id: 'co2-2',
    processorId: 'proc-2',
    processorName: 'BioCarbon Haryana',
    co2Purity: 98.0,
    quantity: 180,
    pricePerTon: 9500,
    location: 'Karnal, Haryana',
    lat: 29.69,
    lng: 76.98,
    captureMethod: 'pyrolysis' as const,
    storageType: 'liquid' as const,
    transportOptions: ['Tanker Truck', 'ISO Container'],
    description: 'Industrial-grade CO₂ from wheat residue pyrolysis. Suitable for welding, dry ice, and chemical manufacturing.',
    status: 'available' as const,
    createdAt: '2026-02-20',
  },
  {
    id: 'co2-3',
    processorId: 'proc-3',
    processorName: 'AgriCapture UP',
    co2Purity: 99.9,
    quantity: 120,
    pricePerTon: 15000,
    location: 'Lucknow, UP',
    lat: 26.85,
    lng: 80.95,
    captureMethod: 'biomass_gasification' as const,
    storageType: 'supercritical' as const,
    transportOptions: ['Pipeline', 'Tanker Truck', 'ISO Container'],
    description: 'Ultra-pure supercritical CO₂ for synthetic fuel production and advanced chemical synthesis.',
    status: 'available' as const,
    createdAt: '2026-03-01',
  },
  {
    id: 'co2-4',
    processorId: 'proc-4',
    processorName: 'CarbonWorks MP',
    co2Purity: 97.5,
    quantity: 300,
    pricePerTon: 8500,
    location: 'Bhopal, MP',
    lat: 23.26,
    lng: 77.41,
    captureMethod: 'fermentation' as const,
    storageType: 'compressed_gas' as const,
    transportOptions: ['Tanker Truck'],
    description: 'Fermentation-captured CO₂ from agricultural waste processing. Cost-effective for greenhouse agriculture.',
    status: 'available' as const,
    createdAt: '2026-02-28',
  },
  {
    id: 'co2-5',
    processorId: 'proc-1',
    processorName: 'GreenGas Punjab',
    co2Purity: 99.0,
    quantity: 200,
    pricePerTon: 11000,
    location: 'Amritsar, Punjab',
    lat: 31.63,
    lng: 74.87,
    captureMethod: 'biomass_gasification' as const,
    storageType: 'liquid' as const,
    transportOptions: ['Pipeline', 'Tanker Truck'],
    description: 'High-purity liquid CO₂ suitable for dry ice production and food processing applications.',
    status: 'available' as const,
    createdAt: '2026-03-02',
  },
  {
    id: 'co2-6',
    processorId: 'proc-5',
    processorName: 'EcoGas Maharashtra',
    co2Purity: 98.5,
    quantity: 150,
    pricePerTon: 10500,
    location: 'Nagpur, Maharashtra',
    lat: 21.15,
    lng: 79.09,
    captureMethod: 'pyrolysis' as const,
    storageType: 'compressed_gas' as const,
    transportOptions: ['Tanker Truck', 'Rail'],
    description: 'CO₂ captured from cotton residue pyrolysis. Well suited for welding and chemical applications.',
    status: 'available' as const,
    createdAt: '2026-03-04',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const method = searchParams.get('method');
  const minPurity = searchParams.get('minPurity');

  try {
    const firestoreListings = await getAvailableCO2Listings();
    let listings = firestoreListings.length > 0 ? firestoreListings : demoCO2Listings;

    if (method) {
      listings = listings.filter((l) => l.captureMethod === method);
    }
    if (minPurity) {
      listings = listings.filter((l) => l.co2Purity >= parseFloat(minPurity));
    }

    return NextResponse.json({ listings, total: listings.length });
  } catch {
    return NextResponse.json({ listings: demoCO2Listings, total: demoCO2Listings.length });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'create-listing') {
      const id = await createCO2Listing(data);
      return NextResponse.json({ success: true, id });
    }

    if (action === 'place-order') {
      const id = await createCO2Order(data);
      return NextResponse.json({ success: true, id });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
