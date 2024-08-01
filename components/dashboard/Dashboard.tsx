'use client';
import { useGlobal } from '@/context/global_context/GlobalContext';
import Image from 'next/image';
import React, { useState } from 'react';
import UserTopProgress from '../user_progress/UserTopProgress';

const Dashboard: React.FC = () => {
  const {
    changeCurrentLocation,
    formattedBalance,
    addToCurrentBalance,
    perTap,
    tapLeft,
    tapLimit,
  } = useGlobal();

  function user_clicks() {
    if (tapLeft < perTap) {
      return;
    } else {
      addToCurrentBalance(perTap);
    }
  }


  return (
    <div className="">
      <p className="ps-2 font-bold">Nicholas Emenike (CEO)</p>
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
                <p className="text-2xl font-bold">{formattedBalance}</p>
              </div>
              <div>
                <Image id="tap_image" className={`w-64 h-64 duration-200 ${tapLeft > perTap ? '' : 'filter saturate-50'}`}
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
                  {tapLeft} / {tapLimit}
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
