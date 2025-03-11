 import { parseEther } from "viem";
import { baseSepolia } from "viem/chains";
import { paraViemClient } from "../clients/Safe";

export const sendTransaction = async (
  safeAddress: string,
  to: string,
  value: string
) => {
  const transaction = await paraViemClient?.sendTransaction({
    account: safeAddress,
    to: to,
    value: parseEther(value),
    chain: baseSepolia,
  });
  console.log("Transaction hash:", transaction);
  return transaction;
};
 