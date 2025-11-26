// src/app/api/profile/route.ts

// ✅ Import utilities for returning responses in Next.js App Router (Server Routes)
import { NextResponse } from "next/server";

// ✅ Import the Zod schema for validating profile updates
import { serverProfilePatch } from "./validation";

// ✅ Import authentication helpers for verifying user session and permissions
import { requireSession, userCanEditProfile } from "@/lib/auth";

/**
 * ⚠️ Temporary in-memory store for demo purposes.
 *    In a real application, this data should be loaded from and saved to a database.
 */
let profile = {
  id: "u_1",
  name: "Mohammad D.",
  email: "user@example.com",
  avatarUrl: "",
  bio: "Senior .NET + React Developer",
  preferences: { theme: "light", lang: "en" } as Record<string, string>,
  role: "user" as const,
};

/**
 * 📥 GET /api/profile
 * - Returns the current user's profile.
 * - Requires an active session.
 */
export async function GET() {
  // 🔐 Ensure the user is authenticated before accessing profile data
  const session = await requireSession();

  // ⚙️ In a real app, you'd query the DB using session.user.id here
  return NextResponse.json(profile);
}

/**
 * ✏️ PUT /api/profile
 * - Updates user profile fields based on validated request body.
 * - Uses Zod schema for safe parsing and validation.
 * - Checks both authentication and authorization.
 */
export async function PUT(req: Request) {
  try {
    // 🔐 Check if the request is from an authenticated user
    const session = await requireSession();

    // 🚫 Check if this user has permission to edit their profile
    if (!userCanEditProfile(session)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // ✅ Parse and validate the incoming JSON body using Zod schema
    const patch = serverProfilePatch.parse(await req.json());

    // 🧩 Merge the validated fields into the existing profile (simulate DB update)
    profile = { ...profile, ...patch };

    // 🎯 Return the updated profile as JSON
    return NextResponse.json(profile);
  } catch (e: any) {
    // 🚨 Handle authentication errors separately
    if (e?.message === "UNAUTHORIZED") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ⚠️ Handle validation or other runtime errors
    return NextResponse.json(
      {
        message: "Validation failed",
        issues: e?.issues ?? [], // Zod validation errors (if any)
      },
      { status: 400 }
    );
  }
}
