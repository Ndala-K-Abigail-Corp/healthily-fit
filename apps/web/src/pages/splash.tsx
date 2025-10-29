import { Dumbbell, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center px-4 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-lg animate-slideUp">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start gap-sm">
              <Dumbbell className="w-12 h-12 md:w-16 md:h-16 text-white" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
                Healthily Fit
              </h1>
            </div>

            {/* Main Heading */}
            <div className="space-y-md">
              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" style={{ lineHeight: 'var(--line-height-heading)' }}>
                Your Personal Fitness Journey Starts Here
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0" style={{ fontSize: 'var(--font-size-lg)' }}>
                AI-powered workout plans tailored to your goals, fitness level, and health conditions. Get started in minutes.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-sm text-white/90">
              <div className="flex items-center gap-sm justify-center lg:justify-start">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <span>Personalized workout plans</span>
              </div>
              <div className="flex items-center gap-sm justify-center lg:justify-start">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <span>Progress tracking & analytics</span>
              </div>
              <div className="flex items-center gap-sm justify-center lg:justify-start">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <span>Safe exercises for your health profile</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-md justify-center lg:justify-start pt-md">
              <Link to="/auth/signup" className="w-full sm:w-auto">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-neutral-100 font-semibold px-xl py-lg text-lg shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-sm w-5 h-5" />
                </Button>
              </Link>
              <Link to="/auth/login" className="w-full sm:w-auto">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 font-semibold px-xl py-lg text-lg"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:block animate-slideUp [animation-delay:200ms]">
            {/* 
              TODO: Replace with real image from Pinterest
              Search: https://www.pinterest.com/search/pins/?q=fitness%20journey%20illustration%20modern
              Suggested keywords: "fitness app illustration", "workout motivation graphic", "health journey vector"
              Dimensions: 600x500px, use green theme colors
            */}
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=500&fit=crop"
              alt="Person exercising - start your fitness journey"
              className="rounded-2xl shadow-2xl object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-lg mt-3xl text-center text-white animate-slideUp [animation-delay:300ms]">
          <div>
            <div className="text-3xl md:text-4xl font-bold font-heading">1000+</div>
            <div className="text-sm md:text-base text-white/80">Active Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold font-heading">50K+</div>
            <div className="text-sm md:text-base text-white/80">Workouts Completed</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold font-heading">4.8★</div>
            <div className="text-sm md:text-base text-white/80">User Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

