import React, { useState } from "react";
import Image from "next/image";
import { BiCopyAlt, BiUserCircle } from "react-icons/bi";
import { FaArrowsRotate } from "react-icons/fa6";

const Friends = () => {
  const [refreshFriends, setRefreshFriends] = useState(false);
  const handleRefrieshFresh = () => {
    setRefreshFriends(true);
    setTimeout(() => {
      setRefreshFriends(false);
    }, 2000);
  };
  return (
    <div className="w-full h-full flex flex-col items-center pt-10 gap-5">
      <p className="font-bold text-4xl">Invite friends!</p>
      <p className="text-lg">You and your friend will receive bonuses</p>
      <div className="w-full px-4 flex flex-col gap-10">
        <div className="flex flex-row items-center gap-5 p-3 bg-slate-800 w-full rounded-3xl relative">
          <Image
            className="w-16 h-16"
            src={"/images/gift.png"}
            width={100}
            height={100}
            alt="youtube icon"
          />
          <div className="flex flex-col justify-center">
            <p className="font-bold text-md">Invite a friend</p>
            <div className="flex flex-row items-center gap-2">
              <Image
                className="w-8 h-8"
                src={"/images/quick_coin.png"}
                width={100}
                height={100}
                alt="quick coin icon"
              />
              <p className=" text-md">
                <span className="font-bold">+5,000</span> for you and your
                friend
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 ">
          <div className="flex flex-row items-center justify-between font-bold text-lg w-full">
            <p>List of your friends</p>
            <FaArrowsRotate
              onClick={handleRefrieshFresh}
              className={`${refreshFriends ? "rotating-icon" : ""}`}
            />
          </div>
          <div className="bg-slate-800 p-8 flex items-center justify-center rounded-3xl">
            <p className="font-bold text-xl text-slate-500">
              You haven{"'"}t invited anyone yet
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center w-full px-4 gap-3 fixed bottom-28">
        <div className="flex flex-row items-center bg-indigo-600 w-full p-5 rounded-2xl justify-center breathing-button gap-2 font-bold text-2xl">
          <p>Invite a friend</p>
          <BiUserCircle />
        </div>
        <div className="p-3 bg-indigo-600 text-5xl font-bold rounded-2xl">
          <BiCopyAlt />
        </div>
      </div>
    </div>
  );
};

export default Friends;
