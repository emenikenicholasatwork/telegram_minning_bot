"use client";
import ProgressAvater from "@/components/avater/ProgressAvater";
import Boost from "@/components/boost/Boost";
import ConfirmChangeExchange from "@/components/confirm/ConfirmChangeExchange";
import CollectCipherReward from "@/components/daily_reward/collect_reward/CollectCipherReward";
import DailyReward from "@/components/daily_reward/DailyReward";
import Dashboard from "@/components/dashboard/Dashboard";
import Exchange from "@/components/dashboard/exchange/Exchange";
import Earn from "@/components/earn/Earn";
import FootNavigator from "@/components/foot_nav/FootNavigator";
import Friends from "@/components/friends/Friends";
import Mine from "@/components/mine/Mine";
import { useGlobal } from "@/context/global_context/GlobalContext";

export default function Home() {
  const { currentLocation, isOpenCipherPrice } = useGlobal();
  return (
    <main className="min-h-screen pt-3">
      {currentLocation === "dashboard" && <Dashboard />}
      {currentLocation === "boost" && <Boost />}
      {currentLocation === "mine" && <Mine />}
      {currentLocation === "friends" && <Friends />}
      {currentLocation === "earn" && <Earn />}
      <FootNavigator />
      <Exchange />
      <DailyReward />
      <ConfirmChangeExchange />
      <ProgressAvater />
      {isOpenCipherPrice && <CollectCipherReward />}
    </main>
  );
}
