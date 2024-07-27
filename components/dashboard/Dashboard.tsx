"use client";
import { useGlobal } from "@/context/global_context/GlobalContext";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import UserTopProgress from "../user_progress/UserTopProgress";

const Dashboard: React.FC = () => {
  const coinRef = useRef<HTMLDivElement>(null);

  const {
    isDailyRewardCollected,
    isDailyCodeCompleted,
    isDailyComboCompleted,
    changeCurrentLocation,
    formattedBalance,
    addToCurrentBalance,
    activateTurbo,
    perTap,
    tapLeft,
    tapLimit,
    reduceTapLeft,
  } = useGlobal();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const userTap = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (tapLeft < perTap) return;
    reduceTapLeft(perTap);
    addToCurrentBalance(perTap);
    const number = document.createElement("div");
    number.textContent = `+${perTap}`;
    number.className = "absolute text-5xl font-bold text-white animation-move";
    const tapImage = document.getElementById("tap_image");
    tapImage?.classList.add("scale-105");
    document.getElementById("coin_div")?.appendChild(number);
    const clickX = event?.clientX;
    const clickY = event?.clientY;
    number.style.left = `${clickX}px`;
    number.style.top = `${clickY}px`;
    setTimeout(() => {
      tapImage?.classList.remove("scale-105");
    }, 100);
    if (coinRef.current) {
      number.style.setProperty("--delta-x", `${-10}px`);
      number.style.setProperty("--delta-y", `${-200}px`);
      number.addEventListener("animationend", () => {
        number.remove();
      });
    }
  };
  return (
    <div>
      <p className="ps-2 font-bold">Nicholas Emenike (CEO)</p>
      <div className="flex flex-col gap-10">
        <UserTopProgress />
        <div className="h-full w-full rounded-t-3xl shadow-top-green">
          <div className="flex flex-col gap-8 pt-5">
            <div className="flex flex-row justify-between px-5 gap-2">
              <div
                className={`flex flex-col items-center relative bg-slate-900 pt-3  ${
                  isDailyRewardCollected
                    ? "shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px]"
                    : ""
                }  rounded-md px-2 py-1 gap-3 w-full`}
              >
                {isDailyRewardCollected ? (
                  <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full absolute right-1 top-2 bg-red-500 transition-opacity duration-300 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    className="w-10"
                    src={"/images/daily_reward.png"}
                    height={100}
                    width={100}
                    alt="daily reward image"
                  />
                  <p className="text-sm font-bold">Daily Reward</p>
                </div>
                <p className=" text-sm ">31:44</p>
              </div>
              <div
                className={`flex flex-col items-center relative bg-slate-900 pt-3 ${
                  isDailyComboCompleted
                    ? "shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px]"
                    : ""
                } rounded-md px-2 py-1 gap-3 w-full`}
              >
                {isDailyComboCompleted ? (
                  <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full absolute right-1 top-2 bg-red-500 transition-opacity duration-300 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    className="w-10"
                    src={"/images/daily_combo.png"}
                    height={100}
                    width={100}
                    alt="daily reward image"
                  />
                  <p className="text-sm font-bold">Daily Combo</p>
                </div>
                <p className=" text-sm ">31:44</p>
              </div>
              <div
                className={`flex flex-col items-center relative bg-slate-900 pt-3${
                  isDailyCodeCompleted
                    ? "shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px]"
                    : ""
                } rounded-md px-2 py-1 gap-3 w-full`}
              >
                {isDailyCodeCompleted ? (
                  <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full absolute right-1 top-2 bg-red-500 transition-opacity duration-300 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    className="w-10"
                    src={"/images/daily_code.png"}
                    height={100}
                    width={100}
                    alt="daily reward image"
                  />
                  <p className="text-sm font-bold">Daily Code</p>
                </div>
                <p className=" text-sm ">31:44</p>
              </div>
            </div>
            <div
              className="w-full flex flex-col items-center gap-2"
              id="coin_div"
            >
              <div className="w-full flex flex-col items-center gap-14">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    id="total_coin_icon"
                    className="w-10 h-10"
                    src={"/images/quick_coin.png"}
                    width={100}
                    height={100}
                    alt="quick coin icon"
                  />
                  <p className="text-3xl font-bold">{formattedBalance}</p>
                </div>
                <div
                  ref={coinRef}
                  onClick={(e) => (tapLeft > perTap ? userTap(e) : "")}
                >
                  <Image
                    id="tap_image"
                    className={`w-72 h-72 duration-200 ${
                      tapLeft > perTap ? "" : "filter saturate-50"
                    } ${activateTurbo ? "filter invert " : ""}`}
                    src={"/images/quick_coin.png"}
                    width={500}
                    height={500}
                    alt="quick coin icon"
                  />
                </div>
              </div>
              <div className="flex flex-row w-full justify-between px-3">
                <div className="flex flex-row items-center gap-1">
                  <Image
                    className="w-8 h-8"
                    src={"/images/flash.png"}
                    height={100}
                    width={100}
                    alt="flash icon"
                  />
                  <p className="font-bold text-lg">
                    {tapLeft} / {tapLimit}
                  </p>
                </div>
                <div
                  className="flex flex-row items-center gap-2"
                  onClick={() => changeCurrentLocation("boost")}
                >
                  <Image
                    className="w-8 h-8"
                    src={"/images/boost.png"}
                    width={100}
                    height={100}
                    alt="boost icon"
                  />
                  <p className="font-bold text-lg">Boost</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
