"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type FormState } from "../lib/api/auth/actions";
import Button from "./Button";
import FormField from "./FormField";

const initialState: FormState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="bg-background border-cta-secondary font-manrope w-full max-w-xl rounded-2xl border-8 px-8 py-10">
      <h1 className="font-italiana text-text-primary text-center text-5xl tracking-widest">
        Welcome back
      </h1>
      <p className="font-italiana text-text-primary mt-2 text-center text-3xl tracking-wide">
        Let&apos;s travel
      </p>

      <form
        action={formAction}
        noValidate
        className="mt-10 flex flex-col gap-5"
      >
        <FormField
          label="Email address"
          name="email"
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          defaultValue={state.values?.email}
          error={state.errors?.email}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          error={state.errors?.password}
        />

        {state.message && (
          <p
            role="alert"
            className="bg-feedback-error-background text-feedback-error-text rounded-lg px-3 py-2 text-sm"
          >
            {state.message}
          </p>
        )}

        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Logging in..." : "Log in"}
        </Button>
      </form>

      <p className="text-text-primary mt-6 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Create one here
        </Link>
      </p>
    </div>
  );
}
