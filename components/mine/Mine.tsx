"use client";
import React, { useState } from "react";
import UserTopProgress from "../user_progress/UserTopProgress";
import { HiInformationCircle } from "react-icons/hi";
import Image from "next/image";
import { useGlobal } from "@/context/global_context/GlobalContext";
import Legal from "./legal/Legal";
import Prteam from "./prteam/Prteam";
import Markets from "./markets/Markets";
import Web3 from "./web3/Web3";
import { AiFillCheckCircle } from "react-icons/ai";

const Mine: React.FC = () => {
  const { dailyComboCollected, formattedBalance, isDailyComboCompleted } = useGlobal();
  const [activetab, setActivetab] = useState("prteam");
  return (
    <div className="flex flex-col gap-10 pb-20">
      <UserTopProgress />
      <div className="h-full w-full flex flex-col rounded-t-3xl shadow-top-green py-5 px-3 gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row w-full items-center justify-end px-3 gap-1 ">
            <p className="text-sm">13:14:21</p>
            <HiInformationCircle className="text-xl text-slate-400" />
          </div>
          <div className="flex flex-row items-center justify-between bg-slate-800 p-2 rounded-lg">
            <p className="font-bold text-sm">Daily Combo</p>
            <div className="flex flex-row items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${dailyComboCollected > 0 ? "bg-blue-400" : "bg-slate-400"
                  }`}
              ></div>
              <div
                className={`h-3 w-3 rounded-full ${dailyComboCollected > 1 ? "bg-blue-400" : "bg-slate-400"
                  }`}
              ></div>
              <div
                className={`h-3 w-3 rounded-full ${dailyComboCollected > 2 ? "bg-blue-400" : "bg-slate-400"
                  }`}
              ></div>
            </div>
            <div className="flex flex-row items-center gap-2 bg-slate-700 rounded-lg p-2">
              <Image
                className="w-5 h-5"
                src={"/images/quick_coin.png"}
                width={100}
                height={100}
                alt="quick coin icon"
              />
              <p className="font-bold text-sm">+10,000,000</p>
              {isDailyComboCompleted && (
                <AiFillCheckCircle className="text-xl text-green-500" />
              )}
            </div>
          </div>
          <div className="w-full px-2 flex flex-row justify-between items-center gap-3">
            <div className="shadow-purple-500 shadow-md p-2 rounded-lg">
              <Image
                className="w-20 h-30"
                src={"/images/mystery_block.png"}
                width={500}
                height={500}
                alt="mystery block icon"
              />
            </div>
            <div className="shadow-purple-500 shadow-md p-2 rounded-lg">
              <Image
                className="w-20 h-30"
                src={"/images/mystery_block.png"}
                width={500}
                height={500}
                alt="mystery block icon"
              />
            </div>
            <div className="shadow-purple-500 shadow-md p-2 rounded-lg">
              <Image
                className="w-20 h-30"
                src={"/images/mystery_block.png"}
                width={500}
                height={500}
                alt="mystery block icon"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-row items-center w-full justify-center gap-1">
            <Image
              className="w-7 h-7"
              src={"/images/quick_coin.png"}
              width={500}
              height={500}
              alt="quick coin icon"
            />
            <p className="text-2xl font-bold">{formattedBalance}</p>
          </div>
          <div className="w-full flex flex-row justify-between items-center bg-slate-800 h-16 px-1 rounded-lg">
            <div
              onClick={() => setActivetab("prteam")}
              className={`flex flex-1 items-center duration-75 text-sm ${activetab === "prteam" ? "text-white" : "text-slate-500"
                } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">PR&Team</p>
            </div>
            <div
              onClick={() => setActivetab("markets")}
              className={`flex flex-1 items-center duration-175 text-sm ${activetab === "markets" ? "text-white" : "text-slate-500"
                } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">Markets</p>
            </div>
            <div
              onClick={() => setActivetab("legals")}
              className={`flex flex-1 items-center duration-75 text-sm ${activetab === "legals" ? "text-white" : "text-slate-500"
                } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">Legal</p>
            </div>
            <div
              onClick={() => setActivetab("web3")}
              className={`flex flex-1 items-center duration-75 text-sm ${activetab === "web3" ? "text-white" : "text-slate-500"
                } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">Web3</p>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-2 p-1 gap-3">
            {activetab === "legals" && <Legal />}
            {activetab === "prteam" && <Prteam />}
            {activetab === "markets" && <Markets />}
            {activetab === "web3" && <Web3 />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mine;
