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

interface GlobalContextProps {
  currentLocation: string;
  changeCurrentLocation: (location: string) => void;
  addToCurrentBalance: (pre: number) => void;
  subtractFromCurrentBalance: (pre: number) => void;
  formattedBalance: (bal: number) => string;
  formatNumber: (num: number) => string;
  tapLeft: number;
  reduceTapLeft: (num: number) => void;
  tapLimit: number;
  isConfirmChangeExchange: boolean;
  openConfirmChangeExchange: () => void;
  closeConfirmChangeExchange: () => void;
  mainUser: UserInterface | undefined;
  updateUser: () => void;
  userData: userDataInterface;
}

interface UserInterface {
  createdAt: Date;
  id: string;
  exchangeId: number;
  quickPerHour: number;
  balance: number;
  TapLimit: number;
  perTap: number;
  multitap: {
    level: number;
    price: number;
  };
  energyLimit: {
    level: number;
    price: number;
  };
  DailyReward: {
    day: number;
    time: number;
  };
  invitedFriends: any[];
}

interface userDataInterface {
  id: string;
  username: string;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [mainUser, setMainUser] = useState<UserInterface>();
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [tapLimit, setTapLimit] = useState<number>(1500);
  const [tapLeft, setTapLeft] = useState<number>(tapLimit);
  const intervalRef = useRef<number | null>(null);
  const [increasePerSecond, setIncreasePerSecond] = useState(3);
  const [isConfirmChangeExchange, setIsConfirmChangeExchange] = useState(false);
  const [userData, setUserData] = useState<userDataInterface>({ id: "", username: "" });

  useEffect(() => {
    const telegramApp = (window as any).Telegram.WebApp;
    const userId = telegramApp.initDataUnsafe.user.id;
    const username = telegramApp.initDataUnsafe.user.username;
    if (userId && username) {
      setUserData({ id: userId.toString(), username: username });
      checkAndCreateUser(userId.toString(), username);
    }
  }, []);

  async function checkAndCreateUser(id: string, username: string) {
    const userDoc = doc(db, "users", id);
    const user = await getDoc(userDoc);
    if (!user.exists()) {
      const newUser: UserInterface = {
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
      setMainUser(user.data() as UserInterface);
    }
  }

  async function updateUser() {
    if (userData.id) {
      const userDoc = doc(db, "users", userData.id);
      const user = await getDoc(userDoc);
      if (user.exists()) {
        setMainUser(user.data() as UserInterface);
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

  const addToCurrentBalance = (number: number) => {
    setCurrentBalance((pre) => pre + number);
  };

  const subtractFromCurrentBalance = (number: number) => {
    setCurrentBalance((pre) => pre - number);
  };

  const reduceTapLeft = (num: number) => {
    setTapLeft((pre) => pre - num);
  };

  const formattedBalance = (bal: number) =>
    new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(bal);

  function formatNumber(num: number) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num?.toString();
  }

  const changeCurrentLocation = (location: string) => {
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

export const useGlobal = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
