"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [mainUser, setMainUser] = useState();
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [tapLimit, setTapLimit] = useState(1500);
  const [tapLeft, setTapLeft] = useState(tapLimit);
  const intervalRef = useRef(null);
  const [increasePerSecond, setIncreasePerSecond] = useState(3);
  const [isConfirmChangeExchange, setIsConfirmChangeExchange] = useState(false);
  const [userData, setUserData] = useState({ id: "", username: "" });

  useEffect(() => {
    const userId = window.Telegram.WebApp.initDataUnsafe?.user?.id;
    const username = window.Telegram.WebApp.initDataUnsafe.user.username;
    if (userId) {
      setUserData({ id: userId.toString(), username: username });
      checkAndCreateUser(userId.toString(), username);
    }
  }, []);

  async function checkAndCreateUser(id, username) {
    const userDoc = doc(db, "users", id);
    const user = await getDoc(userDoc);
    if (!user.exists()) {
      const newUser = {
        createdAt: new Date(),
        id,
        exchangeId: 1,
        quickPerHour: 0,
        balance: 0,
        TapLimit: 1500,
        perTap: 2,
        multitap: {
          level: 1,
          price: 25000,
        },
        energyLimit: {
          level: 1,
          price: 25000,
        },
        DailyReward: {
          day: 0,
          time: Date.now(),
        },
        invitedFriends: [],
      };
      await setDoc(userDoc, newUser);
      setMainUser(newUser);
    } else {
      setMainUser(user.data());
    }
  }

  async function updateUser() {
    if (userData.id) {
      const userDoc = doc(db, "users", userData.id);
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setMainUser(user.data());
      }
    }
  }

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTapLeft((prevTapLeft) => {
        if (prevTapLeft + increasePerSecond <= tapLimit) {
          return prevTapLeft + increasePerSecond;
        } else {
          if (prevTapLeft < tapLimit) {
            return tapLimit;
          }
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return prevTapLeft;
        }
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tapLimit, currentBalance, increasePerSecond]);

  const addToCurrentBalance = (number) => {
    setCurrentBalance((pre) => pre + number);
  };

  const subtractFromCurrentBalance = (number) => {
    setCurrentBalance((pre) => pre - number);
  };

  const reduceTapLeft = (num) => {
    setTapLeft((pre) => pre - num);
  };

  const formattedBalance = (bal) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(bal);

  function formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toString();
  }

  const changeCurrentLocation = (location) => {
    setCurrentLocation(location);
  };

  const openConfirmChangeExchange = () => {
    setIsConfirmChangeExchange(true);
  };

  const closeConfirmChangeExchange = () => {
    setIsConfirmChangeExchange(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        currentLocation,
        changeCurrentLocation,
        formattedBalance,
        addToCurrentBalance,
        subtractFromCurrentBalance,
        formatNumber,
        tapLeft,
        reduceTapLeft,
        tapLimit,
        isConfirmChangeExchange,
        openConfirmChangeExchange,
        closeConfirmChangeExchange,
        mainUser,
        updateUser,
        userData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
