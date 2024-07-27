import React from "react";
import Image from "next/image";
import { useGlobal } from "@/context/global_context/GlobalContext";
import days from ".././../data/daily_reward_data.json";
import { GiCancel } from "react-icons/gi";

const DailyReward = () => {
  const { changeCurrentLocation, currentLocation, formatNumber } = useGlobal();
  return (
    <div
      className={` duration-300 ${
        currentLocation === "daily_coin"
          ? "h-[90%] px-5 gap-2 pt-2 pb-20 "
          : "h-0 overflow-hidden"
      } fixed flex bottom-0 left-0 right-0 bg-black flex-col z-10  rounded-t-3xl  shadow-top-green items-center `}
    >
      <div className="relative w-full flex justify-end">
        <GiCancel
          className="absolute text-3xl text-gray-500"
          onClick={() => changeCurrentLocation("earn")}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image
          className="w-32 h-32 rounded-3xl"
          src={"/images/daily_coin.png"}
          width={500}
          height={500}
          alt="daily reward coin"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold text-4xl">Daily reward</p>
          <p className="text-center font-semibold">
            Accrue coins for logging into the game daily without skipping
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {days.map((day) => (
          <div
            key={day.id}
            className="flex flex-col items-center bg-slate-800 gap-2  p-3 rounded-xl"
          >
            <p className="font-bold">{day.name}</p>
            <Image
              className="w-8 h-8"
              src={"/images/quick_coin.png"}
              width={100}
              height={100}
              alt="quick coin icon"
            />
            <p className="font-bold">{day.price}</p>
          </div>
        ))}
      </div>
      <div className="w-full absolute bottom-5 px-2">
        <button className="  p-5 bg-blue-600 text-lg w-full rounded-xl font-bold">
          Claim
        </button>
      </div>
    </div>
  );
};

export default DailyReward;
