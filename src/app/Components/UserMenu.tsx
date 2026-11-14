"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Avatar from "./Avatar";
import { logOut } from "../lib/api/auth/actions";
import type { Media } from "../lib/api/types";

type UserMenuProps = {
  name: string;
  avatar?: Media;
};

export default function UserMenu({ name, avatar }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Account menu for ${name}`}
        className="focus-visible:ring-focus-ring rounded-full focus-visible:ring-2 focus-visible:outline-none"
      >
        <Avatar name={name} avatar={avatar} />
      </button>

      {isOpen && (
        <div className="bg-surface border-border-control font-manrope absolute right-0 z-20 mt-2 w-48 rounded-xl border py-2 shadow-lg">
          <p className="text-text-muted truncate px-4 py-2 text-sm">{name}</p>
          <Link
            href="/profile"
            onClick={() => setIsOpen(false)}
            className="text-text-primary hover:bg-background block px-4 py-2"
          >
            My profile
          </Link>
          <form action={logOut}>
            <button
              type="submit"
              className="text-text-primary hover:bg-background w-full px-4 py-2 text-left"
            >
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
