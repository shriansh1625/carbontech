'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardSidebar from '@/components/DashboardSidebar';
import { SidebarProvider, useSidebar } from '@/lib/sidebar-context';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useSidebar();
  return (
    <div className="flex min-h-screen bg-[#0a0f0d]">
      <DashboardSidebar />
      <main className={`flex-1 p-6 md:p-8 pt-20 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'md:ml-64' : 'md:ml-16'
      }`}>
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <DashboardContent>{children}</DashboardContent>
      </SidebarProvider>
    </ProtectedRoute>
  );
}