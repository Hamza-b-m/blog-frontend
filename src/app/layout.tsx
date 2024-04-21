import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryContextProvider from "@/context/ReactQueryContext";
import ToastContextProvider from "@/context/ToastContext";

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
        <ReactQueryContextProvider>
          <ToastContextProvider>{children}</ToastContextProvider>
        </ReactQueryContextProvider>
      </body>
    </html>
  );
}
