'use client';
import { useGlobal } from '@/context/GlobalContext';
import Image from 'next/image';
import React from 'react';
import UserTopProgress from '../user_progress/UserTopProgress';
import { useTelegram } from '@/context/TelegramContext';

const Dashboard: React.FC = () => {
  const {
    changeCurrentLocation,
    formatNumber,
    addToCurrentBalance,
    tapLeft,
    reduceTapLeft,
    mainUser
  } = useGlobal();
  const { user } = useTelegram();
  function user_clicks() {
    if (tapLeft < mainUser.perTap) {
      return;
    } else {
      const tap_image = document.getElementById("tap_image");
      tap_image?.classList.add("scale-110");
      addToCurrentBalance(mainUser.perTap);
      reduceTapLeft(mainUser.perTap);
      setTimeout(() => {
        tap_image?.classList.remove("scale-110");
      }, 100);
    }
  }


  return (
    <div className="">
      <p className="ps-2 font-bold">{user?.username} (CEO)</p>
      <div className="flex flex-col gap-10">
        <UserTopProgress />
        <div className="h-full w-full rounded-t-3xl shadow-top-green pt-5">
          <div className="w-full flex flex-col items-center gap-10" id="coin_div">
            <div
              className={`w-full flex flex-col items-center gap-10 '
                  }`}
            >
              <div className="flex flex-row items-center gap-2">
                <Image
                  id="total_coin_icon"
                  className="w-7 h-7"
                  src={'/images/quick_coin.png'}
                  width={100}
                  height={100}
                  alt="quick coin icon"
                />
                <p className="text-2xl font-bold">{formatNumber(mainUser.balance)}</p>
              </div>
              <div>
                <Image id="tap_image" className={`w-64 h-64 duration-200 ${tapLeft > mainUser.perTap ? '' : 'filter saturate-50'}`}
                  src={'/images/quick_coin.png'}
                  width={500}
                  height={500}
                  alt="quick coin icon"
                  onClick={user_clicks}
                />
              </div>
            </div>
            <div className="flex flex-row w-full justify-between px-2">
              <div className="flex flex-row items-center">
                <Image
                  className="w-7 h-7"
                  src={'/images/flash.png'}
                  height={100}
                  width={100}
                  alt="flash icon"
                />
                <p className="font-bold">
                  {tapLeft} / {mainUser.TapLimit}
                </p>
              </div>
              <div
                className="flex flex-row items-center"
                onClick={() => changeCurrentLocation('boost')}
              >
                <Image
                  className="w-7 h-7"
                  src={'/images/boost.png'}
                  width={100}
                  height={100}
                  alt="boost icon"
                />
                <p className="font-bold">Boost</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
