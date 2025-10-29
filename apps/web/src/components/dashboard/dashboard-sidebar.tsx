import {
  Activity,
  BarChart3,
  Dumbbell,
  Home,
  Settings,
  User,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function DashboardSidebar({
  isMobileOpen = false,
  onMobileClose,
}: DashboardSidebarProps) {
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: Dumbbell,
      label: "Workouts",
      path: "/dashboard/workouts",
    },
    {
      icon: BarChart3,
      label: "Progress",
      path: "/dashboard/progress",
    },
    {
      icon: User,
      label: "Profile",
      path: "/dashboard/profile",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform transition-transform duration-300 lg:translate-x-0 bg-neutral-100 border-r border-neutral-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          {isMobileOpen && (
            <div className="flex items-center justify-between p-4 lg:hidden border-b border-neutral-300">
              <h2 className="font-heading font-bold text-lg">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onMobileClose}
                className="w-9 h-9 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-fast",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* Sidebar Footer */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
              <Activity className="w-5 h-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  Quick Tip
                </p>
                <p className="text-xs text-neutral-600">
                  Log your workouts daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

