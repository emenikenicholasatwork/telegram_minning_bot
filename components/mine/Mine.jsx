"use client";
import React, { useState } from "react";
import UserTopProgress from "../user_progress/UserTopProgress";
import Image from "next/image";
import { useGlobal } from "@/app/GlobalContext";
import Legal from "./legal/Legal";
import Prteam from "./prteam/Prteam";
import Markets from "./markets/Markets";
import Web3 from "./web3/Web3";

const Mine = () => {
  const { formattedBalance, mainUser } = useGlobal();
  const [activetab, setActivetab] = useState("prteam");
  return (
    <div className="flex flex-col gap-10 pb-20">
      <UserTopProgress />
      <div className="h-full w-full flex flex-col rounded-t-3xl shadow-top-green py-5 px-3 gap-8">
        <div className="flex flex-col gap-5">
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
            <p className="text-2xl font-bold">{formattedBalance(8000000)}</p>
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
