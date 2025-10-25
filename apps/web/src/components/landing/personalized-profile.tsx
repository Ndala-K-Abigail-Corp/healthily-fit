import {
  Activity,
  Calendar,
  Heart,
  Ruler,
  Scale,
  User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const profileFeatures = [
  {
    description: "Track changes over time with BMI calculations",
    icon: Scale,
    title: "Age & Body Metrics",
  },
  {
    description: "Safe workout plans considering your health",
    icon: Heart,
    title: "Health Conditions",
  },
  {
    description: "Nutrition-aligned fitness recommendations",
    icon: Activity,
    title: "Dietary Preferences",
  },
  {
    description: "Clear targets for weight and fitness milestones",
    icon: Ruler,
    title: "Fitness Goals",
  },
];

export function PersonalizedProfile() {
  return (
    <section
      id="personalized-workouts"
      className="py-3xl px-xl bg-background scroll-mt-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
          {/* Content */}
          <div className="space-y-lg animate-fadeIn">
            <div className="inline-flex items-center gap-sm bg-primary/10 text-primary px-md py-sm rounded-full text-sm font-semibold">
              <User className="w-4 h-4" />
              <span>Personalized Profile</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Your Complete Health Profile,{" "}
              <span className="text-gradient-primary">All in One Place</span>
            </h2>
            <p className="text-lg text-neutral-600">
              Our comprehensive onboarding captures everything we need to create
              a workout plan that's uniquely yours. Age, height, weight, health
              conditions, diet preferences, and fitness goals—all considered to
              ensure safety and effectiveness.
            </p>

            {/* Mini feature grid */}
            <div className="grid grid-cols-2 gap-md pt-md">
              {profileFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-sm animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {feature.title}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card Example */}
          <div className="animate-slideUp [animation-delay:200ms]">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-sm">
                  <Calendar className="w-5 h-5" />
                  Your Health Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-md pt-lg">
                <div className="grid grid-cols-2 gap-md">
                  <div className="space-y-xs">
                    <div className="text-xs text-neutral-600 uppercase font-semibold">
                      Age
                    </div>
                    <div className="text-2xl font-bold">28</div>
                  </div>
                  <div className="space-y-xs">
                    <div className="text-xs text-neutral-600 uppercase font-semibold">
                      BMI
                    </div>
                    <div className="text-2xl font-bold text-success">22.5</div>
                  </div>
                  <div className="space-y-xs">
                    <div className="text-xs text-neutral-600 uppercase font-semibold">
                      Height
                    </div>
                    <div className="text-xl font-semibold">175 cm</div>
                  </div>
                  <div className="space-y-xs">
                    <div className="text-xs text-neutral-600 uppercase font-semibold">
                      Weight
                    </div>
                    <div className="text-xl font-semibold">69 kg</div>
                  </div>
                </div>
                <div className="pt-md border-t">
                  <div className="text-xs text-neutral-600 uppercase font-semibold mb-sm">
                    Fitness Goal
                  </div>
                  <div className="inline-flex items-center bg-accent/10 text-accent px-md py-sm rounded-full text-sm font-semibold">
                    Build Muscle
                  </div>
                </div>
                <div className="pt-sm">
                  <div className="text-xs text-neutral-600 uppercase font-semibold mb-sm">
                    Dietary Preference
                  </div>
                  <div className="text-sm">Balanced Diet</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}



