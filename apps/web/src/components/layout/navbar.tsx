import { Dumbbell, Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useNavbar } from "@/hooks/use-navbar";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const { activeSection, closeMenu, isMenuOpen, isScrolled, toggleMenu } =
    useNavbar();

  const isHomePage = location.pathname === "/";

  // Navigation links for home page
  const homeLinks = [
    { href: "#hero", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#personalized-workouts", label: "Personalized Workouts" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 backdrop-blur-sm border-b transition-all duration-medium",
        isScrolled
          ? "border-neutral-800 shadow-lg"
          : "border-neutral-800/50"
      )}
      style={{ backgroundColor: "var(--color-background-dark)" }}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-sm z-50"
            onClick={closeMenu}
          >
            <Dumbbell className="w-8 h-8 text-primary" />
            <span className="font-heading text-xl md:text-2xl font-bold text-primary">
              Healthily Fit
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-lg">
            {isHomePage ? (
              <>
                {homeLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "text-sm font-medium transition-colors duration-fast hover:text-primary",
                      activeSection === link.href.replace("#", "")
                        ? "text-primary"
                        : "text-neutral-100"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </>
            ) : (
              <Link
                to={user ? "/dashboard" : "/"}
                className="text-neutral-100 hover:text-primary transition-colors duration-fast text-sm font-medium"
              >
                {user ? "Dashboard" : "Home"}
              </Link>
            )}
            {user && (
              <>
              <Link
                to="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors duration-fast",
                  location.pathname === "/dashboard"
                    ? "text-primary"
                    : "text-neutral-100 hover:text-primary"
                )}
              >
                Dashboard
              </Link>
                <Link
                  to="/dashboard/profile"
                  className={cn(
                    "text-sm font-medium transition-colors duration-fast",
                    location.pathname === "/dashboard/profile"
                      ? "text-primary"
                      : "text-neutral-100 hover:text-primary"
                  )}
                >
                  Profile
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-sm">
            {user ? (
              <>
                <Link to="/dashboard/profile">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neutral-100 hover:text-primary"
                  >
                    <User className="w-4 h-4 mr-1" />
                    <span className="hidden lg:inline">
                  {user.displayName || user.email}
                </span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={signOut}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-neutral-100 hover:text-primary"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-neutral-100 hover:text-primary transition-colors z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-neutral-900 border-b border-neutral-800 shadow-xl animate-slideDown">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            {isHomePage ? (
              <>
                {homeLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "block w-full text-left py-2 px-4 rounded-md transition-colors duration-fast",
                      activeSection === link.href.replace("#", "")
                        ? "bg-primary/10 text-primary"
                        : "text-neutral-100 hover:bg-neutral-800 hover:text-primary"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </>
            ) : (
              <Link
                to={user ? "/dashboard" : "/"}
                onClick={closeMenu}
                className="block py-2 px-4 text-neutral-100 hover:bg-neutral-800 hover:text-primary rounded-md transition-colors duration-fast"
              >
                {user ? "Dashboard" : "Home"}
              </Link>
            )}

            {user && (
              <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className={cn(
                  "block py-2 px-4 rounded-md transition-colors duration-fast",
                  location.pathname === "/dashboard"
                    ? "bg-primary/10 text-primary"
                    : "text-neutral-100 hover:bg-neutral-800 hover:text-primary"
                )}
              >
                Dashboard
              </Link>
                <Link
                  to="/dashboard/profile"
                  onClick={closeMenu}
                  className={cn(
                    "block py-2 px-4 rounded-md transition-colors duration-fast",
                    location.pathname === "/dashboard/profile"
                      ? "bg-primary/10 text-primary"
                      : "text-neutral-100 hover:bg-neutral-800 hover:text-primary"
                  )}
                >
                  Profile
                </Link>
              </>
            )}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              {user ? (
                <>
                  <div className="text-sm text-neutral-300 px-4 py-2">
                    {user.displayName || user.email}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut();
                      closeMenu();
                    }}
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" onClick={closeMenu} className="block">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-neutral-100 hover:text-primary"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth/signup" onClick={closeMenu} className="block">
                    <Button size="sm" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


