import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook for managing navbar state
 * - Tracks active section based on scroll position
 * - Handles mobile menu open/close state
 * - Manages scroll-based navbar styling
 */
export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Only track sections on landing page
      if (location.pathname === "/") {
        const sections = [
          "hero",
          "features",
          "personalized-workouts",
          "testimonials",
        ];

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Section is considered active if it's in the top 40% of viewport
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 0) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return {
    activeSection,
    closeMenu,
    isMenuOpen,
    isScrolled,
    toggleMenu,
  };
}

