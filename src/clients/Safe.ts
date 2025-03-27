import Safe, { SafeAccountConfig, PredictedSafeProps  } from "@safe-global/protocol-kit";
import { createPublicClient, http} from 'viem'
import {  baseSepolia } from "viem/chains";
import para, { paraViemClient, paraAccount } from "./Para"

const RPC_BASESEPOLIA = import.meta.env.VITE_RPC_BASESEPOLIA as string;
//const RPC_ETHSEPOLIA = import.meta.env.VITE_RPC_ETHSEPOLIA as string;

if (!para) {
  throw new Error("Failed to initialize paraViemClient");
}

export async function initializeSafe() {
  
  try {
   
    if (!paraViemClient?.account?.address) {
      throw new Error("No account found in paraViemClient");
    }

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(RPC_BASESEPOLIA),
    });

    const signerAddress = paraAccount.address;

    const safeAccountConfiguration: SafeAccountConfig = {
      owners: [signerAddress],
      threshold: 1,
    };

    const predictedSafe: PredictedSafeProps = {
      safeAccountConfig: safeAccountConfiguration
    }

    const safeSdk = await Safe.init({
      provider: paraViemClient.transport,
      signer: signerAddress,
      predictedSafe
    });

    if (!safeSdk) {
      throw new Error("Failed to initialize Safe SDK");
    }

    const safeAddress = await safeSdk.getAddress()
    console.log(await safeSdk.isSafeDeployed(), 'OWNERS', paraViemClient.account.address);

    if ((!await safeSdk.isSafeDeployed())) {
      //(!await safeSdk.isSafeDeployed())
      console.log("Safe not deployed. Deploying...");

      // Crear la transacción de despliegue
      const deploymentTransaction =
        await safeSdk.createSafeDeploymentTransaction();
      console.log("Deployment Transaction:", deploymentTransaction);

      const txHash = await paraViemClient.sendTransaction({
        to: deploymentTransaction.to as `0x${string}`,
        value: BigInt(deploymentTransaction.value || 0),
        data: deploymentTransaction.data as `0x${string}`,
        account: paraAccount,
        chain: baseSepolia,
      });

      console.log('waiting for txHash')

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      const connectedProtocolKit = await safeSdk.connect({
        safeAddress,
        signer: signerAddress,
        provider: publicClient.transport,
      });

      console.log("Transaction Hash:", receipt);
      return {protocolKit: connectedProtocolKit, safeAddress}
    } else {
      console.log("Safe is already deployed");
    }
    return { safeSdk, safeAddress };
  } catch (error) {
    console.error("Error initializing Safe:", error);
  }
}
