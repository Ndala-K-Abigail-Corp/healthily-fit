import { Dumbbell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => navigate(path), 300);
  };

  return (
    <footer className="bg-neutral-800 text-neutral-100 py-xl px-xl">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
          {/* Brand */}
          <div className="space-y-md">
            <div className="flex items-center space-x-sm">
              <Dumbbell className="w-6 h-6 text-primary" />
              <h3 className="font-heading text-xl font-bold">Healthily Fit</h3>
            </div>
            <p className="text-neutral-300 text-sm">
              Your personalized fitness companion for a healthier, safer, and
              more effective wellness journey.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-md text-white">Product</h4>
            <ul className="space-y-sm text-sm text-neutral-300">
              <li>
                <a
                  href="#personalized-profile"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Personalized Profile
                </a>
              </li>
              <li>
                <a
                  href="#workout-generator"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Workout Generator
                </a>
              </li>
              <li>
                <a
                  href="#progress-dashboard"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Progress Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#routine-adaptation"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Adaptive Routines
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-md text-white">Company</h4>
            <ul className="space-y-sm text-sm text-neutral-300">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary transition-colors duration-fast"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-md text-white">Legal</h4>
            <ul className="space-y-sm text-sm text-neutral-300">
              <li>
                <button
                  onClick={() => handleLinkClick('/privacy')}
                  className="hover:text-primary transition-colors duration-fast focus:text-primary focus:outline-none text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/terms')}
                  className="hover:text-primary transition-colors duration-fast focus:text-primary focus:outline-none text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/disclaimer')}
                  className="hover:text-primary transition-colors duration-fast focus:text-primary focus:outline-none text-left"
                >
                  Health Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/cookies')}
                  className="hover:text-primary transition-colors duration-fast focus:text-primary focus:outline-none text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-xl pt-lg border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-md text-sm text-neutral-400">
            <p>© 2025 Healthily Fit. All rights reserved.</p>
            <p className="text-xs">
              Always consult with a healthcare professional before starting any
              fitness program.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}



