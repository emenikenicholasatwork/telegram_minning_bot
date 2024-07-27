import React from "react";
import exchange from "../../../data/exchange_data.json";
import Image from "next/image";
import { RiArrowRightSLine } from "react-icons/ri";
import { useGlobal } from "@/context/global_context/GlobalContext";
const Exchange = () => {
  const { currentLocation, changeCurrentLocation } = useGlobal();
  return (
    <div
      onClick={() => changeCurrentLocation("dashboard")}
      className={` absolute flex bottom-0 left-0 right-0 bg-black flex-col duration-200 z-10 ${
        currentLocation === "exchange" ? "h-full pb-28 pt-16" : "h-0"
      } overflow-hidden items-center gap-10`}
    >
      <p className="font-bold text-2xl">Choose exchange</p>
      <div className="w-full h-full flex flex-col gap-2 px-3">
        {exchange.map((exch) => (
          <div
            key={exch.id}
            className="bg-slate-600 rounded-3xl p-3 flex flex-row items-center justify-between"
          >
            <div className="flex flex-row items-center gap-5">
              <Image
                className="w-16 h-16"
                src={exch.image}
                width={100}
                height={100}
                alt={`${exch.name} icon`}
              />
              <p className="font-bold text-xl">{exch.name}</p>
            </div>
            <RiArrowRightSLine className="text-3xl" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Exchange;
