"use client";
import "./globals.css";
import { GlobalProvider } from "@/app/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body>
          <main>
            {children}
          </main>
        </body>
      </GlobalProvider>
    </html>
  );
}
