import {
  createParaAccount,
  createParaViemClient,
} from "@getpara/viem-v2-integration";
import { http } from "viem";
import { generatePrivateKey } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from "@safe-global/protocol-kit";
import para from "./Para";

const RPC = import.meta.env.VITE_RPC as string;

if (!para) {
  throw new Error("Failed to initialize paraViemClient");
}

try {
  const viemParaAccount = createParaAccount(para);
  const pvtKey = generatePrivateKey();
  //viemParaAccount = privateKeyToAccount(pvtKey)
  console.log(viemParaAccount, pvtKey);
  
  const paraViemClient = createParaViemClient(para, {
    account: viemParaAccount,
    chain: baseSepolia,
    transport: http(RPC),
  });

  //console.log(await para.ctx.client.getEncryptedWalletPrivateKey()) getEncryptedWalletPrivateKeys(idWallet.userId, 'keccak256')

  const safeAccountConfig: SafeAccountConfig = {
    owners: [paraViemClient?.account?.address as string],
    threshold: 1,
  };

  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig,
  };

  console.log(predictedSafe, "predicted");

   const safeSdk = await Safe.init({
    provider: RPC,
    signer: pvtKey, // Assuming `signature` is the correct property  paraViemClient.account?.address
    predictedSafe,
  });

  if (!await safeSdk.isSafeDeployed()) {
    const deploymentTransaction = await safeSdk.createSafeDeploymentTransaction();
    
    const txHash = await paraViemClient.sendTransaction({
      to: deploymentTransaction.to as `0x${string}`,
      value: BigInt(deploymentTransaction.value),
      data: deploymentTransaction.data as `0x${string}`,
      chain: baseSepolia,
      account: viemParaAccount,
    });
    console.log(txHash)
    //await paraViemClient.waitForTransactionReceipt({ hash: txHash });
  }


  console.log("Is Safe deployed:", await safeSdk.isSafeDeployed());
  console.log("Safe Address:", await safeSdk.getAddress());
  console.log("Safe Owners:", await safeSdk.getOwners());
  //console.log('Safe Threshold:', await safeSdk.getThreshold())


} catch (error) {
  console.log(error);
}

//console.log(safeAddress, isSafeDeployed);
/* 
const client = await safeSdk.getSafeProvider().getExternalSigner();

const txHash = await client?.sendTransaction({
  to: deploymentTransaction.to,
  value: BigInt(deploymentTransaction.value),
  data: deploymentTransaction.data as `0x${string}`,
  chain: baseSepolia
})
const txReceipt = client ? await client?.waitForTransactionReceipt({ hash: txHash }) : ''
console.log(txHash) 



export const safeOwners = await safeSdk.getOwners();
export const SafeThreshold = await safeSdk.getThreshold();
 */
