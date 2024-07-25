"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const TapArea: React.FC = () => {
  const coinRef = useRef<HTMLDivElement>(null);
  const [tap, setTap] = useState(false);
  const userTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const number = document.createElement("div");
    number.textContent = "+17";
    number.className =
      "absolute text-5xl font-bold text-slate-300 animation-move";
    // document.appendChild(number);
    document.getElementById("tap_image")?.classList.add("scale-105");
    const total_coin = document.getElementById("total_coin_icon");
    document.getElementById("coin_div")?.appendChild(number);
    const clickX = event.clientX;
    const clickY = event.clientY;
    number.style.left = `${clickX}px`;
    number.style.top = `${clickY}px`;
    document.getElementById("tap_image")?.classList.remove("scale-105");
    if (coinRef.current && total_coin) {
      const coinRect = coinRef.current.getBoundingClientRect();
      const coinX = coinRect.left + coinRect.width / 2;
      const coinY = coinRect.top;
      const deltaX =
        total_coin.clientLeft + total_coin.clientWidth / 2 - clickX;
      const deltaY = total_coin.clientTop - clickY;
      number.style.setProperty("--delta-x", `${deltaX}px`);
      number.style.setProperty("--delta-y", `${deltaY}px`);
      number.addEventListener("animationend", () => {
        number.remove();
      });
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-2" id="coin_div">
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
          <p className="text-3xl font-bold">3,777,000</p>
        </div>
        <div ref={coinRef} onClick={userTap}>
          <Image
            id="tap_image"
            className="w-72 h-72 duration-100 ease-in-out"
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
            <span>510</span> / 9000
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
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
  );
};

export default TapArea;
