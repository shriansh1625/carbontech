import { NextRequest, NextResponse } from 'next/server';
import { createEquipmentListing, getAvailableEquipment, getEquipmentByOwner, updateEquipmentListing, createEquipmentRental, getRentalsByRenter } from '@/lib/firestore';

export async function GET(req: NextRequest) {
  const ownerId = req.nextUrl.searchParams.get('ownerId');
  const renterId = req.nextUrl.searchParams.get('renterId');

  try {
    if (ownerId) {
      const equipment = await getEquipmentByOwner(ownerId);
      return NextResponse.json({ equipment });
    }
    if (renterId) {
      const rentals = await getRentalsByRenter(renterId);
      return NextResponse.json({ rentals });
    }
    const equipment = await getAvailableEquipment();
    return NextResponse.json({ equipment });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch equipment' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'list') {
      const id = await createEquipmentListing({
        ownerId: body.ownerId,
        ownerName: body.ownerName,
        name: body.name,
        type: body.type,
        description: body.description,
        pricePerDay: body.pricePerDay,
        pricePerAcre: body.pricePerAcre,
        location: body.location,
        lat: body.lat,
        lng: body.lng,
        available: true,
        rating: 0,
        totalRentals: 0,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, id });
    }

    if (action === 'rent') {
      const rentalId = await createEquipmentRental({
        equipmentId: body.equipmentId,
        equipmentName: body.equipmentName,
        renterId: body.renterId,
        renterName: body.renterName,
        ownerId: body.ownerId,
        startDate: body.startDate,
        endDate: body.endDate,
        totalCost: body.totalCost,
        acres: body.acres,
        status: 'requested',
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, id: rentalId });
    }

    if (action === 'update') {
      await updateEquipmentListing(body.equipmentId, body.data);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to process equipment request' }, { status: 500 });
  }
}
