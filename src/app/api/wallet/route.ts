import { NextRequest, NextResponse } from 'next/server';
import { getOrCreateWallet, updateWallet, addWalletTransaction, getWalletTransactions } from '@/lib/firestore';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  try {
    const wallet = await getOrCreateWallet(userId);
    const transactions = await getWalletTransactions(userId);
    return NextResponse.json({ wallet, transactions });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch wallet' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'credit') {
      const wallet = await getOrCreateWallet(body.userId);
      const newBalance = wallet.balance + body.amount;
      const categoryField = body.category === 'carbon_credit_sale' ? 'carbonCreditEarnings'
        : body.category === 'biomass_sale' ? 'biomassSalesEarnings'
        : body.category === 'co2_sale' ? 'co2SalesEarnings'
        : body.category === 'equipment_rental' ? 'equipmentRentalEarnings'
        : null;

      const updateData: Record<string, number> = {
        balance: newBalance,
        totalEarnings: wallet.totalEarnings + body.amount,
      };
      if (categoryField) {
        updateData[categoryField] = (wallet[categoryField as keyof typeof wallet] as number) + body.amount;
      }

      await updateWallet(body.userId, updateData);
      await addWalletTransaction({
        walletId: body.userId,
        userId: body.userId,
        type: 'credit',
        category: body.category,
        amount: body.amount,
        description: body.description,
        referenceId: body.referenceId,
        balanceAfter: newBalance,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, newBalance });
    }

    if (action === 'debit') {
      const wallet = await getOrCreateWallet(body.userId);
      if (wallet.balance < body.amount) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
      }
      const newBalance = wallet.balance - body.amount;
      await updateWallet(body.userId, {
        balance: newBalance,
        totalWithdrawals: wallet.totalWithdrawals + body.amount,
      });
      await addWalletTransaction({
        walletId: body.userId,
        userId: body.userId,
        type: 'debit',
        category: body.category,
        amount: body.amount,
        description: body.description,
        referenceId: body.referenceId,
        balanceAfter: newBalance,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, newBalance });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to process wallet operation' }, { status: 500 });
  }
}
