"use client";
import React, { useState } from "react";
import UserTopProgress from "../user_progress/UserTopProgress";
import { HiInformationCircle } from "react-icons/hi";
import Image from "next/image";
import { useGlobal } from "@/context/global_context/GlobalContext";

const Mine: React.FC = () => {
  const { dailyCombo, formattedBalance } = useGlobal();
  const [activetab, setActivetab] = useState("pr&team");
  return (
    <div className="flex flex-col gap-10 pb-52">
      <UserTopProgress />
      <div className="h-full w-full flex flex-col rounded-t-3xl shadow-top-green py-5 px-3 gap-8">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row w-full items-center justify-end px-3 gap-1 ">
            <p>13:14:21</p>
            <HiInformationCircle className="text-xl text-slate-400" />
          </div>
          <div className="flex flex-row items-center justify-between bg-slate-800 p-3 rounded-lg">
            <p className="font-bold">Daily Combo</p>
            <div className="flex flex-row items-center gap-2">
              <div
                className={`h-4 w-4 rounded-full ${
                  dailyCombo > 0 ? "bg-blue-400" : "bg-slate-400"
                }`}
              ></div>
              <div
                className={`h-4 w-4 rounded-full ${
                  dailyCombo > 1 ? "bg-blue-400" : "bg-slate-400"
                }`}
              ></div>
              <div
                className={`h-4 w-4 rounded-full ${
                  dailyCombo > 2 ? "bg-blue-400" : "bg-slate-400"
                }`}
              ></div>
            </div>
            <div className="flex flex-row items-center gap-2 bg-emerald-500 rounded-lg p-2">
              <Image
                className="w-7 h-7"
                src={"/images/quick_coin.png"}
                width={100}
                height={100}
                alt="quick coin icon"
              />
              <p className="font-bold">+10,000,000</p>
            </div>
          </div>
          <div className="w-full px-2 flex flex-row justify-between items-center gap-3">
            <div className="shadow-purple-500 shadow-md p-2 rounded-lg">
              <Image
                className="w-28 h-36"
                src={"/images/mystery_block.png"}
                width={500}
                height={500}
                alt="mystery block icon"
              />
            </div>
            <div className="shadow-purple-500 shadow-md p-2 rounded-lg">
              <Image
                className="w-28 h-36"
                src={"/images/mystery_block.png"}
                width={500}
                height={500}
                alt="mystery block icon"
              />
            </div>
            <div className="shadow-purple-500 shadow-md p-2 rounded-lg">
              <Image
                className="w-28 h-36"
                src={"/images/mystery_block.png"}
                width={500}
                height={500}
                alt="mystery block icon"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-row items-center w-full justify-center gap-3">
            <Image
              className="w-14 h-14"
              src={"/images/quick_coin.png"}
              width={500}
              height={500}
              alt="quick coin icon"
            />
            <p className="text-4xl font-bold">{formattedBalance}</p>
          </div>
          <div className="w-full flex flex-row justify-between items-center bg-slate-800 h-16 px-1 rounded-lg">
            <div
              onClick={() => setActivetab("pr&team")}
              className={`flex flex-1 items-center duration-100 ${
                activetab === "pr&team" ? "bg-slate-950" : ""
              } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">PR&Team</p>
            </div>
            <div
              onClick={() => setActivetab("markets")}
              className={`flex flex-1 items-center duration-100 ${
                activetab === "markets" ? "bg-slate-950" : ""
              } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">Markets</p>
            </div>
            <div
              onClick={() => setActivetab("legals")}
              className={`flex flex-1 items-center duration-100 ${
                activetab === "legals" ? "bg-slate-950" : ""
              } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">Legal</p>
            </div>
            <div
              onClick={() => setActivetab("web3")}
              className={`flex flex-1 items-center duration-100 ${
                activetab === "web3" ? "bg-slate-950" : ""
              } py-4 px-2 rounded-lg`}
            >
              <p className="font-bold">Web3</p>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-2">
            <div className="bg-slate-800 rounded-xl flex flex-col py-2 gap-3">
              <div className="flex flex-row items-center px-2 gap-2">
                <Image
                  className="w-20 h-20"
                  src={"/images/item_images/ceo.png"}
                  width={100}
                  height={100}
                  alt="ceo image"
                />
                <div className="flex flex-col">
                  <p className="font-bold">CEO</p>
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
                      <p className="font-bold">+2,00k</p>
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
                  <p className="font-bold">8K</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mine;
