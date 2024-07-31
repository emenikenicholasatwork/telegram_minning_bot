import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { CgChevronRight } from "react-icons/cg";

const Earn: React.FC = () => {
  const { changeCurrentLocation, openConfirmChangeExchange, currentLocation } = useGlobal();
  return (
    <div className={`fixed bottom-0 top-0 right-0 duration-75 ${currentLocation === "earn" ? "left-0 overflow-auto" : "overflow-hidden left-full ease-in-out"} flex flex-col items-center pt-20 gap-10 pb-52`}>
      <Toaster />
      <div className="flex flex-col items-center gap-40">
        <div className="p-5 rounded-full shadow-round-blue-shadow3 overflow-hidden">
          <div className="p-5 rounded-full shadow-round-blue-shadow2 overflow-hidden">
            <Image
              className="w-40 h-40 shadow-round-blue-shadow1 rounded-full overflow-hidden"
              src={"/images/quick_coin.png"}
              width={500}
              height={500}
              alt="quick coin icon"
            />
          </div>
        </div>
        <p className="font-bold text-4xl">Earn More Coins</p>
      </div>
      <div className="flex flex-col w-full px-3 gap-10">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-2xl">Quick Youtube</p>
          <div className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative" onClick={() => toast.success("coming soon")}>
            <Image
              className="w-12 h-12"
              src={"/images/youtube.png"}
              width={100}
              height={100}
              alt="youtube icon"
            />
            <div className="flex flex-col items-center">
              <p className="font-bold text-md">Join the Channel</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-6 h-6"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="font-bold text-md">+100,000</p>
              </div>
            </div>
            <CgChevronRight className="absolute  text-5xl right-5 text-slate-400" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-bold text-2xl">Daily Tasks</p>
          <div
            onClick={() => changeCurrentLocation("daily_coin")}
            className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative"
          >
            <Image
              className="w-12 h-12"
              src={"/images/day.png"}
              width={100}
              height={100}
              alt="youtube icon"
            />
            <div className="flex flex-col items-center">
              <p className="font-bold text-md">Daily reward</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-6 h-6"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="font-bold text-md">+6,649,000</p>
              </div>
            </div>
            <CgChevronRight className="absolute  text-5xl right-5 text-slate-400" />
          </div>
          <div>
            <p className="font-bold ">Tasks List</p>
            <div className="flex flex-col items-center gap-2">
              <div
                onClick={() => toast.success("comming soon")}
                className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative"
              >
                <Image
                  className="w-12 h-12"
                  src={"/images/twitter.png"}
                  width={100}
                  height={100}
                  alt="youtube icon"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="font-bold text-md">Join the Twiiter Community</p>
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      className="w-6 h-6"
                      src={"/images/quick_coin.png"}
                      width={100}
                      height={100}
                      alt="quick coin icon"
                    />
                    <p className="font-bold text-md">+200,000</p>
                  </div>
                </div>
                <CgChevronRight className="absolute  text-5xl right-5 text-slate-400" />
              </div>
              <div
                onClick={() => toast.success("comming soon")}
                className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative"
              >
                <Image
                  className="w-12 h-12"
                  src={"/images/telegram.png"}
                  width={100}
                  height={100}
                  alt="youtube icon"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="font-bold text-md">Join the Telegram Community</p>
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      className="w-6 h-6"
                      src={"/images/quick_coin.png"}
                      width={100}
                      height={100}
                      alt="quick coin icon"
                    />
                    <p className="font-bold text-md">+200,000</p>
                  </div>
                </div>
                <CgChevronRight className="absolute  text-5xl right-5 text-slate-400" />
              </div>
              <div
                onClick={openConfirmChangeExchange}
                className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative"
              >
                <Image
                  className="w-12 h-12"
                  src={"/images/exchange.png"}
                  width={100}
                  height={100}
                  alt="youtube icon"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="font-bold text-md">Choose your exchange</p>
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      className="w-6 h-6"
                      src={"/images/quick_coin.png"}
                      width={100}
                      height={100}
                      alt="quick coin icon"
                    />
                    <p className="font-bold text-md">+200,000</p>
                  </div>
                </div>
                <CgChevronRight className="absolute  text-5xl right-5 text-slate-400" />
              </div>
              <div
                onClick={() => changeCurrentLocation("exchange")}
                className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative"
              >
                <Image
                  className="w-12 h-12"
                  src={"/images/three-friends.png"}
                  width={100}
                  height={100}
                  alt="youtube icon"
                />
                <div className="flex flex-col items-start justify-center">
                  <p className="font-bold text-md">Invite 2 friends</p>
                  <div className="flex flex-row items-center gap-3">
                    <Image
                      className="w-6 h-6"
                      src={"/images/quick_coin.png"}
                      width={100}
                      height={100}
                      alt="quick coin icon"
                    />
                    <p className="font-bold text-md">+200,000</p>
                  </div>
                </div>
                <CgChevronRight className="absolute  text-5xl right-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
