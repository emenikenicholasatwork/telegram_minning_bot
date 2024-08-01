"use client";
import { useGlobal } from "@/context/GlobalContext";
import Image from "next/image";
import React, { useState } from "react";
import { GiMiner, GiTwoCoins } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

const FootNavigator = () => {
  const { changeCurrentLocation, currentLocation } = useGlobal();
  return (
    <div className="w-full bg-slate-800 fixed bottom-0 h-16 text-sm">
      <div className=" flex flex-row gap-3 items-center h-16 w-full justify-between px-2">
        <div className={`flex flex-col items-center duration-200 ${currentLocation === "dashboard" ? "text-white" : "text-slate-400"}`} onClick={() => {
          changeCurrentLocation("dashboard");
        }}
        >
          <Image
            className="w-8 h-8"
            src={"/images/exchange_images/binance.png"}
            width={100}
            height={100}
            alt="binance icon"
          />
          <p className="text-sm">Exchange</p>
        </div>
        <div
          className={`flex flex-col items-center duration-200 ${currentLocation === "mine"
            ? "text-white"
            : "text-slate-400"
            }`}
          onClick={() => {
            changeCurrentLocation("mine");
          }}
        >
          <GiMiner className="w-8 h-8" />
          <p className="text-sm">Mine</p>
        </div>
        <div
          className={`flex flex-col items-center duration-200 ${currentLocation === "friends"
            ? "text-white"
            : "text-slate-400"
            }`}
          onClick={() => {
            changeCurrentLocation("friends");
          }}
        >
          <IoIosPeople className="w-9 h-9" />
          <p className="text-sm">Friends</p>
        </div>
        <div
          className={`flex flex-col items-center duration-200 ${currentLocation === "earn"
            ? "text-white"
            : "text-slate-400"
            }`}
          onClick={() => {
            changeCurrentLocation("earn");
          }}
        >
          <GiTwoCoins className="w-9 h-9" />
          <p className="text-sm">Earn</p>
        </div>
      </div>
    </div>
  );
};

export default FootNavigator;
