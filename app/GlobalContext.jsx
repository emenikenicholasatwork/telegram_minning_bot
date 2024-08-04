"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import toast from "react-hot-toast";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [mainUser, setMainUser] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [tapLimit, setTapLimit] = useState(0);
  const [increasePerSecond, setIncreasePerSecond] = useState(0);
  const [tapLeft, setTapLeft] = useState(0);
  const intervalRef = useRef(null);
  const [userData, setUserData] = useState({ id: "", username: "" });
  useEffect(() => {
    // if (process.env.NODE_ENV === "development") {
    //   console.log("Loading mock Telegram WebApp");
    //   require("./mockTelegram");
    // }
    const app = window.Telegram?.WebApp;
    if (app.ready) {
      const tgUser = app.initDataUnsafe?.user;
      if (tgUser) {
        setUserData({ id: tgUser.id, username: tgUser.username });
        setMainUser(tgUser.id);
        checkAndCreateUser(tgUser.id, tgUser.username);
      } else {
        toast.error("Telegram user data is not available");
      }
    } else {
      toast.error("Telegram WebApp is not available");
    }
  }, []);


  async function checkAndCreateUser(id) {
    try {
      const userDoc = doc(db, "users", id.toString());
      const user = await getDoc(userDoc);
      if (user.exists()) {
        const userData = user.data();
        setMainUser(userData);
        setTapLimit(userData.TapLimit);
        setIncreasePerSecond(userData.increasePerSecond);
        setTapLeft(userData.TapLimit);
      } else {
        await setDoc(doc(db, "users", id.toString()), {
          updatedAt: new Date(),
          id: id,
          exchangeId: 1,
          quickPerHour: 0,
          tapLeft: 1500,
          balance: 0,
          TapLimit: 1500,
          perTap: 2,
          increasePerSecond: 3,
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
        });
        setTapLimit(1500);
        setIncreasePerSecond(3);
        setTapLeft(1500);
        updateUser();
      }
    } catch (err) {
      console.error("Error while checking user: ", err);
    }
  }
  async function updateUser() {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    if (userId) {
      const userDoc = doc(db, "users", userId.toString());
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setMainUser(user.data());
      }
    }
  }

  useEffect(() => {
    if (tapLimit > 0 && increasePerSecond > 0) {
      intervalRef.current = setInterval(() => {
        setTapLeft((prevTapLeft) => {
          if (prevTapLeft + mainUser?.increasePerSecond <= mainUser?.TapLimit) {
            return prevTapLeft + mainUser?.increasePerSecond;
          } else {
            if (prevTapLeft < mainUser?.TapLimit) {
              return mainUser?.TapLimit;
            }
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return prevTapLeft;
          }
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mainUser?.TapLimit, mainUser?.balance, mainUser?.increasePerSecond]);

  function fullEnergy() {
    setTapLeft(mainUser?.TapLimit);
    toast.success("energy full.");
    setCurrentLocation("dashboard");
  }

  const addToCurrentBalance = (number) => {
    setMainUser(pre => ({
      ...pre,
      balance: pre.balance + number,
    }));
    setTapLeft((pre) => pre - number);
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
    try {
      if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + "B";
      } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
      }
      return num.toString();
    } catch (err) {
      console.error("Error while formatting balance: ", err);
    }
  }

  async function mine(itemQuickPerHour, price) {
    const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    if (price > mainUser.balance) {
      toast.error("Insufficient balance");
      return;
    } else {
      const minningToast = toast.loading("minning", {
        duration: 2000
      });
      try {
        const userDoc = doc(db, "users", userId.toString());
        await updateDoc(userDoc, { quickPerHour: mainUser.quickPerHour + itemQuickPerHour, balance: mainUser.balance - price });
        updateUser();
        toast.success("Successfull.", {
          id: minningToast
        });
      } catch (err) {
        toast.error("Error while minning", {
          id: minningToast
        });
      }
    }
  }

  const changeCurrentLocation = (location) => {
    setCurrentLocation(location);
  };

  return (
    <GlobalContext.Provider
      value={{
        currentLocation,
        changeCurrentLocation,
        formattedBalance,
        addToCurrentBalance,
        formatNumber,
        reduceTapLeft,
        mainUser,
        updateUser,
        userData,
        tapLeft,
        fullEnergy,
        mine,
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
