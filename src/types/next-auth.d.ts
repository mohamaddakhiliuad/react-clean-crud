/**
 * 🔐 NextAuth TypeScript Module Augmentation
 * ------------------------------------------------------------
 * This file extends the built-in NextAuth types to include
 * custom fields used across our global authentication system.
 *
 * Why it's needed:
 * NextAuth provides default `User`, `Session`, and `JWT` types,
 * but large-scale applications often need extra fields (e.g., `id`, `role`).
 * By using `declare module`, we augment these types globally
 * so all parts of the app (client & server) have consistent typings.
 *
 * Fields added:
 *  - `User`: includes `id`, `email`, `name`, and `role`
 *  - `Session`: merges NextAuth’s default `user` object with `id` and `role`
 *  - `JWT`: adds `id` and `role` for secure role-based access handling
 *
 * Notes:
 *  - Keep this file imported automatically by placing it under `src/types/` or `@types/`
 *  - Re-run `tsc --noEmit` after changes to ensure augmentation is applied
 */

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: "user" | "admin";
  }

  interface Session {
    user: {
      id: string;
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "user" | "admin";
  }
}
