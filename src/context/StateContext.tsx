import { useState, createContext, useContext, ReactNode } from "react";
import { initializeSafe } from "../clients/Safe";

interface IStateContext {
  safeAcc: string;
}

const Context = createContext<IStateContext | null>(null);

export const StateContext  = ({ children }: { children: ReactNode }) => {
  const [safeAcc, setSafeAcc] = useState<string>("");

  const init = async () => {
      const res = await initializeSafe()
      const sfeAdd =  await res?.safeSdk.getAddress()
      if(sfeAdd) setSafeAcc(sfeAdd)
  }
  init()

  return (
    <Context.Provider
      value={{ safeAcc }}
    >
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Must initialize the context");
  }
  return context;
};
