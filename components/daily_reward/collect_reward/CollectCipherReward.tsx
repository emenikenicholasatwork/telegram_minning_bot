import React from "react";
import Image from "next/image";
import { useGlobal } from "@/context/global_context/GlobalContext";
import { FaHeart } from "react-icons/fa6";

const CollectCipherReward = () => {
  const {  toggleCipherTakePrice } = useGlobal();
  return (
    <div className={`h-full gap-16 px-5 pt-20 pb-20 fixed flex bottom-0 left-0 right-0 bg-blurBackgroud flex-col z-10 items-center `}>
      <p className="font-bold text-lg">Daily Cipher</p>
        <div className=" flex flex-col gap-5 items-center w-full">
          <div className="">
            <Image className="h-56 w-56" src={"/images/goodjob.png"} width={500} height={100} alt="salary image"/>
          </div>
          <div className="font-semibold flex flex-col gap-">
            <p>The Code is Cracked.</p>
            <p>You are a real dectective</p>
          </div>
        </div>
        <div className="font-bold flex flex-row items-center gap-2">
          <Image className="w-7 h-7" src={"/images/quick_coin.png"} width={100} height={100} alt="quick coin icon"/>
          <p className="text-xl">5,000,000</p>
        </div>
        <div className="flex flex-row items-center justify-center p-5 rounded-xl gap-2 bg-blue-600 w-full " onClick={toggleCipherTakePrice}>
          <p className="font-semibold">Take the price</p>
          <FaHeart className="text-white"/>
        </div>
    </div>
  );
};

export default CollectCipherReward;
