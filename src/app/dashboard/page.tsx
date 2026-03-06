'use client';

import { useAuthStore } from '@/lib/store';
import FarmerDashboard from './farmer-overview';
import IndustryDashboard from './industry-overview';
import CompanyDashboard from './company-overview';
import AdminDashboard from './admin-overview';

export default function DashboardPage() {
  const { profile } = useAuthStore();
  const role = profile?.role || 'farmer';

  switch (role) {
    case 'farmer':
      return <FarmerDashboard />;
    case 'industry':
      return <IndustryDashboard />;
    case 'company':
      return <CompanyDashboard />;
    case 'admin':
    case 'verifier':
      return <AdminDashboard />;
    default:
      return <FarmerDashboard />;
  }
}
