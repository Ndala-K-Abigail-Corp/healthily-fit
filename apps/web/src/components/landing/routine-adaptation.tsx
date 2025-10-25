import { ArrowRight, RefreshCw, Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const adaptiveFeatures = [
  {
    description: "Adjust intensity based on logged performance",
    title: "Performance-Based",
  },
  {
    description: "Update plans as your BMI and metrics improve",
    title: "Metrics-Driven",
  },
  {
    description: "Suggest modifications for better results",
    title: "Smart Suggestions",
  },
  {
    description: "Keep workouts challenging as you improve",
    title: "Progressive Overload",
  },
];

export function RoutineAdaptation() {
  return (
    <section
      id="routine-adaptation"
      className="py-3xl px-xl bg-neutral-200 scroll-mt-16"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center space-y-md mb-2xl animate-fadeIn">
          <div className="inline-flex items-center gap-sm bg-warning/10 text-warning px-md py-sm rounded-full text-sm font-semibold">
            <RefreshCw className="w-4 h-4" />
            <span>Routine Adaptation</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold">
            Plans That{" "}
            <span className="text-gradient-primary">Evolve With You</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            As you progress, so do your workouts. Our adaptive system
            continuously analyzes your performance and adjusts your routine to
            prevent plateaus and maintain optimal challenge levels.
          </p>
        </div>

        {/* Visual Flow */}
        <div className="max-w-4xl mx-auto mb-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md items-center">
            {/* Stage 1 */}
            <Card className="animate-slideUp">
              <CardContent className="p-lg text-center space-y-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-xs">
                    Beginner
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Start with foundational exercises
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="hidden md:flex justify-center animate-fadeIn">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>

            {/* Stage 2 */}
            <Card className="animate-slideUp [animation-delay:100ms]">
              <CardContent className="p-lg text-center space-y-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-2xl">💪</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-xs">
                    Intermediate
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Progress to challenging variations
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="hidden md:flex justify-center animate-fadeIn">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>

            {/* Stage 3 */}
            <Card className="animate-slideUp [animation-delay:200ms]">
              <CardContent className="p-lg text-center space-y-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-xs">
                    Advanced
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Master complex movements
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {adaptiveFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className="relative bg-white rounded-lg p-lg shadow-md hover:shadow-lg transition-shadow duration-medium animate-slideUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-xs">
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-2xl text-center animate-slideUp [animation-delay:400ms]">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20">
            <CardContent className="p-xl">
              <p className="text-lg font-semibold text-neutral-800 mb-sm">
                Never Plateau Again
              </p>
              <p className="text-neutral-600">
                Our system identifies when you're ready to progress and
                automatically suggests the next level of challenge—keeping you
                on the fastest path to your goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}



