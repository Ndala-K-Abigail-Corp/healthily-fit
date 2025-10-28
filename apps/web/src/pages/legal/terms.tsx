import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-neutral-700 leading-relaxed">
              By accessing and using Healthily Fit, you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">2. User Account</h2>
            <p className="text-neutral-700 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities
              that occur under your account. You must provide accurate and complete information during registration
              and keep your profile information up to date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">3. Service Description</h2>
            <p className="text-neutral-700 leading-relaxed">
              Healthily Fit provides personalized fitness workout plans, progress tracking, and health recommendations
              based on your profile information. Our services are intended to supplement, not replace, professional
              medical or fitness advice.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">4. User Responsibilities</h2>
            <p className="text-neutral-700 leading-relaxed">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li>Provide accurate health and fitness information</li>
              <li>Consult with healthcare professionals before starting new exercise programs</li>
              <li>Use the service responsibly and in accordance with its intended purpose</li>
              <li>Not share your account credentials with others</li>
              <li>Not attempt to access other users' data or accounts</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">5. Limitation of Liability</h2>
            <p className="text-neutral-700 leading-relaxed">
              Healthily Fit provides fitness recommendations based on general guidelines and your input.
              We are not liable for any injuries, health issues, or damages resulting from following our workout plans.
              Always consult with qualified healthcare professionals before beginning any fitness program.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">6. Service Modifications</h2>
            <p className="text-neutral-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of our services at any time
              without prior notice. We may also update these Terms of Service periodically, and continued use
              of the service constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">7. Termination</h2>
            <p className="text-neutral-700 leading-relaxed">
              You may terminate your account at any time through your profile settings.
              We reserve the right to terminate or suspend accounts that violate these terms or engage in
              prohibited activities.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">8. Contact Information</h2>
            <p className="text-neutral-700 leading-relaxed">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="text-neutral-700 mt-2">
              Email: <a href="mailto:legal@healthilyfit.com" className="text-primary hover:underline">legal@healthilyfit.com</a>
            </p>
          </section>

          <p className="text-sm text-neutral-500 mt-8 pt-6 border-t">
            Last updated: January 2025
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

