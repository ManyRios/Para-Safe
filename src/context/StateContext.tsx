import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useAccount, useWallet } from "@getpara/react-sdk";
import { initializeSafe } from "../clients/Safe";

interface IStateContext {
  safeAcc: string;
}

const Context = createContext<IStateContext | null>(null);

export const StateContext = ({ children }: { children: ReactNode }) => {
  const [safeAcc, setSafeAcc] = useState<string>("");
  const { data: account } = useAccount();
  //const { signMessageAsync } = useSignMessage();
  const { data: wallet } = useWallet();

  // const message = "Trying this message"

  //const [messageSignature, setMessageSignature] = useState<string | undefined>(undefined);

  /*  const handleSign = async () => {

    const signatureRes = await signMessageAsync({
      messageBase64: Buffer.from(message).toString("base64"),
    });
    if (!("pendingTransactionId" in signatureRes) && signatureRes.signature) {
      setMessageSignature(signatureRes.signature);
      console.log(signatureRes.signature)
    }
  }; */

  const init = async () => {
    console.log("first");
    console.log("MESSAGE SIGNATURE", wallet);
    if (wallet) {
      const res = await initializeSafe();
      const sfeAdd = res?.safeAddress;
      if (sfeAdd) setSafeAcc(sfeAdd);
    }
  };

  useEffect(() => {
    //handleSign()
    init();
  }, [account]);

  return <Context.Provider value={{ safeAcc }}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Must initialize the context");
  }
  return context;
};
