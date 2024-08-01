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
    <GlobalProvider>
      <html lang="en">
        <body>
          <TelegramProvider>
            <main>
              {children}
            </main>
          </TelegramProvider>
        </body>
      </html>
    </GlobalProvider>
  );
}
