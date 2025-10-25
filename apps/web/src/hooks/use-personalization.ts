import { useAuth } from "./use-auth";

/**
 * Custom hook for UI personalization based on user state
 * Provides personalized greetings and display preferences
 * Note: This is UI-only, no backend logic
 */
export function usePersonalization() {
  const { user } = useAuth();

  // Get time-based greeting
  const getGreeting = (): string => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Get personalized greeting with user name
  const getPersonalizedGreeting = (): string => {
    const greeting = getGreeting();
    const name = user?.displayName?.split(" ")[0] || "there";

    return `${greeting}, ${name}!`;
  };

  // Get display name or fallback
  const getDisplayName = (): string => {
    return user?.displayName || user?.email?.split("@")[0] || "User";
  };

  // Get initials for avatar
  const getInitials = (): string => {
    if (!user?.displayName) return "U";

    const names = user.displayName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.displayName.slice(0, 2).toUpperCase();
  };

  return {
    getDisplayName,
    getGreeting,
    getInitials,
    getPersonalizedGreeting,
    isAuthenticated: !!user,
    user,
  };
}

