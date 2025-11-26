"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/**
 * Global Providers component
 * ----------------------------------------
 * This component wraps the entire application with:
 * 1. SessionProvider (NextAuth) → Manages user authentication state across the app.
 * 2. QueryClientProvider (TanStack Query) → Handles server-state caching and data fetching.
 * 3. ReactQueryDevtools → Enables debugging tools for React Query in development.
 *
 * The QueryClient instance is created only once per app lifecycle
 * to ensure consistent cache management across re-renders.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // Initialize a single QueryClient instance for the app
  const [client] = React.useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        {children}
        {/* React Query DevTools for inspecting queries (only used in development) */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
