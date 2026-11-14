import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  variant = "secondary",
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary: "bg-action-background text-action-text hover:bg-action-hover",
    secondary: "bg-cta-secondary text-surface",
  };
  const styles = `${variants[variant]} font-manrope rounded-full px-6 py-2 font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
