import { NextRequest, NextResponse } from 'next/server';

// GET: Retrieve marketplace listings (public endpoint)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  // Demo data - in production would query Firestore
  const allListings = [
    { id: '1', crop: 'Rice Straw', type: 'crop_residue', farmer: 'Rajesh Kumar', location: 'Amritsar, Punjab', quantity: 25, price: 2500, quality: 'Premium', available: true },
    { id: '2', crop: 'Wheat Straw', type: 'crop_residue', farmer: 'Mohan Singh', location: 'Karnal, Haryana', quantity: 40, price: 2200, quality: 'Standard', available: true },
    { id: '3', crop: 'Corn Stalks', type: 'crop_residue', farmer: 'Priya Devi', location: 'Ludhiana, Punjab', quantity: 15, price: 1800, quality: 'Premium', available: true },
    { id: '4', crop: 'Biochar', type: 'biochar', farmer: 'Arun Patel', location: 'Indore, MP', quantity: 8, price: 8000, quality: 'Premium', available: true },
    { id: '5', crop: 'Rice Husk', type: 'agricultural_waste', farmer: 'Lakshmi Bai', location: 'Varanasi, UP', quantity: 30, price: 1500, quality: 'Standard', available: true },
    { id: '6', crop: 'Sugarcane Bagasse', type: 'biomass', farmer: 'Vijay Sharma', location: 'Kolhapur, MH', quantity: 50, price: 1200, quality: 'Standard', available: true },
  ];

  let filtered = allListings;

  if (type && type !== 'all') {
    filtered = filtered.filter((l) => l.type === type);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (l) => l.crop.toLowerCase().includes(q) || l.farmer.toLowerCase().includes(q) || l.location.toLowerCase().includes(q)
    );
  }

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return NextResponse.json({
    listings: paginated,
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  });
}
