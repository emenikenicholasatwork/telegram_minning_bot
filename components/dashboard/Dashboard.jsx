'use client';
import { useGlobal } from '@/app/GlobalContext';
import Image from 'next/image';
import React, { useState } from 'react';
import UserTopProgress from '../user_progress/UserTopProgress';

const Dashboard = () => {
  const [floatingText, setFloatingText] = useState([]);
  const [nextId, setNextId] = useState(0);
  const {
    changeCurrentLocation,
    formattedBalance,
    addToCurrentBalance,
    mainUser,
    reduceTapLeft,
    tapLeft,
    userBalance
  } = useGlobal();

  function handleClick(e) {
    if (mainUser && tapLeft < mainUser.perTap) {
      return;
    } else {
      // Get the bounding box of the element where the tap happens
      const container = e.currentTarget.getBoundingClientRect();

      // Adjust the click coordinates to be relative to the container
      const clientX = e.clientX - container.left;
      const clientY = e.clientY - container.top;

      const newText = { id: nextId, clientX, clientY };
      setFloatingText((pre) => [...pre, newText]);
      setNextId((pre) => pre + 1);
      reduceTapLeft();
      addToCurrentBalance(mainUser.perTap);

      setTimeout(() => {
        setFloatingText((pre) => pre.filter((text) => text.id !== newText.id));
      }, 2000);
    }
  }

  return (
    <div className="">
      <p className="ps-2 font-bold">{window.Telegram.WebApp.initDataUnsafe.user.username} (CEO)</p>
      <div className="flex flex-col gap-10">
        <UserTopProgress />
        <div className="relative h-full w-full space-y-10 rounded-t-3xl shadow-top-green pt-5">
          <div
            className="w-full flex flex-col items-center gap-10 relative" // Add relative to container
          >
            <div className="flex flex-row items-center gap-2">
              <Image
                className="w-7 h-7"
                src={'/images/quick_coin.png'}
                width={100}
                height={100}
                alt="quick coin icon"
              />
              <p className="text-2xl font-bold">{formattedBalance(userBalance).toLocaleString()}</p>
            </div>
            <Image
              id="tap_image"
              className={`w-64 h-64 duration-200 ${tapLeft >= mainUser.perTap ? '' : 'filter saturate-50'}`}
              src={'/images/quick_coin.png'}
              width={500}
              height={500}
              alt="quick coin icon"
              onClick={(e) => handleClick(e)}
            />
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
          {floatingText.map((text) => (
            <span
              key={text.id}
              className="absolute text-3xl font-bold text-white move-up"
              style={{ top: `${text.clientY}px`, left: `${text.clientX}px` }} // Adjusted click position
            >
              +{mainUser.perTap}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
