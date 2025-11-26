// src\features\profile\api.ts
import { z } from "zod";
import { profileSchema, type ProfileInput } from "@/features/profile/schema";

/* -----------------------------------------------------------------------------
 * API Error with HTTP status + optional validation issues (e.g., Zod)
 * -------------------------------------------------------------------------- */
export class ApiError extends Error {
  status: number;
  issues?: unknown;
  constructor(message: string, status: number, issues?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.issues = issues;
  }
}

/* -----------------------------------------------------------------------------
 * Optional client-side patch schema (no "role" / "id" from the client)
 * Adjust if your client is allowed to send other fields.
 * -------------------------------------------------------------------------- */
export const clientProfilePatch = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  bio: z.string().max(500).optional().or(z.literal("")),
  preferences: z.record(z.string()).optional(),
});
export type ClientProfilePatch = z.infer<typeof clientProfilePatch>;

/* -----------------------------------------------------------------------------
 * Small JSON fetch helper for Next.js client-side calls
 * - Adds credentials
 * - Disables cache for fresh data
 * - Throws ApiError with status + issues on error
 * -------------------------------------------------------------------------- */
async function fetchJSON<T>(
  url: string,
  init?: RequestInit & { signal?: AbortSignal },
  opts?: {
    /** Validate response JSON against a Zod schema (optional) */
    schema?: z.ZodTypeAny;
    /** Custom error message for non-OK responses */
    errorMessage?: string;
  }
): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    credentials: "include",
    ...init,
  });

  // Try to parse JSON body (even on errors) for meaningful messages
  let payload: any = null;
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      payload = await res.json();
    } catch {
      // ignore parse errors; payload stays null
    }
  }

  if (!res.ok) {
    const msg =
      (payload?.message as string) ||
      (opts?.errorMessage ?? "Request failed");
    throw new ApiError(msg, res.status, payload?.issues);
  }

  // Optional response validation
  if (opts?.schema) {
    const parsed = opts.schema.safeParse(payload);
    if (!parsed.success) {
      throw new ApiError("Response validation failed", 500, parsed.error.flatten());
    }
    return parsed.data as T;
  }

  return payload as T;
}

/* -----------------------------------------------------------------------------
 * GET /api/profile
 * - Returns profile JSON
 * - Validates response against `profileSchema` for extra safety
 * - Accepts AbortSignal for cancellation
 * -------------------------------------------------------------------------- */
export async function getProfile(signal?: AbortSignal) {
  return fetchJSON<ProfileInput>("/api/profile", { signal }, {
    schema: profileSchema,
    errorMessage: "Failed to load profile",
  });
}

/* -----------------------------------------------------------------------------
 * PUT /api/profile
 * - Sends a partial update (client-side patch)
 * - Validates the outgoing body on client (optional but recommended)
 * - Returns the updated profile; validates response shape too
 * -------------------------------------------------------------------------- */
export async function updateProfile(
  data: unknown,
  signal?: AbortSignal
) {
  // Client-side validation before sending (prevents bad payloads)
  const parsed = clientProfilePatch.safeParse(data);
  if (!parsed.success) {
    throw new ApiError("Validation failed", 400, parsed.error.flatten());
  }

  return fetchJSON<ProfileInput>(
    "/api/profile",
    {
      method: "PUT",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    },
    {
      schema: profileSchema,
      errorMessage: "Failed to update profile",
    }
  );
}
