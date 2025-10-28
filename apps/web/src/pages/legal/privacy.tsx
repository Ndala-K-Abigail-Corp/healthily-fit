import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-neutral-700 leading-relaxed">
              Healthily Fit collects personal information that you provide during account registration and profile setup,
              including your age, gender, height, weight, health conditions, dietary preferences, and fitness goals.
              We also collect workout activity data, progress logs, and usage information to provide personalized fitness recommendations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-neutral-700 leading-relaxed">
              Your information is used to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li>Generate personalized workout plans tailored to your profile</li>
              <li>Track your fitness progress and provide analytics</li>
              <li>Improve our services and user experience</li>
              <li>Send important account and service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">3. Data Security</h2>
            <p className="text-neutral-700 leading-relaxed">
              We implement industry-standard security measures to protect your personal information.
              Your data is stored securely using Firebase services with encrypted connections and strict access controls.
              Only you can access your personal fitness data through your authenticated account.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">4. Data Sharing</h2>
            <p className="text-neutral-700 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties.
              Your workout data and health information remain private and are only used to provide our services to you.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">5. Your Rights</h2>
            <p className="text-neutral-700 leading-relaxed">
              You have the right to access, modify, or delete your personal information at any time through your profile settings.
              You may also request a complete copy of your data or account deletion by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">6. Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-neutral-700 mt-2">
              Email: <a href="mailto:privacy@healthilyfit.com" className="text-primary hover:underline">privacy@healthilyfit.com</a>
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

