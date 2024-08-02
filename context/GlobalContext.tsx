import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTelegram } from "./TelegramContext";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
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
  mainUser: any;
  updateUser: () => void;
}

interface UserInterface {
  createdAt: Date,
  id: number,
  exchangeId: 1,
  quickPerHour: 0,
  balance: 0,
  TapLimit: 1500,
  perTap: 2,
  multitap: {
    level: 1,
    price: 25000;
  },
  energyLimit: {
    level: 1,
    price: 25000;
  },
  DailyReward: {
    day: 0,
    time: Date;
  },
  invitedFriends: [];
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }: { children: ReactNode; }) => {
  const { webApp } = useTelegram();
  useEffect(() => {
    if (webApp) {
      checkAndCreateUser(webApp.initDataUnsafe.user.id);
    }
  }, [webApp]);
  async function checkAndCreateUser(id: number) {
    if (webApp) {
      const userDoc = doc(db, "users", webApp.initDataUnsafe.user.id.toString());
      const user = await getDoc(userDoc);
      if (!user.exists()) {
        await addDoc(userRef, {
          createdAt: new Date(),
          id: webApp.initDataUnsafe.user.id,
          exchangeId: 1,
          quickPerHour: 0,
          balance: 0,
          TapLimit: 1500,
          perTap: 2,
          multitap: {
            level: 1,
            price: 25000
          },
          energyLimit: {
            level: 1,
            price: 25000
          },
          DailyReward: {
            day: 0,
            time: Date.now()
          },
          invitedFriends: []
        });
      } else {
        setMainUser(user);
      }
    }
  }
  const [mainUser, setMainUser] = useState<any>(undefined);
  const userRef = collection(db, "users");
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [tapLimit, setTapLimit] = useState(mainUser.TapLimit);
  const [tapLeft, setTapLeft] = useState(tapLimit);
  const intervalRef = useRef<number | null>(null);
  const [increasePerSecond, setIncreasePerSecond] = useState(3);
  const [isConfirmChangeExchange, setIsConfirmChangeExchange] = useState(false);


  async function updateUser() {
    if (webApp) {
      const userDoc = doc(db, "users", webApp.initDataUnsafe.user.id.toString());
      const user = await getDoc(userDoc);
      user.exists() ? setMainUser(user) : "";
    }
  }


  function openConfirmChangeExchange() {
    setIsConfirmChangeExchange(true);
  }

  function closeConfirmChangeExchange() {
    setIsConfirmChangeExchange(false);
  }

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTapLeft((prevTapLeft: any) => {
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
    setTapLeft((pre: any) => pre - num);
  };

  const formattedBalance = (bal: number) => new Intl.NumberFormat("en-US", {
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
    return num.toString();
  }

  const changeCurrentLocation = (location: string) => {
    setCurrentLocation(location);
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
        updateUser
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
