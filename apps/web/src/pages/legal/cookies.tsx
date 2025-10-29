import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-6">Cookie Policy</h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">What Are Cookies</h2>
            <p className="text-neutral-700 leading-relaxed">
              Cookies are small text files that are stored on your device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and
              enabling certain functionality.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">How We Use Cookies</h2>
            <p className="text-neutral-700 leading-relaxed">
              Healthily Fit uses cookies for the following purposes:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li><strong>Authentication:</strong> To keep you logged in to your account</li>
              <li><strong>Preferences:</strong> To remember your settings and preferences</li>
              <li><strong>Analytics:</strong> To understand how users interact with our service</li>
              <li><strong>Security:</strong> To protect your account and detect fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Types of Cookies We Use</h2>
            
            <div className="space-y-4 mt-3">
              <div>
                <h3 className="font-semibold text-lg">Essential Cookies</h3>
                <p className="text-neutral-700">
                  These cookies are necessary for the website to function properly. They enable core functionality
                  such as security, network management, and accessibility. You cannot opt out of these cookies.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Analytics Cookies</h3>
                <p className="text-neutral-700">
                  We use Firebase Analytics to collect information about how visitors use our site.
                  This helps us improve the user experience and service quality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Functional Cookies</h3>
                <p className="text-neutral-700">
                  These cookies enable personalized features and remember your choices (such as theme preferences).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Third-Party Cookies</h2>
            <p className="text-neutral-700 leading-relaxed">
              We use Google Firebase services, which may set their own cookies. These services are governed by
              their respective privacy policies:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li>Firebase Authentication</li>
              <li>Firebase Cloud Firestore</li>
              <li>Firebase Analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Managing Cookies</h2>
            <p className="text-neutral-700 leading-relaxed">
              You can control and manage cookies in your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all cookies from being set</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              Please note that if you block or delete essential cookies, some features of Healthily Fit may not
              function properly, and you may not be able to access your account.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Updates to This Policy</h2>
            <p className="text-neutral-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for
              legal, operational, or regulatory reasons. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Contact Us</h2>
            <p className="text-neutral-700 leading-relaxed">
              If you have questions about our use of cookies, please contact us at:
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


