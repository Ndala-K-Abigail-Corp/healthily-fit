import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AlertCircle } from "lucide-react";

export function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-heading text-4xl font-bold mb-6 flex items-center gap-3">
          <AlertCircle className="w-10 h-10 text-warning" />
          Health Disclaimer
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <div className="bg-warning/10 border-l-4 border-warning p-4 rounded">
            <p className="font-semibold text-warning-dark">
              IMPORTANT: Please read this disclaimer carefully before using Healthily Fit services.
            </p>
          </div>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Medical Disclaimer</h2>
            <p className="text-neutral-700 leading-relaxed">
              Healthily Fit is <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>.
              The workout plans, fitness recommendations, and health information provided through our platform are for
              general informational and educational purposes only.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Consult Healthcare Professionals</h2>
            <p className="text-neutral-700 leading-relaxed">
              Before starting any fitness program, especially if you:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li>Have pre-existing medical conditions or health concerns</li>
              <li>Are pregnant or nursing</li>
              <li>Are taking medications that may affect your ability to exercise</li>
              <li>Have a history of heart disease, high blood pressure, or other cardiovascular issues</li>
              <li>Experience chest pain, dizziness, or shortness of breath during exercise</li>
              <li>Have not exercised regularly in the past six months</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              <strong>You must consult with your physician or qualified healthcare provider</strong> to ensure
              that the exercise program is appropriate for your individual circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Exercise Risks</h2>
            <p className="text-neutral-700 leading-relaxed">
              Physical exercise involves inherent risks including, but not limited to, muscle strains, sprains,
              fractures, cardiac events, and other injuries. By using Healthily Fit, you acknowledge and accept
              these risks and agree to assume full responsibility for your safety during workouts.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">No Warranty</h2>
            <p className="text-neutral-700 leading-relaxed">
              While we strive to provide accurate and helpful fitness recommendations, we make no warranties or
              guarantees about the effectiveness, safety, or suitability of any workout plans for your specific needs.
              Results may vary based on individual factors including genetics, nutrition, consistency, and overall health.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Listen to Your Body</h2>
            <p className="text-neutral-700 leading-relaxed">
              Always listen to your body during exercise. If you experience:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mt-2">
              <li>Pain, discomfort, or unusual fatigue</li>
              <li>Dizziness, lightheadedness, or nausea</li>
              <li>Chest pain or irregular heartbeat</li>
              <li>Shortness of breath or difficulty breathing</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mt-3">
              <strong>Stop exercising immediately and seek medical attention if necessary.</strong>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Information Accuracy</h2>
            <p className="text-neutral-700 leading-relaxed">
              The accuracy of workout plans and recommendations depends on the information you provide.
              It is your responsibility to provide accurate health information and update your profile if
              your health status changes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Limitation of Liability</h2>
            <p className="text-neutral-700 leading-relaxed">
              Healthily Fit, its owners, employees, and affiliates shall not be liable for any injuries, damages,
              or health issues arising from the use of our services or following our workout recommendations.
              You use this service entirely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold mb-3">Emergency Contact</h2>
            <p className="text-neutral-700 leading-relaxed">
              In case of a medical emergency, immediately call your local emergency services (911 in the US).
              Do not rely on this application for emergency assistance.
            </p>
          </section>

          <div className="bg-error/10 border-l-4 border-error p-4 rounded mt-6">
            <p className="font-semibold text-error">
              By using Healthily Fit, you acknowledge that you have read, understood, and agree to this health disclaimer.
            </p>
          </div>

          <p className="text-sm text-neutral-500 mt-8 pt-6 border-t">
            Last updated: January 2025
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}


