import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-3xl px-xl">
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-2xl bg-gradient-primary p-xl md:p-2xl text-center space-y-lg">
          <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-neutral-100">
            Ready to Transform Your Fitness Journey?
          </h2>

          <p className="text-xl text-neutral-100 max-w-2xl mx-auto">
            Join thousands of users who are achieving their fitness goals with
            personalized workout plans designed just for them.
          </p>

          <div className="flex flex-col sm:flex-row gap-md justify-center items-center pt-md">
            <Link to="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="bg-neutral-100 text-primary hover:bg-neutral-200 shadow-lg border-0"
              >
                Start Your Journey Today
              </Button>
            </Link>
          </div>

          <p className="text-sm text-neutral-200">
            No credit card required • Get started in minutes
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}


