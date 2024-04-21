import { type ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create blog",
  description: "Add blog",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
