"use client";
import Boost from "@/components/boost/Boost";
import Dashboard from "@/components/dashboard/Dashboard";
import Exchange from "@/components/dashboard/exchange/Exchange";
import Earn from "@/components/earn/Earn";
import FootNavigator from "@/components/foot_nav/FootNavigator";
import Friends from "@/components/friends/Friends";
import Mine from "@/components/mine/Mine";
import { useGlobal } from "@/context/global_context/GlobalContext";

export default function Home() {
  const { currentLocation } = useGlobal();
  return (
    <main className="min-h-screen pt-3">
      {currentLocation === "exchange" && <Exchange />}
      {currentLocation === "dashboard" && <Dashboard />}
      {currentLocation === "boost" && <Boost />}
      {currentLocation === "mine" && <Mine />}
      {currentLocation === "friends" && <Friends />}
      {currentLocation === "earn" && <Earn />}
      <FootNavigator />
    </main>
  );
}
