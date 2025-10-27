import { Activity, Plus, TrendingUp, User } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  const actions = [
    {
      description: "Track your workout session",
      href: "#",
      icon: Plus,
      title: "Log Activity",
      variant: "default" as const,
    },
    {
      description: "Create personalized plan",
      href: "#",
      icon: Activity,
      title: "Generate Workout",
      variant: "outline" as const,
    },
    {
      description: "Update your information",
      href: "/dashboard/profile",
      icon: User,
      title: "Edit Profile",
      variant: "outline" as const,
    },
    {
      description: "View detailed analytics",
      href: "#",
      icon: TrendingUp,
      title: "View Progress",
      variant: "outline" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} to={action.href}>
                <Button
                  variant={action.variant}
                  className="w-full h-auto flex-col items-start p-4 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{action.title}</span>
                  </div>
                  <p className="text-xs text-left opacity-80">
                    {action.description}
                  </p>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

