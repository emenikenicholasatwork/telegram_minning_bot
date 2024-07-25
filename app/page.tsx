"use client";
import Boost from "@/components/boost/Boost";
import Dashboard from "@/components/dashboard/Dashboard";
import FootNavigator from "@/components/foot_nav/FootNavigator";
import Friends from "@/components/friends/Friends";
import Mine from "@/components/mine/Mine";
import { useGlobal } from "@/context/global_context/GlobalContext";

export default function Home() {
  const { currentLocation } = useGlobal();
  return (
    <main className="min-h-screen pt-3">
      {currentLocation === "dashboard" && <Dashboard />}
      {currentLocation === "boost" && <Boost />}
      {currentLocation === "mine" && <Mine />}
      {currentLocation === "friends" && <Friends />}
      <FootNavigator />
    </main>
  );
}
