import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { DashboardLayout } from "@/components/dashboard";

/**
 * Progress page - Placeholder for future implementation
 */
export function ProgressPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Progress Tracking</h1>
          <p className="text-neutral-600 mt-sm">
            View detailed analytics and progress reports
          </p>
        </div>

        <Card>
          <CardContent className="pt-lg">
            <div className="text-center py-xl space-y-md">
              <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <div>
                <p className="font-semibold text-lg">Coming Soon</p>
                <p className="text-sm text-neutral-600 mt-sm">
                  Advanced progress tracking features will be available here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

