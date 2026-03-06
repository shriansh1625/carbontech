import { NextRequest, NextResponse } from 'next/server';
import { getCarbonMarketData, createCarbonTrade, getOpenCarbonTrades, updateCarbonTrade, getAllCarbonTrades } from '@/lib/firestore';
import { generateCarbonMarketForecast } from '@/lib/gemini';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');

  try {
    if (type === 'trades') {
      const trades = await getOpenCarbonTrades();
      if (trades.length > 0) return NextResponse.json({ trades });
      // Seed data if empty
      const seedTrades = [
        { sellerId: 'demo-1', sellerName: 'GreenFarm Punjab', sellerCountry: 'India', creditType: 'VCS', quantity: 500, pricePerCredit: 12.5, totalValue: 6250, status: 'open' as const, vintage: '2025', methodology: 'VM0006', createdAt: new Date().toISOString() },
        { sellerId: 'demo-2', sellerName: 'EcoCarbon Brazil', sellerCountry: 'Brazil', creditType: 'GS', quantity: 1200, pricePerCredit: 15.8, totalValue: 18960, status: 'open' as const, vintage: '2025', methodology: 'AMS-III.BL', createdAt: new Date().toISOString() },
        { sellerId: 'demo-3', sellerName: 'ClimateFirst Kenya', sellerCountry: 'Kenya', creditType: 'CDM', quantity: 800, pricePerCredit: 11.2, totalValue: 8960, status: 'open' as const, vintage: '2024', methodology: 'AMS-III.H', createdAt: new Date().toISOString() },
        { sellerId: 'demo-4', sellerName: 'BioChar Thailand', sellerCountry: 'Thailand', creditType: 'VCS', quantity: 350, pricePerCredit: 14.0, totalValue: 4900, status: 'open' as const, vintage: '2025', methodology: 'VM0044', createdAt: new Date().toISOString() },
        { sellerId: 'demo-5', sellerName: 'AgriSequester Indonesia', sellerCountry: 'Indonesia', creditType: 'GS', quantity: 950, pricePerCredit: 13.5, totalValue: 12825, status: 'open' as const, vintage: '2025', methodology: 'AR-AM0014', createdAt: new Date().toISOString() },
        { sellerId: 'demo-6', sellerName: 'CarbonVerde Mexico', sellerCountry: 'Mexico', creditType: 'ACR', quantity: 620, pricePerCredit: 16.2, totalValue: 10044, status: 'open' as const, vintage: '2024', methodology: 'ACR-Methodology', createdAt: new Date().toISOString() },
      ];
      return NextResponse.json({ trades: seedTrades });
    }

    if (type === 'market') {
      const data = await getCarbonMarketData();
      if (data.length > 0) return NextResponse.json({ data });
      // Seed market data
      const seedData = generateSeedMarketData();
      return NextResponse.json({ data: seedData });
    }

    if (type === 'forecast') {
      const creditType = req.nextUrl.searchParams.get('creditType') || 'VCS';
      const forecast = await generateCarbonMarketForecast(14.5, 10000, creditType);
      try {
        const parsed = JSON.parse(forecast);
        return NextResponse.json({ success: true, forecast: parsed });
      } catch {
        return NextResponse.json({ success: true, forecast: { trend: 'bullish', factors: ['Growing demand', 'Regulatory push'], recommendation: 'Hold and accumulate' } });
      }
    }

    const allTrades = await getAllCarbonTrades();
    return NextResponse.json({ trades: allTrades });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch exchange data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'create-trade') {
      const id = await createCarbonTrade({
        sellerId: body.sellerId,
        sellerName: body.sellerName,
        sellerCountry: body.sellerCountry,
        creditType: body.creditType,
        quantity: body.quantity,
        pricePerCredit: body.pricePerCredit,
        totalValue: body.quantity * body.pricePerCredit,
        status: 'open',
        vintage: body.vintage,
        methodology: body.methodology,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, id });
    }

    if (action === 'settle-trade') {
      await updateCarbonTrade(body.tradeId, {
        buyerId: body.buyerId,
        buyerName: body.buyerName,
        buyerCountry: body.buyerCountry,
        status: 'settled',
        settledAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Failed to process trade' }, { status: 500 });
  }
}

function generateSeedMarketData() {
  const types = ['VCS', 'GS', 'CDM', 'ACR', 'CAR'] as const;
  const regions = ['South Asia', 'Southeast Asia', 'Sub-Saharan Africa', 'Latin America', 'Europe'];
  const basePrices = { VCS: 14.5, GS: 16.2, CDM: 11.8, ACR: 15.5, CAR: 13.2 };
  const data = [];
  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    for (const type of types) {
      const base = basePrices[type];
      const variation = (Math.sin(i * 0.5) * 2) + (Math.random() - 0.5) * 1.5;
      data.push({
        id: `${type}-${i}`,
        date: d.toISOString().split('T')[0],
        creditType: type,
        pricePerTon: Math.round((base + variation) * 100) / 100,
        volume: Math.floor(1000 + Math.random() * 5000),
        region: regions[i % regions.length],
        change24h: Math.round((Math.random() - 0.5) * 8 * 100) / 100,
        high24h: Math.round((base + variation + Math.random() * 2) * 100) / 100,
        low24h: Math.round((base + variation - Math.random() * 2) * 100) / 100,
        marketCap: Math.floor(Math.random() * 50000000),
      });
    }
  }
  return data;
}
