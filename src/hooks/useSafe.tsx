/* import { useState } from "react";
import {
  createParaAccount,
  createParaViemClient,
} from "@getpara/viem-v2-integration";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
//import { useClient } from "@getpara/react-sdk";
import para from "../clients/Para";
import Safe, {
  SafeAccountConfig,
} from "@safe-global/protocol-kit";

export function useSafe() {
  const [isLogged, setIsLogged] = useState(false);
  const [safeSdk, setSafeSdk] = useState<Safe>();
  const [safeAcc, setSafeAcc] = useState<string>();
  const RPC = import.meta.env.VITE_RPC as string;

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

    const getSdk = async () => {
      if( paraViemClient.account?.address){
        setIsLogged(true)
  
      try {
        const sfe = await Safe.init({
          signer: paraViemClient.account?.address,
          provider: RPC,
          predictedSafe: {
            safeAccountConfig,
          },
        });
        if (sfe) {
          setSafeAcc(await sfe.getAddress());
          setSafeSdk(sfe);
          console.log(await sfe.isSafeDeployed());
          if (!(await sfe.isSafeDeployed())) {
            const deploymentTransaction =
              await sfe.createSafeDeploymentTransaction();

            const txHash = await paraViemClient.sendTransaction({
              to: deploymentTransaction.to as `0x${string}`,
              value: BigInt(deploymentTransaction.value),
              data: deploymentTransaction.data as `0x${string}`,
              chain: baseSepolia,
              account: viemParaAccount,
            });
            console.log(txHash, "HEY");
            // await paraViemClient.waitForTransactionReceipt({ hash: txHash });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
    getSdk();


  return { safeSdk, safeAcc, isLogged };
}
 */