"use client";

export function SignOutButton() {
  return (
    <form action="/auth/signout" method="POST">
      <button
        type="submit"
        className="text-sm text-warm-500 transition-colors hover:text-warm-700"
      >
        Sign out
      </button>
    </form>
  );
}
