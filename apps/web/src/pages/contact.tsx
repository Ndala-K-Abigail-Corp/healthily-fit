import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const handleEmailClick = () => {
    window.location.href = "mailto:contact@healthilyfit.com";
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="bg-gradient-to-br from-primary to-accent py-2xl px-4 animate-fadeIn">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            <div className="text-white space-y-md">
              <h1 className="font-heading text-4xl md:text-5xl font-bold" style={{ fontSize: 'var(--font-size-3xl)', lineHeight: 'var(--line-height-heading)' }}>
                We're Here to Help
              </h1>
              <p className="text-lg text-white/90" style={{ fontSize: 'var(--font-size-lg)' }}>
                Have questions about Healthily Fit? Our team is ready to support you on your fitness journey.
              </p>
            </div>
            <div className="hidden lg:block">
              {/* 
                TODO: Optional hero image
                Pinterest: https://www.pinterest.com/search/pins/?q=customer%20support%20fitness%20help
              */}
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=400&fit=crop"
                alt="Customer support team"
                className="rounded-2xl shadow-2xl w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-12 -mt-xl flex-1">
        {/* Main Content Cards */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:contact@healthilyfit.com" 
                    className="text-primary hover:underline"
                  >
                    contact@healthilyfit.com
                  </a>
                  <p className="text-sm text-neutral-600 mt-1">
                    For general inquiries and support
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-neutral-700">+1 (555) 123-4567</p>
                  <p className="text-sm text-neutral-600 mt-1">
                    Mon-Fri, 9:00 AM - 5:00 PM EST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-neutral-700">
                    123 Fitness Street<br />
                    Health City, HC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 mb-4">
                Click the button below to compose an email using your default email client.
              </p>
              <Button 
                onClick={handleEmailClick}
                className="w-full"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Open Email Client
              </Button>

              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Support Topics</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  <li>• Account and billing questions</li>
                  <li>• Technical support</li>
                  <li>• Workout plan customization</li>
                  <li>• Feature requests</li>
                  <li>• General feedback</li>
                </ul>
              </div>

              <p className="text-xs text-neutral-500 mt-4">
                We typically respond within 24-48 hours during business days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">How do I update my profile information?</h3>
              <p className="text-sm text-neutral-600">
                Navigate to your Dashboard and click on "Profile" in the navigation menu to edit your information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Can I change my workout plan?</h3>
              <p className="text-sm text-neutral-600">
                Yes! You can generate a new workout plan at any time from your Dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Is my health data secure?</h3>
              <p className="text-neutral-600">
                Absolutely. We use industry-standard encryption and security measures to protect your data.
                Read our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for more details.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

