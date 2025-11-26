// src/app/profile/page.tsx
import { Protected } from "@/features/profile/routes/Protected";
import { ProfileForm } from "@/features/profile/components/organisms/ProfileForm";

/**
 * Marks this page as dynamic to ensure user-specific session data
 * (from next-auth) is always fetched fresh on each request.
 * Useful when using SSR + client session mix.
 */
export const dynamic = "force-dynamic";

/**
 * ProfilePage
 * --------------------------------------------------------------------------
 * Displays the authenticated user's profile.
 * - Wrapped inside <Protected> to enforce role-based access
 * - Renders <ProfileForm> for editable profile data
 * - Accessible to "user" and "admin" roles only
 */
export default function ProfilePage() {
  return (
    <Protected allow={["user", "admin"]}>
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        <ProfileForm />
      </main>
    </Protected>
  );
}
