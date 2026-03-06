import { NextRequest, NextResponse } from 'next/server';
import { getAllVerificationRecords, createVerificationRecord, updateVerificationRecord } from '@/lib/firestore';

const demoVerifications = [
  {
    id: 'vr-1',
    projectId: 'cp-1',
    projectName: 'Punjab Rice Straw Carbon Avoidance',
    farmerId: 'u1',
    verifierId: 'v1',
    baselineEmissions: 450,
    emissionsReduced: 380,
    creditsIssued: 350,
    methodology: 'VM0006 - Carbon Avoidance through Biomass Collection',
    monitoringPeriod: { start: '2025-06-01', end: '2026-02-28' },
    status: 'verified' as const,
    documents: ['baseline_report.pdf', 'monitoring_report.pdf', 'verification_statement.pdf'],
    registryId: 'VCS-2026-IND-0847',
    createdAt: '2025-06-01',
    updatedAt: '2026-02-28',
  },
  {
    id: 'vr-2',
    projectId: 'cp-2',
    projectName: 'Haryana Wheat Biochar Sequestration',
    farmerId: 'u2',
    baselineEmissions: 320,
    emissionsReduced: 280,
    creditsIssued: 0,
    methodology: 'VM0044 - Biochar Carbon Removal',
    monitoringPeriod: { start: '2025-09-01', end: '2026-03-01' },
    status: 'pending_verification' as const,
    documents: ['baseline_report.pdf', 'monitoring_report.pdf'],
    createdAt: '2025-09-01',
    updatedAt: '2026-03-01',
  },
  {
    id: 'vr-3',
    projectId: 'cp-3',
    projectName: 'MP Soybean Soil Carbon Enhancement',
    farmerId: 'u4',
    verifierId: 'v2',
    baselineEmissions: 200,
    emissionsReduced: 150,
    creditsIssued: 0,
    methodology: 'VM0042 - Improved Agricultural Land Management',
    monitoringPeriod: { start: '2025-07-01', end: '2026-01-31' },
    status: 'monitoring' as const,
    documents: ['baseline_report.pdf'],
    createdAt: '2025-07-01',
    updatedAt: '2026-01-31',
  },
  {
    id: 'vr-4',
    projectId: 'cp-4',
    projectName: 'Gujarat Cotton Residue Collection',
    farmerId: 'u3',
    baselineEmissions: 180,
    emissionsReduced: 140,
    creditsIssued: 130,
    methodology: 'VM0006 - Carbon Avoidance through Biomass Collection',
    monitoringPeriod: { start: '2025-04-01', end: '2025-12-31' },
    status: 'verified' as const,
    documents: ['baseline_report.pdf', 'monitoring_report.pdf', 'verification_statement.pdf'],
    registryId: 'VCS-2025-IND-0623',
    createdAt: '2025-04-01',
    updatedAt: '2025-12-31',
  },
  {
    id: 'vr-5',
    projectId: 'cp-5',
    projectName: 'Maharashtra Multi-crop Biomass Hub',
    farmerId: 'u6',
    baselineEmissions: 520,
    emissionsReduced: 440,
    creditsIssued: 0,
    methodology: 'GS - Methodology for Biomass-based Heat Generation',
    monitoringPeriod: { start: '2025-08-01', end: '2026-02-15' },
    status: 'registered' as const,
    documents: ['project_design_document.pdf'],
    createdAt: '2025-08-01',
    updatedAt: '2026-02-15',
  },
];

export async function GET() {
  try {
    const records = await getAllVerificationRecords();
    const data = records.length > 0 ? records : demoVerifications;
    return NextResponse.json({ records: data, total: data.length });
  } catch {
    return NextResponse.json({ records: demoVerifications, total: demoVerifications.length });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'create') {
      const id = await createVerificationRecord(data);
      return NextResponse.json({ success: true, id });
    }

    if (action === 'update' && data.id) {
      const { id, ...updateData } = data;
      await updateVerificationRecord(id, updateData);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
