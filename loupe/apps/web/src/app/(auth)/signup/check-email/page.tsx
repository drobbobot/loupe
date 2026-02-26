import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Check your email",
};

export default function CheckEmailPage() {
  return (
    <div className="text-center">
      <h1 className="font-serif text-2xl font-medium text-warm-900 mb-3">
        Check your email
      </h1>
      <p className="text-warm-500 text-sm leading-relaxed mb-8">
        We&apos;ve sent you a confirmation link. Click it to finish creating
        your account and save your result.
      </p>
      <Link
        href="/signin"
        className="text-sm font-medium text-warm-700 hover:text-warm-900"
      >
        Back to sign in
      </Link>
    </div>
  );
}
