import React, { useState } from "react";
import Image from "next/image";
import { BiUserCircle } from "react-icons/bi";
import { FaArrowsRotate } from "react-icons/fa6";
import toast from "react-hot-toast";

const Friends = () => {
  const [refreshFriends, setRefreshFriends] = useState(false);
  const handleRefrieshFresh = () => {
    setRefreshFriends(true);
    setTimeout(() => {
      setRefreshFriends(false);
    }, 2000);
  };

  function copyRefLink() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const ref = `https://t.me/nky16_bot?start=${userId}`;
    navigator.clipboard.writeText(ref).then(() => {
      toast.success("copied.");
    }).catch((err) => {
      toast.error("failed to copy.");
    });

  }

  return (
    <div className="w-full h-full flex flex-col items-center overflow-auto pb-20 pt-10 gap-5">
      <p className="font-bold text-2xl">Invite friends!</p>
      <p className="text-sm">You and your friend will receive bonuses</p>
      <div className="w-full px-4 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-xl relative">
            <Image
              className="w-8 h-8"
              src={"/images/gift.png"}
              width={100}
              height={100}
              alt="youtube icon"
            />
            <div className="flex flex-col justify-center">
              <p className="font-bold text-sm">Invite a friend</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-5 h-5"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className=" text-sm">
                  <span className="font-bold text-blue-600 text-sm">+5,000</span> for
                  you and your friend
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-xl relative">
            <Image
              className="w-8 h-8"
              src={"/images/gift.png"}
              width={100}
              height={100}
              alt="youtube icon"
            />
            <div className="flex flex-col justify-center">
              <p className="font-bold text-sm">
                Invite a friend with Telegram Premium
              </p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-5 h-5"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className=" text-sm">
                  <span className="font-bold text-blue-600 text-sm">+25,000</span> for
                  you and your friend
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 ">
          <div className="flex flex-row items-center justify-between font-bold text-md w-full">
            <p>List of your friends</p>
            <FaArrowsRotate
              onClick={handleRefrieshFresh}
              className={`${refreshFriends ? "rotating-icon" : ""}`}
            />
          </div>
          <div className="bg-slate-800 p-8 flex items-center justify-center rounded-xl">
            <p className="font-bold text-md text-slate-500">
              You haven{"'"}t invited anyone yet
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row fixed bottom-20 items-center bg-indigo-600 w-[95%] p-5 rounded-2xl justify-center breathing-button gap-2 font-bold text-xl" onClick={copyRefLink}>
        <p>Invite a friend</p>
        <BiUserCircle />
      </div>
    </div>
  );
};

export default Friends;
