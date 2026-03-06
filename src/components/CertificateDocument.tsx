'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  border: {
    border: '3px solid #16a34a',
    padding: 30,
    borderRadius: 8,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  divider: {
    borderBottom: '1px solid #e5e7eb',
    marginVertical: 15,
  },
  certTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 5,
  },
  certSubtitle: {
    fontSize: 10,
    textAlign: 'center',
    color: '#9ca3af',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  body: {
    textAlign: 'center',
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 5,
  },
  highlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginVertical: 10,
  },
  creditsBox: {
    backgroundColor: '#f0fdf4',
    padding: 15,
    borderRadius: 6,
    textAlign: 'center',
    marginVertical: 15,
    border: '1px solid #bbf7d0',
  },
  creditsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  creditsLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 3,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  detailItem: {
    flex: 1,
    textAlign: 'center',
  },
  detailLabel: {
    fontSize: 9,
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 11,
    color: '#374151',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
    marginTop: 3,
  },
  signatureLine: {
    borderBottom: '1px solid #d1d5db',
    width: 150,
    marginHorizontal: 'auto',
    marginBottom: 5,
    marginTop: 30,
  },
  signatureLabel: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
  },
});

interface CertificateData {
  companyName: string;
  projectName: string;
  credits: number;
  serialNumber: string;
  issueDate: string;
  expiryDate: string;
}

export default function CertificateDocument({ data }: { data: CertificateData }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.border}>
          <View style={styles.header}>
            <Text style={styles.title}>Bharat Credits</Text>
            <Text style={styles.subtitle}>Agricultural Carbon Credits Platform</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.certTitle}>Certificate of Carbon Offset</Text>
          <Text style={styles.certSubtitle}>Verified Carbon Credit Retirement</Text>

          <View style={styles.body}>
            <Text style={styles.bodyText}>This is to certify that</Text>
            <Text style={styles.companyName}>{data.companyName}</Text>
            <Text style={styles.bodyText}>has successfully offset carbon emissions through the project</Text>
            <Text style={styles.highlight}>{data.projectName}</Text>
          </View>

          <View style={styles.creditsBox}>
            <Text style={styles.creditsValue}>{data.credits}</Text>
            <Text style={styles.creditsLabel}>Tonnes of CO₂ Equivalent (tCO₂e) Offset</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Serial Number</Text>
              <Text style={styles.detailValue}>{data.serialNumber}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Issue Date</Text>
              <Text style={styles.detailValue}>{data.issueDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Valid Until</Text>
              <Text style={styles.detailValue}>{data.expiryDate}</Text>
            </View>
          </View>

          <View style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Authorized Signatory</Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>This certificate is issued by Bharat Credits Platform and represents verified carbon credit retirement.</Text>
            <Text style={styles.footerText}>Verify at bharatcredits.platform/verify/{data.serialNumber}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
