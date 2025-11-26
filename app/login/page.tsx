// src/app/login/page.tsx
"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

/**
 * LoginPage
 * --------------------------------------------------------------------------
 * Demo login screen using NextAuth credentials provider.
 * - Allows users to sign in with email/password
 * - Redirects to /profile after successful login
 * - Pre-filled demo credentials for easy testing
 */
export default function LoginPage() {
  const [email, setEmail] = React.useState("user@example.com");
  const [password, setPassword] = React.useState("userpass");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
        redirect: false, // handle manually for better control
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else if (res?.ok) {
        window.location.href = res.url ?? "/profile";
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-10 max-w-sm mx-auto grid gap-4">
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-2">Login</h1>

      {/* Email field */}
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
        aria-required="true"
      />

      {/* Password field */}
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Password"
        aria-required="true"
      />

      {/* Sign in button */}
      <Button onClick={handleLogin} disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      {/* Error message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Demo credentials note */}
      <p className="text-sm text-gray-500 mt-2">
        Demo users:&nbsp;
        <code>user@example.com / userpass</code> or{" "}
        <code>admin@example.com / adminpass</code>
      </p>
    </main>
  );
}
