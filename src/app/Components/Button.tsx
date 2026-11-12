import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  variant = "secondary",
}: ButtonProps) {
  const variants = {
    primary: "bg-action-background text-action-text hover:bg-action-hover",
    secondary: "bg-cta-secondary text-surface",
  };
  const styles = `${variants[variant]} font-manrope rounded-full px-6 py-2 font-semibold ${className}`;
  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
