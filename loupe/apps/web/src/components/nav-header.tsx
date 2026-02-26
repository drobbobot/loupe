// Persistent top header — wordmark + account access
//
// Design reference: design.md §4.1
// "Account and settings live in a persistent header element (avatar / initials
// top-right) rather than as a fifth tab"

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out-button";

export async function NavHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-40 border-b border-warm-200/60 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-serif text-lg font-medium tracking-tight text-warm-900"
        >
          Loupe
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/account"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-warm-200 text-xs font-medium text-warm-700 transition-colors hover:bg-warm-300"
                aria-label="Account settings"
              >
                {user.email?.charAt(0).toUpperCase() ?? "?"}
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/signin"
              className="text-sm font-medium text-warm-600 transition-colors hover:text-warm-900"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
