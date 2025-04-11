import ParaWeb, { Environment } from "@getpara/react-sdk";
import { createParaAccount, createParaViemClient } from "@getpara/viem-v2-integration";
import { http } from "viem";
import {  sepolia } from "viem/chains";

const CapsuleParasApi = import.meta.env.VITE_PARA_API_KEY;

//const RPC_BASESEPOLIA = import.meta.env.VITE_RPC_BASESEPOLIA as string;
const RPC_ETHSEPOLIA = import.meta.env.VITE_RPC_ETHSEPOLIA as string;

if(!CapsuleParasApi){
    throw new Error("Please set Para API for use capsule");
}

const para = new ParaWeb(Environment.BETA, CapsuleParasApi);
 
if (!para) {
  throw new Error("Failed to initialize paraViemClient");
}

export const paraAccount = createParaAccount(para);

if(!paraAccount){
  throw new Error("Failed to initialize paraAccount");
}


export const paraViemClient = createParaViemClient(para, {
  account: paraAccount,
  chain: sepolia,
  transport: http(RPC_ETHSEPOLIA),
});

export default para;
