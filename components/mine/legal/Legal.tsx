import React from "react";
import items from "../../../data/legal_items.json";
import Image from "next/image";
import { useGlobal } from "@/context/global_context/GlobalContext";
import { RiLock2Line } from "react-icons/ri";

const Legal: React.FC = () => {
  const { formatNumber } = useGlobal();
  return items.map((item) => (
    <div
      key={item.id}
      className="bg-slate-800 rounded-xl relative flex flex-col py-2 gap-3"
    >
      {item.condition && (
        <div className=" bottom-0 left-0 right-0 top-0 absolute h-full items-center  justify-center flex-col gap-3 flex bg-blurBackgroud rounded-xl px-5">
          <RiLock2Line className="w-16 h-16" />
          <p className="font-bold text-lg">{item.condition}</p>
        </div>
      )}
      <div className="flex flex-row items-center px-2 gap-2">
        <Image
          className="w-16 h-16"
          src={item.image}
          width={100}
          height={100}
          alt={`${item.name} image`}
        />
        <div className="flex flex-col">
          <p className="font-semibold text-sm">{item.name}</p>
          <div className="flex flex-col">
            <p className="text-slate-400 text-sm">Quick per hour</p>
            <div className="flex flex-row items-center gap-1">
              <Image
                className="w-5 h-5"
                src={"/images/quick_coin.png"}
                width={100}
                height={100}
                alt="quick icon"
              />
              <p className="font-bold">+{formatNumber(item.quick_per_hour)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-600 h-[1px] w-full"></div>
      <div className="flex flex-row items-center px-2 gap-2">
        <p className="flex flex-1">lvl 0</p>
        <div className="h-full w-[1px] bg-slate-600"></div>
        <div className="flex flex-row items-center flex-[3] gap-2">
          <Image
            className="w-7 h-7"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick icon"
          />
          <p className="font-bold">{formatNumber(item.price)}</p>
        </div>
      </div>
    </div>
  ));
};

export default Legal;
