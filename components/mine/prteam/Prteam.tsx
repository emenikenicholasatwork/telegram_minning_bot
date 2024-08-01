import React from "react";
import items from "../../../data/pr&team.json";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import { RiLock2Line } from "react-icons/ri";

const Prteam: React.FC = () => {
  const { formatNumber } = useGlobal();
  return items.map((item) => (
    <div
      key={item.id}
      className="bg-slate-800 relative rounded-md flex flex-col p-1 gap-3"
    >
      <div className="flex flex-row items-center px-1 gap-1">
        <Image
          className="w-14 h-14"
          src={item.image}
          width={100}
          height={100}
          alt={`${item.name} image`}
        />
        <div className="flex flex-col">
          <p className="font- text-sm">{item.name}</p>
        </div>
      </div>
      <div className="bg-slate-600 h-[1px] w-full"></div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-1">
          <Image
            className="w-3 h-3"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick icon"
          />

          <p className="font-bold text-sm">+{formatNumber(item.quick_per_hour)}</p>
        </div>
        <div className="h-full w-[1px] bg-slate-600"></div>
        <div className="flex flex-row items-center gap-2">
          <Image
            className="w-3 h-3"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick icon"
          />
          <p className="font-bold text-sm">{formatNumber(item.price)}</p>
        </div>
      </div>
    </div>
  ));
};

export default Prteam;
