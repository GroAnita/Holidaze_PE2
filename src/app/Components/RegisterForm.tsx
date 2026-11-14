"use client";

import Link from "next/link";
import { useActionState } from "react";
import { register, type FormState } from "../lib/api/auth/actions";
import Button from "./Button";
import FormField from "./FormField";

const initialState: FormState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);
  const role = state.values?.role ?? "customer";

  return (
    <div className="font-manrope px-8 py-10">
      <h1 className="font-italiana text-feedback-success-text text-center text-4xl tracking-wide">
        Create your account
      </h1>

      <form action={formAction} noValidate className="mt-6 flex flex-col gap-4">
        <fieldset className="text-text-primary flex flex-col items-center gap-2">
          <legend className="mb-2 w-full text-center text-lg">
            I want to ...
          </legend>
          <div className="flex gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="customer"
                defaultChecked={role === "customer"}
              />
              Book stays
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="manager"
                defaultChecked={role === "manager"}
              />
              Manage venues
            </label>
          </div>
        </fieldset>

        <FormField
          label="Username"
          name="name"
          placeholder="Your username"
          autoComplete="username"
          defaultValue={state.values?.name}
          error={state.errors?.name}
        />
        <FormField
          label="Email address (must be @stud.noroff.no)"
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
          autoComplete="new-password"
          error={state.errors?.password}
        />
        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          error={state.errors?.confirmPassword}
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
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-text-primary mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Log in here
        </Link>
      </p>
    </div>
  );
}
