import { Settings } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard";

/**
 * Settings page - Placeholder for future implementation
 */
export function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Settings</h1>
          <p className="text-neutral-600 mt-sm">
            Manage your account and preferences
          </p>
        </div>

        <Card>
          <CardContent className="pt-lg">
            <div className="text-center py-xl space-y-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-neutral-200 flex items-center justify-center">
                <Settings className="w-8 h-8 text-neutral-600" />
              </div>
              <div>
                <p className="font-semibold text-lg">Coming Soon</p>
                <p className="text-sm text-neutral-600 mt-sm">
                  Settings and preferences will be available here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

