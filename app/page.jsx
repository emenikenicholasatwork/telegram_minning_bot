"use client";
import Boost from "@/components/boost/Boost";
import Script from "next/script";
import DailyReward from "@/components/daily_reward/DailyReward";
import Dashboard from "@/components/dashboard/Dashboard";
import Exchange from "@/components/dashboard/exchange/Exchange";
import Earn from "@/components/earn/Earn";
import FootNavigator from "@/components/foot_nav/FootNavigator";
import Friends from "@/components/friends/Friends";
import Mine from "@/components/mine/Mine";
import { useGlobal } from "@/app/GlobalContext";

export default function Home() {
  const { currentLocation } = useGlobal();
  return (
    <main className="min-h-screen pt-3 pb-32 bg-black text-white">
      <Script src="https://telegram.org/js/telegram-web-app.js" />
      {currentLocation === "dashboard" && <Dashboard />}
      {currentLocation === "boost" && <Boost />}
      {currentLocation === "mine" && <Mine />}
      {currentLocation === "friends" && <Friends />}
      {currentLocation === "earn" && <Earn />}
      <FootNavigator />
      <Exchange />
      <DailyReward />
    </main>
  );
}
