'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[#0a0f0d]">
        <DashboardSidebar />
        <main className="flex-1 md:ml-64 p-6 md:p-8 pt-20">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}