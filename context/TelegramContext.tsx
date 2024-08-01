import Script from "next/script";
import { TelegramUserInterface, WebAppInterface } from "./typs";
import React, { useEffect, useState, createContext, useMemo, useContext } from "react";


export interface TelegramContextInterface {
    webApp?: WebAppInterface;
    user?: TelegramUserInterface;
}

export const TelegramContext = createContext<TelegramContextInterface>({});

export const TelegramProvider = ({ children }: { children: React.ReactNode; }) => {
    const [webApp, setWebApp] = useState<WebAppInterface | null>(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
            console.log(app);
        }
    }, []);

    const value = useMemo(() => {
        return webApp ? {
            webApp,
            unsafeData: webApp.initDataUnsafe,
            user: webApp.initDataUnsafe.user,
        } : {};
    }, [webApp]);

    return (
        <TelegramContext.Provider value={value}>
            <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);