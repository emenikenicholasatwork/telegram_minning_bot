import React from "react";
import Image from "next/image";
import { useGlobal } from "@/app/GlobalContext";
import days from "../../data/daily_reward_data.json";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

const DailyReward = () => {
  const { changeCurrentLocation, currentLocation, updateUser, mainUser, userBalance } = useGlobal();
  async function claim_daily_reward() {
    const timeDuration = Date.now() - mainUser.DailyReward.time;
    if (timeDuration >= 86400000) {
      const dayPrice = days.find(dy => mainUser.DailyReward.day + 1 === dy.id);
      try {
        const claimingRewardToast = toast.loading("claiming reward");
        const userDoc = doc(db, "users", mainUser.id.toString());
        const balance = userBalance - mainUser?.balance;
        const originalBalance = balance + dayPrice + userBalance;
        if (mainUser.DailyReward.day = 10) {
          await updateDoc(userDoc, { DailyReward: { day: 1, time: Date.now() }, balance: originalBalance });
        } else {
          await updateDoc(userDoc, { DailyReward: { day: mainUser.DailyReward.day + 1, time: Date.now() }, balance: originalBalance });
        }
        updateUser();
        toast.success("Successfully claimed reward.", {
          id: claimingRewardToast
        });
        changeCurrentLocation("earn");
      } catch (error) {
        toast.remove();
        toast.error("Error while claiming reward");
      }
    } else {
      const timeLeft = 86400000 - timeDuration;
      const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
      const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
      const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
      toast.error(`come back in the next ${hoursLeft}:${minutesLeft}:${secondsLeft}`);
    }
  }
  return (
    <div
      className={` duration-100 ${currentLocation === "daily_coin"
        ? "h-[90%] px-5 gap-5 pt-2 pb-5 overflow-auto "
        : "h-0 overflow-hidden"} fixed flex bottom-0 left-0 right-0 bg-black flex-col z-10  rounded-t-3xl  shadow-top-green items-center `}>
      <div className="relative w-full flex justify-end">
        <GiCancel
          className="fixed text-3xl text-gray-500"
          onClick={() => changeCurrentLocation("earn")}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <Image
          className="w-28 h-28 rounded-3xl"
          src={"/images/daily_coin.png"}
          width={500}
          height={500}
          alt="daily reward coin"
        />
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold text-2xl">Daily reward</p>
          <p className="text-center text-sm font-semibold">
            Accrue coins for logging into the game daily without skipping
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {days.map((day) => (
          <div key={day.id} className={`flex flex-col items-center bg-slate-800 border ${mainUser?.DailyReward.day >= day.id ? "border border-green-500" : ""} gap-2  p-3 rounded-xl`}>
            <p className="font-bold text-sm">{day.name}</p>
            <Image
              className="w-5 h-5"
              src={"/images/quick_coin.png"}
              width={100}
              height={100}
              alt="quick coin icon"
            />
            <p className="font-bold text-sm">{day.price}</p>
          </div>
        ))}
      </div>
      <button onClick={claim_daily_reward} className="p-5 bg-blue-600 text-lg w-full rounded-xl font-bold">
        Claim
      </button>
    </div>
  );
};

export default DailyReward;
