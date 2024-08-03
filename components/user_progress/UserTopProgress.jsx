import { useGlobal } from "@/app/GlobalContext";
import Image from "next/image";
import React from "react";
import { HiInformationCircle } from "react-icons/hi";
import exchange from "../../data/exchange_data.json";

const UserTopProgress = () => {
  const { changeCurrentLocation, formatNumber, mainUser } = useGlobal();
  const exch = exchange.find((ex) => 2 === ex.id);

  return (
    <div className="flex flex-row justify-between gap-5 px-2 mt-2">
      <div className="bg-slate-800 h-10 w-full flex flex-row items-center rounded-3xl flex-[1.5] px-3">
        <div
          className="flex flex-1 items-center justify-center"
          onClick={() => changeCurrentLocation("exchange")}
        >
          <img
            className="w-7 h-7"
            src={exch.image}
            width={100}
            height={100}
            alt={`${exch.name} icon`}
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
              + {formatNumber(44444)}
            </p>
            <HiInformationCircle className="text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTopProgress;
