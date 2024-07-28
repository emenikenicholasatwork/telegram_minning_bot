import React from "react";
import Image from "next/image";
import { useGlobal } from "@/context/global_context/GlobalContext";
import { GiCancel } from "react-icons/gi";
import { FaHeart } from "react-icons/fa6";

const CollectCipherReward = () => {
  const { isOpenCipherPrice, toggleCipherTakePrice } = useGlobal();
  return (
    <div
      className={`h-full gap-32 px-5 pt-20 pb-20 fixed flex bottom-0 left-0 right-0 bg-blurBackgroud flex-col z-10 items-center `}
    >
      <p>Daily Cipher</p>
        <div className=" flex flex-col gap-5 items-center">
          <div>
            <Image className="h-56 w-56" src={"/images/salary.png"} width={500} height={100} alt="salary image"/>
          </div>
          <div className="font-semibold flex flex-col gap-">
            <p>The Code is Cracked.</p>
            <p>You are a real dectective</p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center p-5 rounded-xl gap-2 bg-blue-600 w-full ">
          <p className="font-semibold">Take the price</p>
          <FaHeart className="text-white"/>
        </div>
    </div>
  );
};

export default CollectCipherReward;
