import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-background-dark py-3xl px-xl animate-fadeIn scroll-mt-16"
      style={{ backgroundColor: "var(--color-background-dark)" }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-lg">
          <h1 className="font-heading text-3xl md:text-[3rem] font-bold text-gradient-primary animate-slideUp">
            Start Your Personalized Plan
          </h1>

          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto animate-slideUp [animation-delay:100ms]">
            Get adaptive fitness and nutrition plans tailored to your body
            metrics, age, and health conditions. Achieve your wellness goals
            safely and effectively.
          </p>

          <div className="flex flex-col sm:flex-row gap-md justify-center items-center pt-lg animate-slideUp [animation-delay:200ms]">
            <Link to="/auth/signup">
              <Button size="lg">Start Your Personalized Plan</Button>
            </Link>
            <Button size="lg" variant="outline" onClick={scrollToFeatures} className="border-neutral-300 text-neutral-100 hover:bg-neutral-800">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg pt-2xl max-w-4xl mx-auto animate-slideUp [animation-delay:300ms]">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-neutral-300 mt-xs">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-neutral-300 mt-xs">Workouts Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-neutral-300 mt-xs">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}


