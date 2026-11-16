"use client";

import Link from "next/link";
import { useState, useActionState } from "react";
import type { Profile } from "../lib/api/types";
import type { FormState } from "../lib/api/auth/actions";
import { updateProfileAction } from "../lib/api/profileActions";
import Avatar from "./Avatar";
import Button from "./Button";
import FormField, { inputStyles } from "./FormField";

type ProfileFormProps = {
  profile: Profile;
};

export default function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    updateProfileAction,
    {},
  );
  const [avatarUrl, setAvatarUrl] = useState(
    state.values?.avatarUrl ?? profile.avatar?.url ?? "",
  );
  const [bio, setBio] = useState(state.values?.bio ?? profile.bio ?? "");
  const previewUrl = avatarUrl.startsWith("http") ? avatarUrl : "undefined";

  return (
    <div className="bg-surface font-manrope w-full max-w-xl rounded-xl p-8 shadow-sm">
      <h1 className="font-italiana text-feedback-success-text mb-6 text-center text-4xl tracking-wide">
        Edit profile
      </h1>

      <form action={formAction} noValidate className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <Avatar
            name={profile.name}
            avatar={previewUrl ? { url: previewUrl } : undefined}
            className="h-20 w-20 text-2xl"
          />
          <div className="flex-1">
            <FormField
              label="Profile picture URL"
              name="avatarUrl"
              type="url"
              placeholder="https://..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              error={state.errors?.avatarUrl}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className="text-text-primary text-sm">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            maxLength={160}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            aria-invalid={Boolean(state.errors?.bio)}
            aria-describedby="bio-count"
            className={inputStyles}
          />
          <p id="bio-count" className="text-text-muted text-right text-xs">
            {bio.length}/160
          </p>
          {state.errors?.bio && (
            <p className="text-feedback-error-text text-sm">
              {state.errors.bio}
            </p>
          )}
        </div>

        <label className="text-text-primary flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="venueManager"
            defaultChecked={
              state.values
                ? state.values.venueManager === "on"
                : profile.venueManager
            }
            className="mt-1"
          />
          <span>
            <span className="font-semibold">I want to rent out my place</span>
            <span className="text-text-muted block">
              Become a venue manager to list and manage venues.
            </span>
          </span>
        </label>

        {state.message && (
          <p
            role="alert"
            className="bg-feedback-error-background text-feedback-error-text rounded-lg px-3 py-2 text-sm"
          >
            {state.message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Link
            href="/profile"
            className="text-text-primary px-4 py-2 hover:underline"
          >
            Cancel
          </Link>
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
