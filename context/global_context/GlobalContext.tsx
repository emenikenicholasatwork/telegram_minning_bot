import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface GlobalContextProps {
  isDailyRewardCollected: boolean;
  isDailyComboCompleted: boolean;
  isDailyCodeCompleted: boolean;
  changeDailyRewardState: () => void;
  currentLocation: string;
  changeCurrentLocation: (location: string) => void;
  addToCurrentBalance: (pre: number) => void;
  subtractFromCurrentBalance: (pre: number) => void;
  formattedBalance: string;
  dailyCombo: number;
  addDailyCombo: () => void;
  clearDailyCombo: () => void;
  formatNumber: (num: number) => string;
  activateTurbo: boolean;
  useTurbo: () => void;
  perTap: number;
  tapLeft: number;
  reduceTapLeft: (num: number) => void;
  tapLimit: number;
  profitPerHour: number;
  isOpenCipherArea: boolean;
  changeOpenCipher: () => void;
  wordToFind: string;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const WORDS = [
  "Block",
  "Chain",
  "Coins",
  "Proof",
  "Token",
  "Stake",
  "Miner",
  "Trade",
  "Dapps",
  "Nodes",
  "Bytes",
  "Ether",
  "Spend",
  "Zcash",
  "Swipe",
  "Asset",
  "Ledger",
  "Trust",
  "Valid",
  "Hash",
  "Curve",
  "Claim",
  "Split",
  "Yield",
  "Audit",
  "Batch",
  "Proof",
  "Stake",
  "Limit",
  "Merge",
  "Merge",
  "Payer",
  "Trace",
  "Batch",
  "Crypt",
  "Proof",
  "Audit",
  "Trust",
  "Wager",
  "Chain",
  "Block",
  "Limit",
  "Valid",
  "Trace",
  "Ether",
  "Merge",
  "Token",
  "Spend",
  "Yield",
  "Curve",
];

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  const [isDailyRewardCollected, setIsDailyRewardCollected] = useState(false);
  const [isOpenCipherArea, setIsOpenCipherArea] = useState(false);
  const [isDailyComboCompleted, setIsDailyComboCompleted] = useState(false);
  const [isDailyCodeCompleted, setIsDailyCodeCompleted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [dailyCombo, setDailyCombo] = useState(0);
  const [activateTurbo, setActivateTurbo] = useState(false);
  const [perTap, setPerTap] = useState(2);
  const [tapLimit, setTapLimit] = useState(1500);
  const [tapLeft, setTapLeft] = useState(tapLimit);
  const [profitPerHour, setProfitPerHour] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [increasePerSecond, setIncreasePerSecond] = useState(3);
  const [wordToFind, setWordToFind] = useState<string>("");
  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setWordToFind(WORDS[randomIndex]);
  };

  const changeOpenCipher = () => {
    if (isOpenCipherArea) {
      setIsOpenCipherArea(false);
    } else {
      setIsOpenCipherArea(true);
      getRandomWord();
    }
  };

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

  const useTurbo = () => {
    setActivateTurbo(true);
    setCurrentLocation("dashboard");
    const preTap = perTap;
    setPerTap((pre) => pre * 10);
    setTimeout(() => {
      setPerTap(preTap);
      setActivateTurbo(false);
    }, 10000);
  };

  const addDailyCombo = () => {
    setDailyCombo((pre) => pre + 1);
  };
  const clearDailyCombo = () => {
    setDailyCombo(0);
  };

  const addToCurrentBalance = (number: number) => {
    setCurrentBalance((pre) => pre + number);
  };

  const subtractFromCurrentBalance = (number: number) => {
    setCurrentBalance((pre) => pre - number);
  };

  const reduceTapLeft = (num: number) => {
    setTapLeft((pre) => pre - num);
  };

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(currentBalance);

  function formatNumber(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "k";
    }
    return num.toString();
  }

  const changeDailyRewardState = () => {};
  const changeCurrentLocation = (location: string) => {
    setCurrentLocation(location);
  };
  return (
    <GlobalContext.Provider
      value={{
        isDailyRewardCollected,
        isDailyComboCompleted,
        isDailyCodeCompleted,
        changeDailyRewardState,
        currentLocation,
        changeCurrentLocation,
        formattedBalance,
        addToCurrentBalance,
        subtractFromCurrentBalance,
        dailyCombo,
        addDailyCombo,
        clearDailyCombo,
        formatNumber,
        activateTurbo,
        useTurbo,
        perTap,
        tapLeft,
        reduceTapLeft,
        tapLimit,
        profitPerHour,
        changeOpenCipher,
        isOpenCipherArea,
        wordToFind,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobal(): GlobalContextProps {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return useContext(GlobalContext);
}
