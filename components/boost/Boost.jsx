import { db } from "@/config/firebaseConfig";
import { useGlobal } from "@/app/GlobalContext";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const Boost = () => {
  const { formattedBalance, formatNumber, mainUser, userBalance, updateUser, fullEnergy, changeCurrentLocation } = useGlobal();
  const userDoc = doc(db, "users", mainUser.id.toString());

  async function buyEnergyLimitBoost() {
    if (mainUser.energyLimit.price > mainUser.balance) {
      toast.error("Insufficient balance");
      return;
    } else {
      try {
        const upgradeLimitToast = toast.loading("upgrading limit");
        await updateDoc(userDoc, {
          energyLimit: {
            level: mainUser.energyLimit.level + 1,
            price: mainUser.energyLimit.price * 2,
          },
          TapLimit: mainUser.TapLimit + 500,
          balance: (mainUser.balance + (userBalance - mainUser.balance)) - mainUser.energyLimit.price,
        });
        toast.success("Successfully upgraded limit", {
          id: upgradeLimitToast
        });
        changeCurrentLocation("dashboard");
        updateUser();
      } catch (err) {
        toast.error("Error while upgrading energy limit");
      }
    }
  }

  async function buyMultitap() {
    if (mainUser.multitap.price > mainUser.balance) {
      toast.error("Insufficient balance");
      return;
    } else {
      try {
        const upgradeMultitapToast = toast.loading("upgrading multitap");
        await updateDoc(userDoc, {
          multitap: {
            level: mainUser.multitap.level + 1,
            price: mainUser.multitap.price * 2,
          },
          perTap: mainUser.perTap + 1,
          balance: (mainUser.balance + (userBalance - mainUser.balance)) - mainUser.multitap.price
        });
        toast.success("Successfully upgraded multitap", {
          id: upgradeMultitapToast
        });
        changeCurrentLocation("dashboard");
        updateUser();
      } catch (err) {
        toast.error("Error while upgrading multitap",);
      }
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-full pt-5  gap-5">
      <div className="flex flex-col items-center gap-3">
        <p className="text-md">Your Balance</p>
        <div className="flex flex-row items-center gap-2">
          <Image
            className="w-8 h-8"
            src={"/images/quick_coin.png"}
            width={100}
            height={100}
            alt="quick coin icon"
          />
          <p className="font-bold text-2xl">{formattedBalance(mainUser.balance)}</p>
        </div>
      </div>
      <div className="flex flex-col w-full px-2 gap-4">
        <p className="font-bold text-md">Free daily boosters</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center bg-slate-800 rounded-xl px-5 py-3 gap-3" onClick={fullEnergy}>
            <Image
              className="w-10 h-10"
              src={"/images/flash.png"}
              width={100}
              height={100}
              alt="flash icon"
            />
            <div>
              <p className="font-bold">Full energy</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full px-2 gap-4">
        <p className="font-bold text-md">Boosters</p>
        <div className="flex flex-col gap-2">
          <div
            onClick={buyMultitap}
            className="flex flex-row items-center bg-slate-800 rounded-xl px-5 py-3 gap-3"
          >
            <Image
              className="w-10 h-10"
              src={"/images/click.png"}
              width={100}
              height={100}
              alt="click icon"
            />
            <div>
              <p className="font-bold">Multitap</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-5 h-5"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="font-bold text-sm">
                  {formatNumber(mainUser.multitap.price)} &#183; {mainUser.multitap.level} lvl
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={buyEnergyLimitBoost}
            className="flex flex-row items-center bg-slate-800 rounded-xl px-5 py-3 gap-3"
          >
            <Image
              className="w-10 h-10"
              src={"/images/battery.png"}
              width={100}
              height={100}
              alt="battery icon"
            />
            <div>
              <p className="font-bold">Energy limit</p>
              <div className="flex flex-row items-center gap-2">
                <Image
                  className="w-5 h-5"
                  src={"/images/quick_coin.png"}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="font-bold text-sm">
                  {formatNumber(mainUser.energyLimit.price)} &#183; {mainUser.energyLimit.level} lvl
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boost;
