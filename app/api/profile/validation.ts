// src/lib/validations/serverProfilePatch.ts

// ✅ Import the Zod library for schema validation
import { z } from "zod";

/**
 * 🧩 serverProfilePatch
 * This schema defines which fields are allowed and how they should be validated
 * when a user (or admin) updates a profile on the server.
 *
 * - Used typically in API routes or server actions (e.g., PATCH /api/profile).
 * - Prevents invalid or unsafe data from being saved to the database.
 */
export const serverProfilePatch = z.object({
  /**
   * 🧠 name
   * - Must be a string with at least 2 characters.
   * - Optional because user might only update some fields.
   */
  name: z.string().min(2).optional(),

  /**
   * 📧 email
   * - Must follow email format.
   * - Optional because not every update includes email change.
   */
  email: z.string().email().optional(),

  /**
   * 🖼️ avatarUrl
   * - Must be a valid URL or an empty string ("") if user wants to clear the avatar.
   * - Optional for partial updates.
   */
  avatarUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")) // accept empty string as "remove avatar"
    .optional(),

  /**
   * 📝 bio
   * - User's biography or short description.
   * - Max 500 characters, optional, or empty string to clear.
   */
  bio: z
    .string()
    .max(500)
    .optional()
    .or(z.literal("")) // allow clearing bio
    .optional(),

  /**
   * ⚙️ preferences
   * - Key-value map for storing settings like theme, language, etc.
   * - Keys and values are strings.
   * - Optional because not all users have preferences.
   */
  preferences: z.record(z.string()).optional(),

  /**
   * 👑 role
   * - Defines user access level ("user" or "admin").
   * - Optional to prevent normal users from editing it,
   *   but can be used by admin routes for role management.
   */
  role: z.enum(["user", "admin"]).optional(),
});

/**
 * 💡 ServerProfilePatch (TypeScript type)
 * - Automatically infers a TypeScript type from the schema above.
 * - Use it as the type for your route handlers or service functions:
 *     (data: ServerProfilePatch) => { ... }
 */
export type ServerProfilePatch = z.infer<typeof serverProfilePatch>;
