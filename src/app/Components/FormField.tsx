import type { InputHTMLAttributes } from "react";

export const inputStyles =
  "bg-surface border-border-control text-text-primary focus:ring-focus-ring w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 disabled:opacity-50";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
};

export default function FormField({
  label,
  name,
  error,
  required,
  type = "text",
  ...inputProps
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-text-primary text-sm">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputStyles}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-feedback-error-text text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
