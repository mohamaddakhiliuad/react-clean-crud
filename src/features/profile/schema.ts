// src\features\profile\Schema.ts

// ✅ Import Zod for schema validation and automatic type inference
import { z } from "zod";

/**
 * 🧩 profileSchema
 * Defines the validation rules for a user profile object.
 * 
 * This schema ensures any incoming data (from forms or API requests)
 * strictly follows the expected shape and type.
 * 
 * It mirrors the `Profile` interface but adds runtime validation.
 */
export const profileSchema = z.object({
  /**
   * 🔑 id — must be a non-empty string (e.g., UUID or database ID)
   */
  id: z.string().min(1, "ID cannot be empty"),

  /**
   * 🧠 name — user's display name
   * - Must be at least 2 characters long.
   * - Custom error message for clarity.
   */
  name: z.string().min(2, "Name must be at least 2 characters"),

  /**
   * 📧 email — must be a valid email format.
   */
  email: z.string().email("Invalid email"),

  /**
   * 🖼️ avatarUrl — optional image URL.
   * - Can be either a valid URL or an empty string ("") to clear the avatar.
   */
  avatarUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")), // allow empty string as "no avatar"

  /**
   * 📝 bio — short personal description.
   * - Max 500 characters.
   * - Optional, or can be cleared with an empty string.
   */
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  /**
   * ⚙️ preferences — key/value pairs of user settings (e.g., theme, language).
   * - Both key and value must be strings.
   * - Optional field.
   */
  preferences: z.record(z.string()).optional(),

  /**
   * 👑 role — defines user’s access level in the system.
   * - Must be one of "user" or "admin".
   */
  role: z.enum(["user", "admin"]),
});

/**
 * 💡 ProfileInput
 * - Automatically generated TypeScript type from the Zod schema above.
 * - Keeps type definitions and runtime validation in sync.
 */
export type ProfileInput = z.infer<typeof profileSchema>;
