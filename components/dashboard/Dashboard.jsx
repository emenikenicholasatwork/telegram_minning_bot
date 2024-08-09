'use client';
import { useGlobal } from '@/app/GlobalContext';
import Image from 'next/image';
import React, { useRef } from 'react';
import UserTopProgress from '../user_progress/UserTopProgress';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

const Dashboard = () => {
  const timeoutRef = useRef(null);
  const {
    changeCurrentLocation,
    formattedBalance,
    addToCurrentBalance,
    mainUser,
    reduceTapLeft,
    tapLeft,
    userBalance
  } = useGlobal();

  function user_clicks(event) {
    if (mainUser && tapLeft < mainUser.perTap) {
      return;
    } else {
      animateClick(event, mainUser.perTap);
      const tap_image = document.getElementById("tap_image");
      tap_image.classList.add("scale-110");
      addToCurrentBalance(mainUser.perTap);
      reduceTapLeft();
      setTimeout(() => {
        tap_image?.classList.remove("scale-110");
      }, 100);
      resetTimeout();
    }
  }

  function animateClick(event, pertap) {
    const { pageX, pageY } = event;
    // Create the element to display the text
    const element = document.createElement("p");
    element.textContent = `+${pertap}`;
    element.className = "absolute text-3xl m-0 p-0 w-fit font-bold text-white move-up";

    // Append the element to the body
    document.body.appendChild(element);

    // Set the position of the element based on the click position
    element.style.left = `${pageX}px`;
    element.style.top = `${pageY}px`;

    // Apply the transformation for the upward movement
    element.style.transform = 'translate(-50%, -50%)'; // Centers the element on the click

    // Remove the element once the animation ends
    element.addEventListener("animationend", () => {
      element.remove();
    });
  }




  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
      const userDoc = doc(db, "users", userId.toString());
      await updateDoc(userDoc, {
        balance: userBalance,
      });
    }, 3000);
  };

  return (
    <div className="">
      <p className="ps-2 font-bold">{window.Telegram.WebApp.initDataUnsafe.user.username} (CEO)</p>
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
                <p className="text-2xl font-bold">{formattedBalance(userBalance)}</p>
              </div>
              <div>
                <Image id="tap_image" className={`w-64 h-64 duration-200 ${tapLeft > mainUser.perTap ? '' : 'filter saturate-50'}`}
                  src={'/images/quick_coin.png'}
                  width={500}
                  height={500}
                  alt="quick coin icon"
                  onClick={(e) => user_clicks(e)}
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
