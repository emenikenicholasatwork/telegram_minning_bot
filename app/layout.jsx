"use client";
import Script from "next/script";
import "./globals.css";
import { GlobalProvider } from "@/app/GlobalContext";

export default function RootLayout({
  children,
}) {
  return (
    <GlobalProvider>
      <html lang="en">
        <body>
          {children}
          <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        </body>
      </html>
    </GlobalProvider>
  );
}
