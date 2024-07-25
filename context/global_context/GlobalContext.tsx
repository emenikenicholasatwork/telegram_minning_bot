import { createContext, ReactNode, useContext, useState } from "react";

interface GlobalContextProps {
  isDailyRewardCollected: boolean;
  isDailyComboCompleted: boolean;
  isDailyCodeCompleted: boolean;
  changeDailyRewardState: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isDailyRewardCollected, setIsDailyRewardCollected] = useState(false);
  const [isDailyComboCompleted, setIsDailyComboCompleted] = useState(false);
  const [isDailyCodeCompleted, setIsDailyCodeCompleted] = useState(false);

  const changeDailyRewardState = () => {};
  return (
    <GlobalContext.Provider
      value={{
        isDailyRewardCollected,
        isDailyComboCompleted,
        isDailyCodeCompleted,
        changeDailyRewardState,
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
