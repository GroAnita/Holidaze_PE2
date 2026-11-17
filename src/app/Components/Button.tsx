import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
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
    secondary:
      "bg-secondary-background text-secondary-text hover:bg-secondary-hover",
    outline: "border-2 border-hero-text text-hero-text hover:bg-hero-text/10",
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
