import { Sparkles, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const workoutSteps = [
  {
    description: "We analyze your profile data including BMI, age, and goals",
    step: "1",
    title: "Profile Analysis",
  },
  {
    description: "Health conditions are factored in for safe exercise selection",
    step: "2",
    title: "Health Screening",
  },
  {
    description: "AI generates a custom weekly plan with daily exercises",
    step: "3",
    title: "Smart Generation",
  },
  {
    description: "Plan evolves based on your progress and feedback",
    step: "4",
    title: "Adaptive Updates",
  },
];

export function WorkoutGenerator() {
  return (
    <section
      id="workout-generator"
      className="py-3xl px-xl bg-neutral-200 scroll-mt-16"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-md mb-2xl animate-fadeIn">
          <div className="inline-flex items-center gap-sm bg-accent/10 text-accent px-md py-sm rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Dynamic Workout Generator</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            AI-Powered Plans Built{" "}
            <span className="text-gradient-primary">Just for You</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Our intelligent workout generator creates personalized routines that
            adapt to your unique profile. No more generic plans—every exercise
            is chosen with your safety and goals in mind.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-2xl">
          {workoutSteps.map((item, index) => (
            <div
              key={item.step}
              className="relative animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-medium">
                <CardContent className="pt-lg">
                  <div className="flex flex-col items-center text-center space-y-md">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary text-white flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
              {/* Arrow connector (hidden on last item) */}
              {index < workoutSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Example Workout Card */}
        <div className="max-w-2xl mx-auto animate-slideUp [animation-delay:400ms]">
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-primary text-white">
              <CardTitle>Sample Generated Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-md pt-lg">
              <div className="space-y-sm">
                <div className="flex justify-between items-center pb-sm border-b">
                  <span className="font-semibold">Monday - Upper Body</span>
                  <span className="text-sm text-neutral-600">45 min</span>
                </div>
                <ul className="space-y-xs text-sm text-neutral-700">
                  <li>• Push-ups (modified) - 3 sets × 10 reps</li>
                  <li>• Dumbbell rows - 3 sets × 12 reps</li>
                  <li>• Shoulder press - 3 sets × 10 reps</li>
                </ul>
              </div>
              <div className="space-y-sm">
                <div className="flex justify-between items-center pb-sm border-b">
                  <span className="font-semibold">Wednesday - Lower Body</span>
                  <span className="text-sm text-neutral-600">40 min</span>
                </div>
                <ul className="space-y-xs text-sm text-neutral-700">
                  <li>• Bodyweight squats - 3 sets × 15 reps</li>
                  <li>• Lunges - 3 sets × 10 reps each leg</li>
                  <li>• Calf raises - 3 sets × 15 reps</li>
                </ul>
              </div>
              <div className="pt-sm">
                <p className="text-xs text-neutral-600 italic">
                  ✓ Adapted for knee sensitivity and beginner fitness level
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}



