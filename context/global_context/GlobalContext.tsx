import { createContext, ReactNode, useContext, useState } from "react";

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
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isDailyRewardCollected, setIsDailyRewardCollected] = useState(false);
  const [isDailyComboCompleted, setIsDailyComboCompleted] = useState(false);
  const [isDailyCodeCompleted, setIsDailyCodeCompleted] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("dashboard");
  const [currentBalance, setCurrentBalance] = useState(999);
  const [dailyCombo, setDailyCombo] = useState(0);

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

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(currentBalance);

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
