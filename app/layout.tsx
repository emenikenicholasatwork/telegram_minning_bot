"use client";
import { TelegramProvider } from "@/context/TelegramContext";
import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TelegramProvider>
      <html lang="en">
        <body>
          <GlobalProvider>
            <main>
              {children}
            </main>
          </GlobalProvider>
        </body>
      </html>
    </TelegramProvider>
  );
}
