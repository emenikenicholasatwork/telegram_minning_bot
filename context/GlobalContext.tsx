import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface GlobalContextProps {
  currentLocation: string;
  changeCurrentLocation: (location: string) => void;
  addToCurrentBalance: (pre: number) => void;
  subtractFromCurrentBalance: (pre: number) => void;
  formattedBalance: string;
  formatNumber: (num: number) => string;
  perTap: number;
  tapLeft: number;
  reduceTapLeft: (num: number) => void;
  tapLimit: number;
  profitPerHour: number;
  isConfirmChangeExchange: boolean;
  openConfirmChangeExchange: () => void;
  closeConfirmChangeExchange: () => void;
  selectedExchange: number;
  changeSelectedExchange: (num: number) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }: { children: ReactNode; }) => {
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [perTap, setPerTap] = useState(2);
  const [tapLimit, setTapLimit] = useState(1500);
  const [tapLeft, setTapLeft] = useState(tapLimit);
  const [profitPerHour, setProfitPerHour] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [increasePerSecond, setIncreasePerSecond] = useState(3);
  const [isConfirmChangeExchange, setIsConfirmChangeExchange] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState(2);

  function changeSelectedExchange(num: number) {
    setSelectedExchange(num);
  }

  function openConfirmChangeExchange() {
    setIsConfirmChangeExchange(true);
  }

  function closeConfirmChangeExchange() {
    setIsConfirmChangeExchange(false);
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

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(currentBalance);

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
        perTap,
        tapLeft,
        reduceTapLeft,
        tapLimit,
        profitPerHour,
        isConfirmChangeExchange,
        openConfirmChangeExchange,
        closeConfirmChangeExchange,
        selectedExchange,
        changeSelectedExchange
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
