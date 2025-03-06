import { createParaViemClient } from "@getpara/viem-v2-integration";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from "@safe-global/protocol-kit";
import paras from "./Paras";

export const init = async () => { 


}


const paraViemClient = createParaViemClient(paras, {
  chain: baseSepolia, // Replace with your desired chain
  transport: http("https://sepolia.base.org"), // Replace with your RPC URL
});

const safeAccountConfig: SafeAccountConfig = {
  owners: [(await paraViemClient?.account?.address) as string],
  threshold: 1,
};

const predictedSafe: PredictedSafeProps = {
  safeAccountConfig,
  // More optional properties
};

export const protocolKit = await Safe.init({
  provider: baseSepolia.rpcUrls.default.http[0],
  signer: paraViemClient.account?.publicKey,
  predictedSafe,
});


/* export const safeAddress = await protocolKit.getAddress();
export const safeTransaction = await protocolKit.createTransaction({ safeTransactionData: [] });
export const safeTxHash = await protocolKit.getTransactionHash(safeTransaction);
export const senderSignature = await protocolKit.signTransactionHash(safeTxHash);
await safeSdk.executeTransaction(safeTransaction, senderSignature);
 */
