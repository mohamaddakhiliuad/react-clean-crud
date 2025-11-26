// src/types/profile.ts

/**
 * 🧩 Role
 * Defines the allowed user roles in the system.
 * - "user": standard account with basic access.
 * - "admin": elevated privileges (e.g., can edit or manage other users).
 */
export type Role = "user" | "admin";

/**
 * 👤 Profile
 * Represents a user's profile in the application.
 * 
 * This interface is typically shared between client and server so that:
 * - API responses can be strongly typed.
 * - Form components and validation schemas stay in sync.
 */
export interface Profile {
  /**
   * 🔑 Unique identifier for the user (usually UUID or database ID)
   */
  id: string;

  /**
   * 🧠 Display name or full name of the user.
   */
  name: string;

  /**
   * 📧 Primary email associated with the account.
   */
  email: string;

  /**
   * 🖼️ Optional avatar image URL.
   * May be empty if the user hasn't uploaded an image.
   */
  avatarUrl?: string;

  /**
   * 📝 Short bio or personal description.
   * Optional field with length typically limited by schema (e.g., 500 chars).
   */
  bio?: string;

  /**
   * ⚙️ Preferences: arbitrary key/value pairs such as theme, language, etc.
   * Stored as strings for maximum flexibility across clients.
   */
  preferences?: Record<string, string>;

  /**
   * 👑 User role defining their access level in the system.
   * Used in authorization logic (e.g., userCanEditProfile).
   */
  role: Role;
}
