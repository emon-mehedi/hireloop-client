import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from './_components/DashboardSidebar';
import { Toaster } from '@/components/ui/toast';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
        <Toaster/>
      </SidebarProvider>
    </div>
  );
};

export default layout;