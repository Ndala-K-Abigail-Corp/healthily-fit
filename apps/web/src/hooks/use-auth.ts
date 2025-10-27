/**
 * Re-export of useAuthContext for backward compatibility
 * All auth logic is now managed by AuthContext
 */
export { useAuthContext as useAuth } from "@/context/auth-context";
export type { AuthUser } from "@/context/auth-context";


