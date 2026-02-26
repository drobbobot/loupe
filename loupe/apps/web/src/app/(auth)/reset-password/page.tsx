import type { Metadata } from "next";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Set new password",
};

export default function ResetPasswordPage() {
  return (
    <>
      <h1 className="text-center font-serif text-2xl font-medium text-warm-900 mb-2">
        Set a new password
      </h1>
      <p className="text-center text-warm-500 text-sm mb-8">
        Choose a new password for your account.
      </p>
      <ResetPasswordForm />
    </>
  );
}
