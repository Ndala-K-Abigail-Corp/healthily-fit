import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100">
      <Navbar />
      <main className="flex-1 py-xl px-4">
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

