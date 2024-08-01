import React from "react";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import days from ".././../data/daily_reward_data.json";
import { GiCancel } from "react-icons/gi";

const DailyReward = () => {
  const { changeCurrentLocation, currentLocation, formatNumber } = useGlobal();
  return (
    <div
      className={` duration-100 ${currentLocation === "daily_coin"
        ? "h-[90%] px-5 gap-5 pt-2 pb-5 overflow-auto "
        : "h-0 overflow-hidden"} fixed flex bottom-0 left-0 right-0 bg-black flex-col z-10  rounded-t-3xl  shadow-top-green items-center `}>
      <div className="relative w-full flex justify-end">
        <GiCancel
          className="fixed text-3xl text-gray-500"
          onClick={() => changeCurrentLocation("earn")}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image
          className="w-28 h-28 rounded-3xl"
          src={"/images/daily_coin.png"}
          width={500}
          height={500}
          alt="daily reward coin"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold text-2xl">Daily reward</p>
          <p className="text-center text-sm font-semibold">
            Accrue coins for logging into the game daily without skipping
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {days.map((day) => (
          <div key={day.id} className={`flex flex-col items-center bg-slate-800 border ${5 > day.id ? "border border-green-500" : ""} gap-2  p-3 rounded-xl`}>
            <p className="font-bold text-sm">{day.name}</p>
            <Image
              className="w-5 h-5"
              src={"/images/quick_coin.png"}
              width={100}
              height={100}
              alt="quick coin icon"
            />
            <p className="font-bold text-sm">{day.price}</p>
          </div>
        ))}
      </div>
      <button className="  p-5 bg-blue-600 text-lg w-full rounded-xl font-bold">
        Claim
      </button>
    </div>
  );
};

export default DailyReward;
