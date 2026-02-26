import type { Metadata } from "next";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-center font-serif text-2xl font-medium text-warm-900 mb-2">
        Reset your password
      </h1>
      <p className="text-center text-warm-500 text-sm mb-8">
        Enter your email and we&apos;ll send you a link to set a new password.
      </p>
      <ForgotPasswordForm />
    </>
  );
}
