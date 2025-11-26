// features/profile/providers.ts
// React Query hooks for Profile with clean typing, safe optimistic updates,
// and short, consistent English comments.

import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { getProfile, updateProfile } from "./api";
import type { Profile } from "./types";

/** ----------------------------------------------------------------
 * Query Keys
 * ---------------------------------------------------------------- */
export const PROFILE_KEY: QueryKey = ["profile"] as const;

/** ----------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------- */

/**
 * Shallow-merge helper for optimistic updates.
 * - Merges top-level fields
 * - Special-cases `preferences` (object bag) to merge keys instead of replace
 */
function mergeProfile(oldVal: Profile | undefined, patch: Partial<Profile>): Profile | undefined {
  if (!oldVal) return patch as Profile;
  const preferences =
    "preferences" in patch && patch.preferences && typeof patch.preferences === "object"
      ? { ...oldVal.preferences, ...patch.preferences }
      : oldVal.preferences;

  return { ...oldVal, ...patch, preferences } as Profile;
}

/** Context passed between onMutate → onError/onSettled */
type MutCtx = { previous?: Profile };

/** ----------------------------------------------------------------
 * Queries
 * ---------------------------------------------------------------- */

/**
 * Load the current user's profile.
 * - `staleTime`: keeps data fresh for 60s to avoid unnecessary refetches
 * - `gcTime`: cache survives for 5 min if unused
 * - `placeholderData: keepPreviousData` gives smoother loading between refetches
 */
export function useProfileQuery() {
  return useQuery<Profile>({
    queryKey: PROFILE_KEY,
    queryFn: ({ signal }) => getProfile(signal),
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1, // fail fast; surface auth/permission issues quickly
    placeholderData: (prev) => prev, // keep previous while refetching
  });
}

/** ----------------------------------------------------------------
 * Mutations
 * ---------------------------------------------------------------- */

/**
 * Update profile with optimistic UI.
 * - Cancels in-flight queries to avoid races
 * - Applies optimistic merge, then rolls back on error
 * - Always revalidate to sync with server source of truth
 */
export function useUpdateProfile() {
  const qc = useQueryClient();

  return useMutation<Profile, unknown, Partial<Profile>, MutCtx>({
    mutationFn: updateProfile,

    // Optimistic update for snappy UX
    onMutate: async (patch) => {
      await qc.cancelQueries({ queryKey: PROFILE_KEY });

      const previous = qc.getQueryData<Profile>(PROFILE_KEY);

      qc.setQueryData<Profile | undefined>(PROFILE_KEY, (old) => mergeProfile(old, patch));

      return { previous };
    },

    // Roll back on error
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(PROFILE_KEY, ctx.previous);
    },

    // Replace optimistic cache with server response when success
    onSuccess: (server) => {
      qc.setQueryData(PROFILE_KEY, server);
    },

    // Ensure final sync (covers both success & error)
    onSettled: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEY });
    },
  });
}
