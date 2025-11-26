// src/lib/auth-utils.ts  

// ✅ Import the central NextAuth configuration (providers, callbacks, etc.)
import { authConfig } from "@/auth.config";

// ✅ Import the helper from NextAuth to fetch the current session on the server side
import { getServerSession  } from "next-auth";

/**
 * 🔒 requireSession()
 * Ensures that the current server request has an authenticated session.
 * - Used in server actions, API routes, or server components that require authentication.
 * - Throws an error if the user is not authenticated.
 */
export async function requireSession() {
  // Get the active session from NextAuth using the same configuration
  const session = await getServerSession(authConfig);

  // If no valid session is found → reject the request
  if (!session) {
    // Throw a standard error (can be caught and redirected to /auth/signin)
    throw new Error("UNAUTHORIZED");
  }

  // Return the full session object (includes user data, role, etc.)
  return session;
}

/**
 * 👤 userCanEditProfile(session)
 * Checks if the user has permission to edit a profile.
 * - Default logic: both "user" and "admin" roles can edit their own profile.
 * - You can extend this for role-based or resource-based authorization.
 */
export function userCanEditProfile(session: any): boolean {
  // Defensive check (avoid runtime error if session is null)
  const role = session?.user?.role;

  // For demo: allow both "user" and "admin"
  return role === "user" || role === "admin";
}
