import { CTA } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { PersonalizedProfile } from "@/components/landing/personalized-profile";
import { Testimonials } from "@/components/landing/testimonials";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section - Main landing with CTA */}
        <Hero />

        {/* Features Section - Key app features */}
        <Features />

        {/* Personalized Workouts Section - How personalization works */}
        <PersonalizedProfile />

        {/* Testimonials Section - Social proof */}
        <Testimonials />

        {/* Final CTA Section - Encourage signup */}
        <CTA />
      </main>

      <Footer />
    </div>
  );
}


