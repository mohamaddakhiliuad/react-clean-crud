// src/features/profile/components/atoms/Avatar.tsx
"use client";

import * as React from "react";

type AvatarProps = {
  /** Image URL for the user’s avatar. If not provided, a default placeholder is shown. */
  src?: string;
  /** Accessible alternative text for screen readers (AODA / WCAG compliance). */
  alt?: string;
  /** Avatar size in pixels (applied to both width and height). */
  size?: number;
  /** Optional Tailwind className for external customization. */
  className?: string;
};

/**
 * Avatar Component (Atom)
 * ------------------------------------------------------------------
 * A small, reusable atomic component for displaying user avatars.
 * - Uses a default placeholder if no image is provided.
 * - Fully accessible with descriptive alt text.
 * - Supports custom sizing and styling via props.
 * - Optimized for performance and clean design.
 */
export function Avatar({
  src,
  alt = "User avatar",
  size = 72,
  className = "",
}: AvatarProps) {
  return (
    <img
      src={src || "/placeholder-avatar.png"}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full object-cover border border-gray-300 shadow-sm ${className}`}
      draggable={false}       // Prevent accidental dragging
      loading="lazy"          // Improves performance by lazy-loading images
      decoding="async"        // Enables faster rendering for modern browsers
    />
  );
}
ط