import {
  createParaViemClient,
  createParaAccount,
} from "@getpara/viem-v2-integration";
import { http, parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from "@safe-global/protocol-kit";
import para from "../clients/Para";

const RPC = import.meta.env.VITE_RPC as string;

export const paraViemClient = createParaViemClient(para, {
  account: para.getAddress(),
  chain: baseSepolia,
  transport: http(RPC),
});

const account = paraViemClient?.account?.publicKey;

const wallet = createParaAccount(para, account);
console.log(wallet);

const safeAccountConfig: SafeAccountConfig = {
  owners: [paraViemClient?.account?.address as string],
  threshold: 1,
};

const predictedSafe: PredictedSafeProps = {
  safeAccountConfig,
};

export const safeSdk = await Safe.init({
  provider: RPC,
  signer: account,
  predictedSafe,
});

export const safeAddress = await safeSdk.getAddress();

const deploymentTransaction = await safeSdk.createSafeDeploymentTransaction();
console.log(deploymentTransaction, "DEPLOYMENT");
const client = await safeSdk.getSafeProvider().getExternalSigner();

console.log(await safeSdk.getSafeProvider().getExternalSigner())
console.log("Is Safe deployed:", await safeSdk.isSafeDeployed());
console.log("Safe Address:", await safeSdk.getAddress());
console.log("Safe Owners:", await safeSdk.getOwners());
console.log("Safe Threshold:", await safeSdk.getThreshold());

export const sendTransaction = async (
  safeAddress: string,
  to: string,
  value: string
) => {
  const transaction = await paraViemClient.sendTransaction({
    account: safeAddress,
    to: to,
    value: parseEther(value),
    chain: baseSepolia
  });
  console.log('Transaction hash:', transaction);
  return transaction;
};

/*

const txHash = await client?.sendTransaction({
  to: deploymentTransaction.to,
  value: BigInt(deploymentTransaction.value),
  data: deploymentTransaction.data as `0x${string}`,
  chain: baseSepolia,
});

console.log(txHash);
export const protocolKit = await safeSdk.connect({ safeAddress });


export const isSafeDeployed = await protocolKit.isSafeDeployed();
export const addressSafe = await protocolKit.getAddress();

console.log(isSafeDeployed)




export const safeTxHash = async (safeTrans: SafeTransaction) => {
  return await protocolKit.getTransactionHash(safeTrans);
};
 */
