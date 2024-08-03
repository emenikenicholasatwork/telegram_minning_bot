"use client";
import Script from "next/script";
import "./globals.css";
import { GlobalProvider } from "@/app/GlobalContext";

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          {children}
        </GlobalProvider>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
