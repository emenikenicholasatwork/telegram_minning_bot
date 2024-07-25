"use client";
import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import React, { useState } from "react";
import { GiMiner, GiTwoCoins } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const FootNavigator = () => {
  const [activeNav, setActiveNav] = useState("exchange");
  const { changeCurrentLocation } = useGlobal();
  return (
    <div className="w-full fixed bottom-0 h-24 px-5 py-2">
      <div className="bg-slate-800 flex flex-row gap-3 items-center p-3 h-20 w-full justify-between rounded-2xl">
        <div
          className={`flex flex-col items-center flex-1 duration-200 ${
            activeNav === "exchange"
              ? "text-white bg-slate-950"
              : "text-slate-400"
          }   py-2 rounded-xl px-3`}
          onClick={() => {
            setActiveNav("exchange");
            changeCurrentLocation("dashboard");
          }}
        >
          <Image
            className="w-9 h-9"
            src={"/images/binance.png"}
            width={100}
            height={100}
            alt="binance icon"
          />
          <p className="text-sm">Exchange</p>
        </div>
        <div
          className={`flex flex-col items-center flex-1 duration-200 ${
            activeNav === "mine" ? "text-white bg-slate-950" : "text-slate-400"
          }   py-2 rounded-xl px-3`}
          onClick={() => {
            setActiveNav("mine");
            changeCurrentLocation("mine");
          }}
        >
          <GiMiner className="w-9 h-9" />
          <p className="text-sm">Mine</p>
        </div>
        <div
          className={`flex flex-col items-center flex-1 duration-200 ${
            activeNav === "friends"
              ? "text-white bg-slate-950"
              : "text-slate-400"
          }   py-2 rounded-xl px-3`}
          onClick={() => {
            setActiveNav("friends");
            changeCurrentLocation("friends");
          }}
        >
          <IoIosPeople className="w-9 h-9" />
          <p className="text-sm">Friends</p>
        </div>
        <div
          className={`flex flex-col items-center flex-1 duration-200 ${
            activeNav === "earn" ? "text-white bg-slate-950" : "text-slate-400"
          }   py-2 rounded-xl px-3`}
          onClick={() => setActiveNav("earn")}
        >
          <GiTwoCoins className="w-9 h-9" />
          <p className="text-sm">Earn</p>
        </div>
      </div>
    </div>
  );
};

export default FootNavigator;
