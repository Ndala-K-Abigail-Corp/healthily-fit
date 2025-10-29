import { Activity, Heart, Target, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    description:
      "Get workout plans tailored to your age, BMI, health conditions, and fitness goals. No more one-size-fits-all routines.",
    icon: Target,
    title: "Personalized Plans",
  },
  {
    description:
      "Our algorithm considers your health conditions and limitations to ensure safe and effective workout routines.",
    icon: Heart,
    title: "Health-First Approach",
  },
  {
    description:
      "Track your workouts, monitor weight changes, and visualize your progress toward your fitness goals.",
    icon: TrendingUp,
    title: "Progress Tracking",
  },
  {
    description:
      "Your workout plan adapts as you progress, ensuring continuous improvement and preventing plateaus.",
    icon: Activity,
    title: "Adaptive Routines",
  },
];

export function Features() {
  return (
    <section id="features" className="py-3xl px-xl bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-md mb-2xl">
          <h2 className="font-heading text-3xl font-bold">
            Why Choose Healthily Fit?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We combine fitness science with personalization to help you achieve
            your goals safely and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-medium hover:scale-105 animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-md group-hover:bg-primary/20 transition-colors duration-medium">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


