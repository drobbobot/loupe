import type { Metadata } from "next";
import { SignUpForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Create account",
};

export default function SignUpPage() {
  return (
    <>
      <h1 className="text-center font-serif text-2xl font-medium text-warm-900 mb-2">
        Save your result
      </h1>
      <p className="text-center text-warm-500 text-sm mb-8">
        Create a free account to keep your lens portrait and start your 3-week
        trial.
      </p>
      <SignUpForm />
    </>
  );
}
