'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false, loading: () => <span className="text-sm text-gray-500">Preparing PDF...</span> }
);

const CertificateDocument = dynamic(
  () => import('./CertificateDocument'),
  { ssr: false }
);

interface CertificateData {
  companyName: string;
  projectName: string;
  credits: number;
  serialNumber: string;
  issueDate: string;
  expiryDate: string;
}

export default function CertificatePDF({ data }: { data: CertificateData }) {
  const [ready, setReady] = useState(false);

  return (
    <div>
      {typeof window !== 'undefined' && (
        <PDFDownloadLink
          document={<CertificateDocument data={data} />}
          fileName={`BharatCredits-Certificate-${data.serialNumber}.pdf`}
        >
          {({ loading }: { loading: boolean }) => (
            <button className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition-colors">
              {loading ? 'Generating...' : 'Download PDF'}
            </button>
          )}
        </PDFDownloadLink>
      )}
    </div>
  );
}
