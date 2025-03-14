/* import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import para from "../clients/Para";
import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from "@safe-global/protocol-kit";
//import { entryPoint07Address } from "viem/account-abstraction";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import {
  createParaAccount,
  createParaViemClient,
} from "@getpara/viem-v2-integration";
import { baseSepolia } from "viem/chains";
import { http } from "viem";

interface ISafe {
  isLogged: boolean;
  safeAdd: string;
  safeSdk: Safe;
}

const ParaCapsuleContext = createContext<ISafe | null>(null);

export function CapsulePara({ children }: { children: ReactNode }) {
  const [isLogged, setIsLogged] = useState(false);
  const [safeAdd, setSafeAdd] = useState<string>("");
  const [safeSdk, setSafeSdk] = useState<Safe>();

  const RPC = import.meta.env.VITE_RPC as string;

  if (!para) {
    throw new Error("Para is not initialized");
  } else {
    if (para.getAddress()) {
      setIsLogged(true);
    }
  }

  let viemParaAccount = createParaAccount(para);
  const pvtKey = generatePrivateKey();
  viemParaAccount = privateKeyToAccount(pvtKey);

  const paraViemClient = createParaViemClient(para, {
    account: viemParaAccount,
    chain: baseSepolia,
    transport: http(RPC),
  });

  const safeAccountConfig: SafeAccountConfig = {
    owners: [paraViemClient?.account?.address as string],
    threshold: 1,
  };

  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig,
  };

  useEffect(() => {
    const init = async () => {
      try {
        const sdk = await Safe.init({
          provider: RPC,
          signer: paraViemClient.account?.address,
          predictedSafe,
        });
        if (sdk) {
          setSafeSdk(sdk);
          const sfe = await sdk.getAddress();
          setSafeAdd(sfe);
          console.log(safeAdd)
        }
      } catch (error) {
        console.log(error);
      }
    };
    init(); 
  }, []);

  return (
    <ParaCapsuleContext.Provider value={{ isLogged, safeSdk: safeSdk!, safeAdd: safeAdd! }}>
      {children}
    </ParaCapsuleContext.Provider>
  );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(ParaCapsuleContext);

 */