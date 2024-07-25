import Image from "next/image";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";

const HomeTopMode: React.FC = () => {
  return (
    <div className="flex flex-row justify-between px-5 gap-2">
      <div className="flex flex-col items-center relative bg-slate-900 pt-3 shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px] rounded-md px-2 py-1 gap-3 w-full">
        <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
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
      <div className="flex flex-col items-center relative bg-slate-900 pt-3 shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px] rounded-md px-2 py-1 gap-3 w-full">
        <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
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
      <div className="flex flex-col items-center relative bg-slate-900 pt-3 shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px] rounded-md px-2 py-1 gap-3 w-full">
        <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
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
  );
};

export default HomeTopMode;
