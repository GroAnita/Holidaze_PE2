import type { Metadata } from "next";
import LoginForm from "../Components/LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <LoginForm />
    </main>
  );
}
