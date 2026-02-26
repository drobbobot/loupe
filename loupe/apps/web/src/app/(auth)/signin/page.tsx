import type { Metadata } from "next";
import { SignInForm } from "./signin-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <>
      <h1 className="text-center font-serif text-2xl font-medium text-warm-900 mb-2">
        Welcome back
      </h1>
      <p className="text-center text-warm-500 text-sm mb-8">
        Sign in to see your lens portrait.
      </p>
      <SignInForm />
    </>
  );
}
