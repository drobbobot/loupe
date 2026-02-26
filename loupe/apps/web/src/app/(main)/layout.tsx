// Main app layout — includes the persistent nav header.
// All product pages live in this route group.
// Auth pages use their own (auth) layout without the header.

import { NavHeader } from "@/components/nav-header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavHeader />
      {children}
    </>
  );
}
