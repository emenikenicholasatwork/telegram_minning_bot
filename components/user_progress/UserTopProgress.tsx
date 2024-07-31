import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";

const UserTopProgress: React.FC = () => {
  const { changeCurrentLocation, formatNumber, profitPerHour, toggleProgressPage } = useGlobal();
  return (
    <div className="flex flex-row justify-between gap-5 px-2 mt-2">
      <div className="w-full font-bold flex flex-col gap-1 flex-1 text-xs" onClick={toggleProgressPage}>
        <p>
          Brooze &gt; <span className="text-slate-400">1/10</span>
        </p>
        <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-600 rounded-lg overflow-hidden">
          <div className="h-2 bg-indigo-500" style={{ width: "29%" }}></div>
        </div>
      </div>
      <div className="bg-slate-800 h-10 w-full flex flex-row items-center rounded-3xl flex-[1.5] px-3">
        <div
          className="flex flex-1 items-center justify-center"
          onClick={() => changeCurrentLocation("exchange")}
        >
          <Image
            className="w-7 h-7"
            src={"/images/exchange_images/binance.png"}
            width={100}
            height={100}
            alt="binance icon"
          />
        </div>
        <div className="h-6 w-[1px] bg-slate-600"></div>
        <div className="flex flex-[2] items-center flex-col">
          <p className="text-[10px]">Quick per hour</p>
          <div className="flex flex-row items-center gap-2">
            <Image
              className="w-4 h-4"
              src={"/images/quick_coin.png"}
              width={100}
              height={100}
              alt="quick coin icon"
            />
            <p className="font-bold text-[13px]">
              + {formatNumber(profitPerHour)}
            </p>
            <HiInformationCircle className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTopProgress;
