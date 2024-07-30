'use client';
import { useGlobal } from '@/context/global_context/GlobalContext';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import UserTopProgress from '../user_progress/UserTopProgress';
import { AiFillCheckCircle } from 'react-icons/ai';
import combo from "../../data/dailyCombo.json";
const MORSE_CODE: { [key: string]: string; } = {
  '•−': 'A',
  '−•••': 'B',
  '−•−•': 'C',
  '−••': 'D',
  '•': 'E',
  '••−•': 'F',
  '−−•': 'G',
  '••••': 'H',
  '••': 'I',
  '•−−−': 'J',
  '−•−': 'K',
  '•−••': 'L',
  '−−': 'M',
  '−•': 'N',
  '−−−': 'O',
  '•−−•': 'P',
  '−−•−': 'Q',
  '•−•': 'R',
  '•••': 'S',
  '−': 'T',
  '••−': 'U',
  '•••−': 'V',
  '•−−': 'W',
  '−••−': 'X',
  '−•−−': 'Y',
  '−−••': 'Z'
};

const Dashboard: React.FC = () => {
  const tapStartTime = useRef<number | null>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const morseInputRef = useRef('');
  const decodedLettersRef = useRef('');
  const [message, setMessage] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);
  const [dailyComboTime, setDailyComboTime] = useState('');
  const {
    isDailyRewardCollected,
    isDailyCodeCompleted,
    isDailyComboCompleted,
    changeCurrentLocation,
    formattedBalance,
    addToCurrentBalance,
    activateTurbo,
    perTap,
    tapLeft,
    tapLimit,
    reduceTapLeft,
    isOpenCipherArea,
    changeOpenCipher,
    wordToFind,
    toggleCipherTakePrice,
    toggleCipherCompleted
  } = useGlobal();

  const handleTap = () => {
    tapStartTime.current = Date.now();
  };

  function startCountdown(createdTime: Date, elementId: string) {
    const creationTime = combo.time;
    const recreationTime = 86400000;


    const updateCountdown = () => {
      const now = Date.now();
      const remainingTime = now - creationTime;

      // Convert the remaining time into days, hours, minutes, and seconds
      const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setDailyComboTime(hours + " : " + minutes + " : " + seconds);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
  }

  function handleLeave(e: any) {
    if (tapStartTime.current) {
      const tapDuration = Date.now() - tapStartTime.current;
      if (tapDuration > 100) {
        morseInputRef.current += '−';
        animateCipher("−");
      } else {
        morseInputRef.current += '•';
        animateCipher("•");
      }
      restartTimeout();
    }
  }

  function restartTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      decodeMorse();
    }, 2000);
  };

  function animateCipher(item: string) {
    const imgElement = document.getElementById("tap_image");
    if (imgElement) {
      const text = document.createElement('p');
      text.className = 'p-0 m-0';
      text.textContent = `${item}`;
      text.className = 'absolute text-5xl font-bold text-white animation-move';
      const rect = imgElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      imgElement.classList.add('scale-105');
      document.getElementById('coin_div')?.appendChild(text);
      text.style.left = `${centerX}px`;
      text.style.top = `${centerY}px`;
      setTimeout(() => {
        imgElement.classList.remove('scale-105');
      }, 100);
      if (coinRef.current) {
        text.style.setProperty('--delta-x', `${-10}px`);
        text.style.setProperty('--delta-y', `${-200}px`);
        text.addEventListener('animationend', () => {
          text.remove();
        });
      }
    }
  }

  const decodeMorse = () => {
    const letter = MORSE_CODE[morseInputRef.current];
    morseInputRef.current = '';
    if (letter) {
      const currentIndex = indexRef.current;
      const expectedLetter = wordToFind[currentIndex].toUpperCase();

      if (letter === expectedLetter) {
        decodedLettersRef.current += letter;
        indexRef.current += 1;
        if (indexRef.current === wordToFind.length) {
          toggleCipherCompleted();
          toggleCipherTakePrice();
        }
      } else {
        morseInputRef.current = '';
        decodedLettersRef.current = '';
        indexRef.current = 0;
      }
    }
  };
  const animateClickItemMovement = (
    event?: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item?: string
  ) => {
    const text = document.createElement('p');
    text.className = 'p-0 m-0';
    text.textContent = `+${item}`;
    text.className = 'absolute text-5xl font-bold text-white animation-move';
    const tapImage = document.getElementById('tap_image');
    tapImage?.classList.add('scale-105');
    document.getElementById('coin_div')?.appendChild(text);
    const clickX = event?.clientX;
    const clickY = event?.clientY;
    text.style.left = `${clickX}px`;
    text.style.top = `${clickY}px`;
    setTimeout(() => {
      tapImage?.classList.remove('scale-105');
    }, 100);
    if (coinRef.current) {
      text.style.setProperty('--delta-x', `${-10}px`);
      text.style.setProperty('--delta-y', `${-200}px`);
      text.addEventListener('animationend', () => {
        text.remove();
      });
    }
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const itemCreatedTime = new Date('2024-07-29T10:00:00');
    startCountdown(itemCreatedTime, 'countdownElement');
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const userTap = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (tapLeft < perTap) return;
    reduceTapLeft(perTap);
    addToCurrentBalance(perTap);
    animateClickItemMovement(event, perTap.toString());
  };

  return (
    <div className="">
      <p className="ps-2 font-bold">Nicholas Emenike (CEO){message}</p>
      <div className="flex flex-col gap-10">
        <UserTopProgress />
        <div className="h-full w-full rounded-t-3xl shadow-top-green">
          <div className={`flex flex-col ${isOpenCipherArea ? 'pt-3 gap-5' : 'gap-8 pt-5'}`}>
            <div className="flex flex-row justify-between px-5 gap-2">
              <div onClick={() => changeCurrentLocation('earn')} className={`flex flex-col items-center relative bg-slate-900 pt-3  ${isDailyRewardCollected ? 'shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px]' : ''}  rounded-md px-2 py-1 gap-3 w-full`}>
                {isDailyRewardCollected ? (<FaCircleCheck className="absolute top-0 right-0 text-green-500" />) : (
                  <div className={`w-4 h-4 rounded-full absolute right-1 top-2 bg-red-500 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>)}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    className="w-10"
                    src={'/images/daily_reward.png'}
                    height={100}
                    width={100}
                    alt="daily reward image"
                  />
                  <p className="text-sm font-bold">Daily Reward</p>
                </div>
                <p className=" text-sm ">31:44</p>
              </div>
              <div onClick={() => changeCurrentLocation('mine')} className={`flex flex-col items-center relative bg-slate-900 pt-3 ${isDailyComboCompleted ? 'shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px]'
                : ''
                } rounded-md px-2 py-1 gap-3 w-full`}
              >
                {isDailyComboCompleted ? (
                  <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full absolute right-1 top-2 bg-red-500 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                  ></div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    className="w-10"
                    src={'/images/daily_combo.png'}
                    height={100}
                    width={100}
                    alt="daily reward image"
                  />
                  <p className="text-sm font-bold">Daily Combo</p>
                </div>
                <p className=" text-sm ">{dailyComboTime}</p>
              </div>
              <div onClick={changeOpenCipher} className={`flex flex-col items-center relative bg-slate-900 pt-3 ${isDailyCodeCompleted ? 'shadow-green-500 shadow-[rgba(0,0,0,0.5)_0px_0px_0px_1px]'
                : ''
                } rounded-md px-2 py-1 gap-3 w-full`}
              >
                {isDailyCodeCompleted ? (
                  <FaCircleCheck className="absolute top-0 right-0 text-green-500" />
                ) : (
                  <div className={`w-4 h-4 rounded-full absolute right-1 top-2 bg-red-500 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    className="w-10"
                    src={'/images/daily_code.png'}
                    height={100}
                    width={100}
                    alt="daily reward image"
                  />
                  <p className="text-sm font-bold">Daily Code</p>
                </div>
                <p className=" text-sm ">31:44</p>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-2" id="coin_div">
              <div
                className={`w-full flex flex-col items-center ${isOpenCipherArea ? 'gap-5' : 'gap-14'
                  }`}
              >
                <div className="flex flex-col items-center gap-2 w-full px-3">
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      id="total_coin_icon"
                      className="w-10 h-10"
                      src={'/images/quick_coin.png'}
                      width={100}
                      height={100}
                      alt="quick coin icon"
                    />
                    <p className="text-3xl font-bold">{formattedBalance}</p>
                  </div>
                  {isOpenCipherArea && (
                    <div className="flex flex-row items-center justify-between w-full px-3 bg-slate-600 rounded-lg p-2">
                      <p className="font-bold">Daily Code</p>
                      <p className='font-bold'>{decodedLettersRef.current}</p>
                      <div className="flex flex-row items-center gap-2 bg-slate-700 rounded-lg p-2">
                        <Image
                          className="w-7 h-7"
                          src={'/images/quick_coin.png'}
                          width={100}
                          height={100}
                          alt="quick coin icon"
                        />
                        <p className="font-bold">+5,000,000</p>
                        {isDailyCodeCompleted && (
                          <AiFillCheckCircle className="text-xl text-green-500" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div ref={coinRef}
                  onClick={e => { if (!isOpenCipherArea) { tapLeft > perTap ? userTap(e) : ''; } }}
                  onTouchStart={() => { isOpenCipherArea ? handleTap() : ''; }}
                  onTouchEnd={(e) => { isOpenCipherArea ? handleLeave(e) : ''; }}>
                  <Image id="tap_image" className={`w-72 h-72 duration-200 ${isOpenCipherArea ? 'filter -hue-rotate-180 sepia grayscale contrast-200' : ''} ${tapLeft > perTap ? '' : 'filter saturate-50'} ${activateTurbo ? 'filter invert ' : ''}`}
                    src={'/images/quick_coin.png'}
                    width={500}
                    height={500}
                    alt="quick coin icon"
                  />
                </div>
              </div>
              <div className="flex flex-row w-full justify-between px-3">
                <div className="flex flex-row items-center gap-1">
                  <Image
                    className="w-8 h-8"
                    src={'/images/flash.png'}
                    height={100}
                    width={100}
                    alt="flash icon"
                  />
                  <p className="font-bold text-lg">
                    {tapLeft} / {tapLimit}
                  </p>
                </div>
                <div
                  className="flex flex-row items-center gap-2"
                  onClick={() => changeCurrentLocation('boost')}
                >
                  <Image
                    className="w-8 h-8"
                    src={'/images/boost.png'}
                    width={100}
                    height={100}
                    alt="boost icon"
                  />
                  <p className="font-bold text-lg">Boost</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
