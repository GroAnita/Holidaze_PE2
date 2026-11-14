type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  error?: string;
};

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  error,
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-text-primary text-sm">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="bg-surface border-border-control text-text-primary focus:ring-focus-ring rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
      />
      {error && (
        <p id={errorId} className="text-feedback-error-text text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
