import { BarChart3, LineChart, Target, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const dashboardFeatures = [
  {
    description: "Track every workout and see your consistency",
    icon: BarChart3,
    title: "Activity Logging",
  },
  {
    description: "Monitor weight changes and BMI over time",
    icon: LineChart,
    title: "Weight Progress",
  },
  {
    description: "Visualize distance to your target goals",
    icon: Target,
    title: "Goal Tracking",
  },
  {
    description: "See trends and celebrate improvements",
    icon: TrendingUp,
    title: "Performance Insights",
  },
];

export function ProgressDashboardSection() {
  return (
    <section
      id="progress-dashboard"
      className="py-3xl px-xl bg-background scroll-mt-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
          {/* Visual Dashboard Preview */}
          <div className="order-2 lg:order-1 animate-slideUp">
            <div className="relative">
              <Card className="shadow-xl">
                <CardContent className="p-lg space-y-md">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-md">
                    <div className="bg-primary/10 rounded-lg p-md">
                      <div className="text-xs text-neutral-600 uppercase font-semibold">
                        Current BMI
                      </div>
                      <div className="text-3xl font-bold text-primary mt-xs">
                        22.5
                      </div>
                      <div className="text-xs text-success mt-xs">
                        ↓ 2.1 this month
                      </div>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-md">
                      <div className="text-xs text-neutral-600 uppercase font-semibold">
                        Weight
                      </div>
                      <div className="text-3xl font-bold text-accent mt-xs">
                        69kg
                      </div>
                      <div className="text-xs text-success mt-xs">
                        ↓ 5kg from start
                      </div>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-neutral-100 rounded-lg p-md h-48 flex items-end justify-around">
                    <div className="w-8 bg-primary/30 rounded-t" style={{ height: "40%" }} />
                    <div className="w-8 bg-primary/50 rounded-t" style={{ height: "55%" }} />
                    <div className="w-8 bg-primary/70 rounded-t" style={{ height: "65%" }} />
                    <div className="w-8 bg-primary rounded-t" style={{ height: "80%" }} />
                    <div className="w-8 bg-gradient-primary rounded-t" style={{ height: "95%" }} />
                  </div>

                  {/* Recent Activities */}
                  <div className="space-y-sm">
                    <div className="text-xs text-neutral-600 uppercase font-semibold">
                      Recent Workouts
                    </div>
                    <div className="space-y-xs text-sm">
                      <div className="flex justify-between items-center py-xs border-b border-neutral-200">
                        <span>Upper Body Strength</span>
                        <span className="text-xs text-neutral-600">Today</span>
                      </div>
                      <div className="flex justify-between items-center py-xs border-b border-neutral-200">
                        <span>Cardio Session</span>
                        <span className="text-xs text-neutral-600">Yesterday</span>
                      </div>
                      <div className="flex justify-between items-center py-xs">
                        <span>Lower Body</span>
                        <span className="text-xs text-neutral-600">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-lg animate-fadeIn">
            <div className="inline-flex items-center gap-sm bg-success/10 text-success px-md py-sm rounded-full text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>Progress Dashboard</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Watch Your Progress,{" "}
              <span className="text-gradient-primary">Stay Motivated</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Your personalized dashboard makes it easy to track every aspect of
              your fitness journey. Log workouts, monitor weight changes, and
              visualize your path to your goals—all in one beautiful interface.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md pt-md">
              {dashboardFeatures.map((feature, index) => (
                <Card
                  key={feature.title}
                  className="hover:shadow-md transition-shadow duration-medium animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-md">
                    <div className="flex items-start gap-sm">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {feature.title}
                        </div>
                        <div className="text-xs text-neutral-600 mt-xs">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



