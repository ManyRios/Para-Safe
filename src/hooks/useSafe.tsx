import { useState } from "react";
import {
  createParaAccount,
  createParaViemClient,
} from "@getpara/viem-v2-integration";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
//import { useClient } from "@getpara/react-sdk";
import para from "../clients/Para";
import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from "@safe-global/protocol-kit";

export default function useSafe() {
  const [safeSdk, setSafeSdk] = useState<Safe>();
  const [safeAcc, setSafeAcc] = useState<SafeAccountConfig>();
  const [predictedSafe, setPredicted] = useState<PredictedSafeProps>();
  const RPC = import.meta.env.VITE_RPC as string;

    try {
      const viemParaAccount = createParaAccount(para);

      const paraViemClient = createParaViemClient(para, {
        account: viemParaAccount,
        chain: baseSepolia,
        transport: http(RPC),
      });

      const safeAccountConfig: SafeAccountConfig = {
        owners: [paraViemClient?.account?.address as string],
        threshold: 1,
      };

      setSafeAcc(safeAccountConfig);

      const predictedSafe: PredictedSafeProps = {
        safeAccountConfig,
      };

      setPredicted(predictedSafe);

      const getSdk = async () => {
        try{
            const sfe = await Safe.init({
                provider: RPC,
                signer: paraViemClient.account?.address,
                predictedSafe,
              });
              if (sfe) {
                setSafeSdk(sfe);
              }
        }catch{
            console.log('first')
        }
        
    } 

    getSdk()

    } catch (error: unknown) {
      console.log(error);
    }

    return { safeSdk, safeAcc, predictedSafe };
  };
