import ParaWeb, { Environment } from "@getpara/web-sdk";
import Safe, { PredictedSafeProps, SafeAccountConfig } from "@safe-global/protocol-kit";
import { MetaTransactionData, OperationType } from "@safe-global/types-kit";
import { createParaAccount, createParaViemClient } from "@getpara/viem-v2-integration";
import { sepolia, baseSepolia } from "viem/chains";
import { createPublicClient, http, parseEther } from "viem";

const CapsuleParasApi = import.meta.env.VITE_PARA_API_KEY;
const RPC_BASESEPOLIA = import.meta.env.VITE_RPC_BASESEPOLIA as string;

export async function createSafeWithPara() {
  const para = new ParaWeb(Environment.BETA, CapsuleParasApi);
  const paraAccount = createParaAccount(para);
  const viemClient = createParaViemClient(para, { account: paraAccount, transport: http(RPC_BASESEPOLIA), chain: baseSepolia });

  console.log('initializing')
  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(RPC_BASESEPOLIA),
  });
  console.log('Para Initilized')
  const signerAddress = paraAccount.address;

  const safeAccountConfig: SafeAccountConfig = {
    owners: [signerAddress],
    threshold: 1,
  };

  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig,
  };
  console.log('initializing protocol kit...')
  const protocolKit = await Safe.init({
    provider: viemClient.transport,
    signer: signerAddress,
    predictedSafe,
  });

  const safeAddress = await protocolKit.getAddress();
 
  const isDeployed = await protocolKit.isSafeDeployed();
  if (isDeployed) {
    return { protocolKit, safeAddress };
  }

  const deploymentTransaction = await protocolKit.createSafeDeploymentTransaction();

  try {
    console.log('deployingTransaction')
    const txHash = await viemClient.sendTransaction({
      to: deploymentTransaction.to as `0x${string}`,
      value: BigInt(deploymentTransaction.value || 0),
      data: deploymentTransaction.data as `0x${string}`,
      account: paraAccount,
      chain: baseSepolia,
    });

    console.log(txHash)
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });

    console.log(receipt)

    const connectedProtocolKit = await protocolKit.connect({
      safeAddress,
      signer: signerAddress,
      provider: viemClient.transport,
    });

    const isNowDeployed = await connectedProtocolKit.isSafeDeployed();
    const owners = await connectedProtocolKit.getOwners();
    const threshold = await connectedProtocolKit.getThreshold();

    console.log(isNowDeployed, owners, threshold);

    return { protocolKit: connectedProtocolKit, safeAddress };
  } catch (error) {
    console.error("Error deploying Safe:", error);
    throw error;
  }
}

export async function interactWithSafe(safeAddress: string) {
  const para = new ParaWeb(Environment.BETA, "");
  const paraAccount = createParaAccount(para);
  const viemClient = createParaViemClient(para, { account: paraAccount, transport: http(), chain: baseSepolia });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const signerAddress = paraAccount.address;

  const protocolKit = await Safe.init({
    provider: viemClient.transport,
    signer: signerAddress,
    safeAddress: safeAddress,
  });

  const isDeployed = await protocolKit.isSafeDeployed();
  if (!isDeployed) {
    throw new Error("Safe is not deployed at this address");
  }

  const owners = await protocolKit.getOwners();
  const threshold = await protocolKit.getThreshold();

  const recipientAddress = "0xRecipientAddress";

  console.log(owners, threshold)
  const safeTransactionData: MetaTransactionData = {
    to: recipientAddress,
    value: parseEther("0.005").toString(),
    data: "0x",
    operation: OperationType.Call,
  };

  const safeTransaction = await protocolKit.createTransaction({
    transactions: [safeTransactionData],
  });

  const signedTransaction = await protocolKit.signTransaction(safeTransaction);

  const executeTxResponse = await protocolKit.executeTransaction(signedTransaction);

  await publicClient.waitForTransactionReceipt({
    hash: executeTxResponse.hash as `0x${string}`,
  });

  return { protocolKit, safeAddress };
}
