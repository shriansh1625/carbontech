import { NextRequest, NextResponse } from 'next/server';
import { createPickupRequest, getPickupRequestsByFarmer, getPendingPickupRequests, updatePickupRequest } from '@/lib/firestore';

export async function GET(req: NextRequest) {
  const farmerId = req.nextUrl.searchParams.get('farmerId');
  const pending = req.nextUrl.searchParams.get('pending');

  try {
    if (pending === 'true') {
      const requests = await getPendingPickupRequests();
      return NextResponse.json({ requests });
    }
    if (farmerId) {
      const requests = await getPickupRequestsByFarmer(farmerId);
      return NextResponse.json({ requests });
    }
    const requests = await getPendingPickupRequests();
    return NextResponse.json({ requests });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch pickup requests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'create') {
      const id = await createPickupRequest({
        farmerId: body.farmerId,
        farmerName: body.farmerName,
        farmId: body.farmId,
        residueType: body.residueType,
        quantity: body.quantity,
        lat: body.lat,
        lng: body.lng,
        address: body.address,
        preferredDate: body.preferredDate,
        status: 'pending',
        notes: body.notes || '',
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, id });
    }

    if (action === 'accept') {
      await updatePickupRequest(body.requestId, {
        status: 'accepted',
        logisticsProviderId: body.logisticsProviderId,
        logisticsProviderName: body.logisticsProviderName,
        updatedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true });
    }

    if (action === 'update-status') {
      await updatePickupRequest(body.requestId, {
        status: body.status,
        updatedAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to process pickup request' }, { status: 500 });
  }
}
