"use client";
import Boost from "@/components/boost/Boost";
import DailyReward from "@/components/daily_reward/DailyReward";
import Dashboard from "@/components/dashboard/Dashboard";
import Exchange from "@/components/dashboard/exchange/Exchange";
import Earn from "@/components/earn/Earn";
import FootNavigator from "@/components/foot_nav/FootNavigator";
import Friends from "@/components/friends/Friends";
import Mine from "@/components/mine/Mine";
import { useGlobal } from "@/app/GlobalContext";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function Home() {
  const { currentLocation, mainUser } = useGlobal();

  if (!mainUser?.exchangeId && !mainUser?.TapLimit) {
    return <div className='fixed flex bottom-0 left-0 right-0 top-0 items-center justify-center'>
      <Image className={`w-64 h-64 duration-200 spin`}
        src={'/images/quick_coin.png'}
        width={500}
        height={500}
        alt="quick coin icon"
      /></div>;
  }
  return (
    <main className="min-h-screen pt-3 pb-32 bg-black text-white">
      <Toaster />
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
