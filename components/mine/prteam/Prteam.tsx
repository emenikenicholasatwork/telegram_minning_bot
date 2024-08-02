import React from "react";
import items from "../../../data/pr&team.json";
import Image from "next/image";
import { useGlobal } from "@/context/GlobalContext";
import { RiLock2Line } from "react-icons/ri";
import { db } from "@/config/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Prteam: React.FC = () => {
  const { formatNumber, mainUser, updateUser } = useGlobal();
  async function mine(itemId: number) {
    const item = items.find((itm) => itemId === itm.id);
    if (item) {
      if (item.price > mainUser.balance) {
        toast.error("Insufficient balance");
        return;
      } else {
        try {
          const userDoc = doc(db, "users", mainUser.id);
          await updateDoc(userDoc, { quickPerHour: mainUser.quickPerHour + item.quick_per_hour, balance: mainUser.balance - item.price });
          updateUser();
          toast.success("Successfully.");
        } catch (err) {
          toast.error("Error while minig");
        }
      }
    }
  }
  return items.map((item) => (
    <div
      key={item.id}
      onClick={() => mine(item.id)}
      className="bg-slate-800 relative rounded-md flex flex-col p-1 gap-3"
    >
      <div className="flex flex-row items-center px-1 gap-1">
        <Image
          className="w-14 h-14"
          src={item.image}
          width={100}
          height={100}
          alt={`${item.name} image`}
        />
        <div className="flex flex-col">
          <p className="font- text-sm">{item.name}</p>
        </div>
      </div>
      <div className="bg-slate-600 h-[1px] w-full"></div>
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-1">
          <Image
            className="w-3 h-3"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick icon"
          />

          <p className="font-bold text-sm">+{formatNumber(item.quick_per_hour)}</p>
        </div>
        <div className="h-full w-[1px] bg-slate-600"></div>
        <div className="flex flex-row items-center gap-2">
          <Image
            className="w-3 h-3"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick icon"
          />
          <p className="font-bold text-sm">{formatNumber(item.price)}</p>
        </div>
      </div>
    </div>
  ));
};

export default Prteam;
