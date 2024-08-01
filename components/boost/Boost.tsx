import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import React from "react";

const Boost: React.FC = () => {
  const { formattedBalance } = useGlobal();
  return (
    <div className="flex flex-col items-center w-full h-full pt-5  gap-5">
      <div className="flex flex-col items-center gap-3">
        <p className="text-md">Your Balance</p>
        <div className="flex flex-row items-center gap-2">
          <Image
            className="w-8 h-8"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick coin icon"
          />
          <p className="font-bold text-2xl">{formattedBalance}</p>
        </div>
      </div>
      <div className="flex flex-col w-full px-2 gap-4">
        <p className="font-bold text-md">Free daily boosters</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center bg-slate-800 rounded-xl px-5 py-3 gap-3">
            <Image
              className="w-10 h-10"
              src={"/images/flash.png"}
              width={100}
              height={100}
              alt="flash icon"
            />
            <div>
              <p className="font-bold">Full energy</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-2 gap-4">
        <p className="font-bold text-md">Boosters</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center bg-slate-800 rounded-xl px-5 py-3 gap-3">
            <Image
              className="w-10 h-10"
              src={"/images/click.png"}
              width={100}
              height={100}
              alt="click icon"
            />
            <div>
              <p className="font-bold">Multitap</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-5 h-5"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="font-bold text-sm">512K &#183; 10 lvl</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center bg-slate-800 rounded-xl px-5 py-3 gap-3">
            <Image
              className="w-10 h-10"
              src={"/images/battery.png"}
              width={100}
              height={100}
              alt="battery icon"
            />
            <div>
              <p className="font-bold">Energy limit</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-5 h-5"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="font-bold text-sm">512K &#183; 10 lvl</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boost;
