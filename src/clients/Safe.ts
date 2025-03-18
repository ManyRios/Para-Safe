import { createParaViemClient } from "@getpara/viem-v2-integration";
import { http  } from "viem";
import { baseSepolia } from "viem/chains";
import Safe, { PredictedSafeProps, SafeAccountConfig } from "@safe-global/protocol-kit";
import para from "./Para";

const RPC = import.meta.env.VITE_RPC as string;

if (!para) {
  throw new Error("Failed to initialize paraViemClient");
}

export async function initializeSafe() {
  try {

    const paraViemClient = createParaViemClient(para, {
      chain: baseSepolia,
      transport: http(RPC),
    });

    if (!paraViemClient?.account?.address) {
      throw new Error("No account found in paraViemClient");
    }

    const safeAccountConfig: SafeAccountConfig = {
      owners: [paraViemClient.account.address],
      threshold: 1,
    };

    
    const sign = paraViemClient.account.address

    const predictedSafe: PredictedSafeProps = {
      safeAccountConfig,
    };

    const safeSdk = await Safe.init({
      provider: RPC,
      signer: sign, //paraViemClient.account.address,
      predictedSafe,
    });

    if (!safeSdk) {
      throw new Error("Failed to initialize Safe SDK");
    }
    
    console.log(await safeSdk.isSafeDeployed())

    if ((await safeSdk.isSafeDeployed())) { //(!await safeSdk.isSafeDeployed())
      console.log("Safe not deployed. Deploying...");

      // Crear la transacción de despliegue
      const deploymentTransaction = await safeSdk.createSafeDeploymentTransaction();
      console.log("Deployment Transaction:", deploymentTransaction);

      const client = await safeSdk.getSafeProvider().getExternalSigner();
      if (!client) {
        throw new Error("Failed to get external signer");
      }

      const txHash = await client.sendTransaction({
        to: deploymentTransaction.to as `0x${string}`,
        value: BigInt(deploymentTransaction.value),
        data: deploymentTransaction.data as `0x${string}`,
        chain: baseSepolia,
      });

      console.log("Transaction Hash:", txHash);
    } else {
      console.log("Safe is already deployed");
    }
    return {safeSdk, paraViemClient}
  } catch (error) {
    console.error("Error initializing Safe:", error);
  }
}
