import { Activity, Plus, TrendingUp, User } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickActionsProps {
  onGenerateWorkout?: () => void;
}

export function QuickActions({ onGenerateWorkout }: QuickActionsProps) {
  const actions = [
    {
      description: "Track your workout session",
      href: "#",
      icon: Plus,
      title: "Log Activity",
      variant: "default" as const,
      onClick: undefined as (() => void) | undefined,
    },
    {
      description: "Create personalized plan",
      href: undefined,
      icon: Activity,
      title: "Generate Workout",
      variant: "outline" as const,
      onClick: onGenerateWorkout,
    },
    {
      description: "Update your information",
      href: "/dashboard/profile",
      icon: User,
      title: "Edit Profile",
      variant: "outline" as const,
      onClick: undefined as (() => void) | undefined,
    },
    {
      description: "View detailed analytics",
      href: "#",
      icon: TrendingUp,
      title: "View Progress",
      variant: "outline" as const,
      onClick: undefined as (() => void) | undefined,
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
            const content = (
              <Button
                variant={action.variant}
                className="w-full h-auto flex-col items-start p-4 hover:scale-105 transition-transform"
                onClick={action.onClick}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{action.title}</span>
                </div>
                <p className="text-xs text-left opacity-80">
                  {action.description}
                </p>
              </Button>
            );

            if (action.href && !action.onClick) {
              return (
                <Link key={action.title} to={action.href}>
                  {content}
                </Link>
              );
            }

            return <div key={action.title}>{content}</div>;
          })}
        </div>
      </CardContent>
    </Card>
  );
}

