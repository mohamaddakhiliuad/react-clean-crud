// src/components/auth/Protected.tsx
"use client";

import * as React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Role = "user" | "admin";

interface ProtectedProps {
  /** List of roles allowed to access this content */
  allow: Role[];
  /** Protected page or component children */
  children: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                              Protected Component                           */
/* -------------------------------------------------------------------------- */

/**
 * Protected
 * --------------------------------------------------------------------------
 * Client-side guard for role-based authorization.
 * - If not authenticated → redirects to sign-in page
 * - If authenticated but lacks permission → redirects to `/403`
 * - Otherwise renders protected children
 */
export function Protected({ allow, children }: ProtectedProps) {
  const { status, data } = useSession();
  const router = useRouter();

  /* ---------------------------------------------------------------------- */
  /*                           Authorization logic                          */
  /* ---------------------------------------------------------------------- */
  React.useEffect(() => {
    // Case 1: user not logged in → redirect to login
    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/profile" });
      return;
    }

    // Case 2: user logged in but lacks allowed role → redirect to 403
    if (status === "authenticated") {
      const role = (data?.user as { role?: Role })?.role;
      if (!role || !allow.includes(role)) {
        router.replace("/403");
      }
    }
  }, [status, data, allow, router]);

  /* ---------------------------------------------------------------------- */
  /*                           Render conditions                            */
  /* ---------------------------------------------------------------------- */

  // While checking session → don't flash UI
  if (status === "loading") return null;

  // When authenticated, check for valid role again before rendering
  if (status === "authenticated") {
    const role = (data?.user as { role?: Role })?.role;
    if (!role || !allow.includes(role)) return null;
    return <>{children}</>;
  }

  // Default fallback (unauthenticated)
  return null;
}
