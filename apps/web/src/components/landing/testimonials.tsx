import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    avatar: "👨‍💼",
    name: "Michael Chen",
    quote:
      "The personalized approach made all the difference. I've lost 20 pounds safely while managing my knee issues.",
    role: "Software Engineer, 42",
  },
  {
    avatar: "👩‍⚕️",
    name: "Dr. Sarah Johnson",
    quote:
      "As a physician, I appreciate how the app accounts for health conditions. It's science-based and effective.",
    role: "Healthcare Professional, 38",
  },
  {
    avatar: "👨‍🎓",
    name: "James Rodriguez",
    quote:
      "The adaptive routines kept me motivated. I went from beginner to completing advanced workouts in 3 months!",
    role: "Student, 24",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-3xl px-xl bg-neutral-200 scroll-mt-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-md mb-2xl">
          <h2 className="font-heading text-3xl font-bold">
            Real Results from Real People
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of users who have transformed their fitness journey
            with Healthily Fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="animate-slideUp hover:shadow-lg transition-shadow duration-medium"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-lg">
                <div className="flex flex-col items-center text-center space-y-md">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <blockquote className="text-neutral-700 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-neutral-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


