import { Activity, Calendar, Clock, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder component - will be enhanced when activity logging is implemented
export function RecentActivity() {
  // TODO: Fetch actual activity data from Firestore
  const hasActivities = false;

  if (!hasActivities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-sm">
            <Activity className="w-5 h-5 text-accent" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-xl space-y-md">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <Flame className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-lg">No activities logged yet</p>
              <p className="text-sm text-neutral-600 mt-sm">
                Start working out and track your progress here
              </p>
            </div>
            <Button variant="outline" className="mt-md">
              Log Activity
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Future: Render actual activities
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-sm">
          <Activity className="w-5 h-5 text-accent" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Activity items will be rendered here */}
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Sample Workout</p>
              <p className="text-xs text-neutral-600">Cardio • 30 minutes</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-neutral-600">
                <Calendar className="w-3 h-3" />
                Today
              </div>
              <div className="flex items-center gap-1 text-xs text-neutral-600">
                <Clock className="w-3 h-3" />
                10:00 AM
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

