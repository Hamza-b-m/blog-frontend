import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryContextProvider from "@/context/ReactQueryContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogs",
  description: "Discover our blog list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryContextProvider>{children}</ReactQueryContextProvider>
      </body>
    </html>
  );
}
