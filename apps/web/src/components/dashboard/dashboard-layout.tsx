import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <DashboardSidebar
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 mt-16">
          <div className="container mx-auto max-w-7xl px-4 py-6">
            {/* Mobile Menu Button */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(true)}
                className="gap-2"
              >
                <Menu className="w-4 h-4" />
                Menu
              </Button>
            </div>

            {/* Content */}
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

