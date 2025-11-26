// src/features/profile/components/organisms/ProfileForm.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { profileSchema, type ProfileInput } from "../../schema";
import { useProfileQuery, useUpdateProfile } from "../../hooks";
import { Avatar } from "../atoms/Avatar";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { PreferencesEditor } from "../molecules/PreferencesEditor";

/**
 * ProfileForm
 * --------------------------------------------------------------------------
 * A production-grade form for editing a user's profile.
 * - Validates with Zod via react-hook-form resolver
 * - Loads initial values from server + hydrates form
 * - Uses optimistic mutation in hooks and resets with server truth on success
 * - Accessible labels and error states
 */
export function ProfileForm() {
  const { data, isLoading, isError, refetch } = useProfileQuery();
  const update = useUpdateProfile();

  // Initialize react-hook-form with Zod schema and sensible defaults
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      avatarUrl: "",
      bio: "",
      preferences: {},
      role: "user",
    },
    mode: "onBlur", // validate on blur; reduces noisy re-validation
    shouldFocusError: true,
  });

  // Hydrate form when the profile loads or changes
  React.useEffect(() => {
    if (!data) return;
    form.reset({
      id: data.id,
      name: data.name ?? "",
      email: data.email ?? "",
      avatarUrl: data.avatarUrl ?? "",
      bio: data.bio ?? "",
      preferences: data.preferences ?? {},
      role: data.role ?? "user",
    });
  }, [data, form]);

  // Watch only the fields needed for the live header preview
  const namePreview = useWatch({ control: form.control, name: "name" });
  const emailPreview = useWatch({ control: form.control, name: "email" });
  const avatarPreview = useWatch({
    control: form.control,
    name: "avatarUrl",
  });

  // Submit handler
  const onSubmit: SubmitHandler<ProfileInput> = async (values) => {
    try {
      const saved = await update.mutateAsync(values);
      // Replace optimistic state with server truth and clear dirty flags
      form.reset(saved);
      // Optional: route through your toast system instead of alert
      // toast.success("Profile saved");
    } catch {
      // toast.error("Failed to save profile");
    }
  };

  if (isLoading) return <div>Loading profile…</div>;

  if (isError) {
    return (
      <div className="flex items-center gap-3">
        <span>Error loading profile.</span>
        <Button
          variant="outline"
          onClick={() => {
            // guard against double clicks while loading
            if (!isLoading) refetch();
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isDirty },
  } = form;

  return (
    // Disable interactive controls while saving to prevent double submits
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 max-w-2xl"
      noValidate
    >
      {/* Header with avatar and live preview */}
      <div className="flex items-center gap-4">
        <Avatar src={avatarPreview} />
        <div>
          <div className="text-lg font-semibold">
            {namePreview || "Your Name"}
          </div>
          <div className="text-sm text-gray-600">{emailPreview}</div>
        </div>
      </div>

      <fieldset className="grid gap-4" disabled={update.isPending}>
        {/* Name */}
        <div className="grid gap-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Avatar URL */}
        <div className="grid gap-1">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            placeholder="https://…"
            aria-invalid={!!errors.avatarUrl}
            {...register("avatarUrl")}
          />
          {errors.avatarUrl && (
            <p className="text-red-600 text-sm">
              {String(errors.avatarUrl.message)}
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="grid gap-1">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={4}
            placeholder="Short introduction…"
            aria-invalid={!!errors.bio}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-red-600 text-sm">{String(errors.bio.message)}</p>
          )}
        </div>

        {/* Preferences (object editor) — bind via Controller for clean sync */}
        <div className="grid gap-1">
          <Label>Preferences</Label>
          <Controller
            control={control}
            name="preferences"
            render={({ field: { value, onChange } }) => (
              <PreferencesEditor value={value ?? {}} onChange={onChange} />
            )}
          />
          {errors.preferences && (
            <p className="text-red-600 text-sm">
              {/* preferences usually a record; show generic message if needed */}
              Invalid preferences
            </p>
          )}
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" disabled={update.isPending || !isDirty}>
          {update.isPending ? "Saving…" : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset(form.getValues())}
          title="Reset to current values"
          disabled={update.isPending}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
