// ===============================
// auth.config.ts
// Centralized NextAuth configuration (NextAuth v5 / Auth.js)
// ===============================

import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Main authentication configuration used by both the API route
 * (/api/auth/[...nextauth]) and server utilities like getServerSession().
 *
 * This demo uses static, hardcoded users — replace this with a real database
 * (e.g., Prisma, Supabase, Mongo, etc.) in production.
 */
export const authConfig = {
  // -----------------------------------------------------------
  // 1️⃣ Session Configuration
  // -----------------------------------------------------------
  session: {
    // Using "jwt" means session data is stored inside an encrypted JWT cookie.
    // It avoids a server-side session store and scales well for serverless apps.
    strategy: "jwt",
  },

  // -----------------------------------------------------------
  // 2️⃣ Authentication Providers
  // -----------------------------------------------------------
  providers: [
    CredentialsProvider({
      // The fields to render on the default sign-in form.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },

      /**
       * Authorize callback runs on sign-in attempt.
       * It must return a user object if credentials are valid, or `null` otherwise.
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = credentials;

        // ⚠️ DEMO USERS — replace this block with a real DB lookup.
        const users = [
          {
            id: "u_1",
            email: "user@example.com",
            password: "userpass",
            name: "Regular User",
            role: "user" as const,
          },
          {
            id: "u_2",
            email: "admin@example.com",
            password: "adminpass",
            name: "Admin User",
            role: "admin" as const,
          },
        ];

        // Find matching user
        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        // If user not found, return null (login fails)
        if (!foundUser) return null;

        // Return user object; this gets attached to the token in jwt() callback
        return {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        };
      },
    }),
  ],

  // -----------------------------------------------------------
  // 3️⃣ Callbacks — control how data flows between token ↔ session
  // -----------------------------------------------------------
  callbacks: {
    /**
     * The `jwt` callback runs whenever a token is created or updated.
     * Here we attach the user's id and role to the token for later access.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },

    /**
     * The `session` callback runs whenever a session is checked or created.
     * It merges the token fields (id, role) into the session's `user` object.
     */
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as "user" | "admin";
      }
      return session;
    },
  },

  // -----------------------------------------------------------
  // 4️⃣ (Optional) Custom Pages or Events
  // -----------------------------------------------------------
  // pages: {
  //   signIn: "/login",
  //   error: "/auth/error",
  // },
  //
  // events: {
  //   async signIn({ user }) { console.log("User signed in:", user); },
  // },
} satisfies NextAuthConfig;
