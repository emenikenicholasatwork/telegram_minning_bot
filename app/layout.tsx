"use client";
import "./globals.css";
import { GlobalProvider } from "@/context/global_context/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </GlobalProvider>
  );
}
