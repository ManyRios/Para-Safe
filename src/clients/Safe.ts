import Safe, {
  SafeAccountConfig,
  PredictedSafeProps,
} from "@safe-global/protocol-kit";
import {
  createPublicClient,
  hashMessage,
  http,
  parseEther,
  SignableMessage,
} from "viem";
import { sepolia } from "viem/chains";
import ParaWeb, {
  hexStringToBase64,
  SuccessfulSignatureRes,
} from "@getpara/react-sdk";
import {
  createParaAccount,
  createParaViemClient,
} from "@getpara/viem-v2-integration";
import { MetaTransactionData, OperationType } from "@safe-global/types-kit";

const RPC_ETHSEPOLIA = import.meta.env.VITE_RPC_ETHSEPOLIA as string;

export async function initializeSafe(para: ParaWeb) {
  try {
    const paraAccount = createParaAccount(para);

    const paraViemClient = createParaViemClient(para, {
      account: paraAccount,
      chain: sepolia,
      transport: http(RPC_ETHSEPOLIA, {
        timeout: 10000,
        retryDelay: 1000,
      }),
    });

    if (!paraViemClient) {
      throw new Error("Failed to initialize paraAccount");
    }

    const signerAddress = paraAccount.address;

    const safeAccountConfiguration: SafeAccountConfig = {
      owners: [signerAddress],
      threshold: 1,
    };

    const predictedSafe: PredictedSafeProps = {
      safeAccountConfig: safeAccountConfiguration,
    };

    const safeSdk = await Safe.init({
      provider: paraViemClient.transport,
      signer: signerAddress,
      predictedSafe,
    });

    if (!safeSdk) {
      throw new Error("Failed to initialize Safe SDK");
    }

    const safeAddress = await safeSdk.getAddress();

    const client = await safeSdk.getSafeProvider().getExternalSigner();

    if (!client) {
      throw new Error("Failed to get Client");
    }

    const isDeployed = await safeSdk.isSafeDeployed();

    return { safeSdk, safeAddress, isDeployed };
  } catch (error) {
    console.error("Error initializing Safe:", error);
  }
}

export const deploySafe = async (para: ParaWeb) => {
  try {
    const paraAccount = createParaAccount(para);

    paraAccount.signMessage = async ({ message }) =>
      customSignMessage(para, message) as Promise<`0x${string}`>;

    const paraViemClient = createParaViemClient(para, {
      account: paraAccount,
      chain: sepolia,
      transport: http(RPC_ETHSEPOLIA, {
        timeout: 10000,
        retryDelay: 1000,
      }),
    });

    if (!paraViemClient) {
      throw new Error("Failed to initialize paraAccount");
    }

    const walletClient = createPublicClient({
      chain: sepolia,
      transport: http(RPC_ETHSEPOLIA, {
        timeout: 10000,
        retryDelay: 1000,
      }),
    });

    const signerAddress = paraAccount.address;

    const safeAccountConfiguration: SafeAccountConfig = {
      owners: [signerAddress],
      threshold: 1,
    };

    const predictedSafe: PredictedSafeProps = {
      safeAccountConfig: safeAccountConfiguration,
    };

    const safeSdk = await Safe.init({
      provider: paraViemClient.transport,
      signer: signerAddress,
      predictedSafe,
    });

    if (!safeSdk) {
      throw new Error("Failed to initialize Safe SDK");
    }

    const safeAddress = await safeSdk.getAddress();

    const client = await safeSdk.getSafeProvider().getExternalSigner();

    if (!client) {
      throw new Error("Failed to get Client");
    }

    const isDeployed = await safeSdk.isSafeDeployed();

    if (!isDeployed && client) {
      console.log("Safe not deployed. Deploying...");

      const deploymentTransaction =
        await safeSdk.createSafeDeploymentTransaction();
      console.log("Deployment Transaction:", deploymentTransaction);

      const txHash = await paraViemClient.sendTransaction({
        account: paraAccount,
        to: deploymentTransaction.to as `0x${string}`,
        value: BigInt(deploymentTransaction.value || 0),
        data: deploymentTransaction.data as `0x${string}`,
        chain: sepolia,
      });

      console.log("waiting for txHash");

      const receipt = await walletClient.waitForTransactionReceipt({
        hash: txHash,
      });

      const connectedProtocolKit = await safeSdk.connect({
        safeAddress,
      });

      console.log("Transaction Hash:", receipt);
      console.log(connectedProtocolKit.isSafeDeployed());
      return { protocolKit: connectedProtocolKit, safeAddress, isDeployed };
    } else {
      console.log("Safe is already deployed");
    }
    return { safeSdk, safeAddress, isDeployed };
  } catch (error) {
    console.error("Error initializing Safe:", error);
  }
};

export const customSignMessage = async (
  para: ParaWeb,
  message: SignableMessage
) => {
  const wallet = para.wallets ? Object.values(para.wallets)[0] : null;
  if (!wallet) {
    throw new Error("Para wallet not available for signing.");
  }
  const hashedMessage = hashMessage(message);
  const messagePayload = hashedMessage.startsWith("0x")
    ? hashedMessage.substring(2)
    : hashedMessage;
  const messageBase64 = hexStringToBase64(messagePayload);

  const res = await para.signMessage({
    walletId: wallet.id,
    messageBase64: messageBase64,
  });

  if (!("signature" in res)) {
    throw new Error(
      `Signature failed or unexpected response: ${JSON.stringify(res)}`
    );
  }

  let signature = (res as SuccessfulSignatureRes).signature;

  const vHex = signature.slice(-2);
  const v = parseInt(vHex, 16);
  if (!isNaN(v) && v < 27) {
    const adjustedVHex = (v + 27).toString(16).padStart(2, "0");
    signature = signature.slice(0, -2) + adjustedVHex;
  } else if (isNaN(v)) {
    console.warn(
      "Could not parse 'v' value from signature for adjustment:",
      vHex
    );
  }
  console.log("CUSTOM SIGNATURE: ", `0x${signature}` as `0x${string}`);
  return `0x${signature}` as `0x${string}`;
};

export async function interactWithSafe(
  para: ParaWeb,
  recipient: string,
  amount: string
) {
  const paraAccount = createParaAccount(para);

  const paraViemClient = createParaViemClient(para, {
    account: paraAccount,
    chain: sepolia,
    transport: http(RPC_ETHSEPOLIA, {
      timeout: 10000,
      retryDelay: 1000,
    }),
  });

  const walletClient = createPublicClient({
    chain: sepolia,
    transport: http(RPC_ETHSEPOLIA, {
      timeout: 10000,
      retryDelay: 1000,
    }),
  });

  const signerAddress = paraAccount.address;

  
  const safeAccountConfiguration: SafeAccountConfig = {
    owners: [signerAddress],
    threshold: 1,
  };

  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig: safeAccountConfiguration,
  };

  const protocolKit = await Safe.init({
    provider: paraViemClient.transport,
    signer: signerAddress,
    predictedSafe
  });

  const safeAddress = await protocolKit.getAddress();

  const owners = await protocolKit.getOwners();
  const threshold = await protocolKit.getThreshold();

  console.log(owners, threshold);
  const safeTransactionData: MetaTransactionData = {
    to: recipient,
    value: parseEther(amount).toString(),
    data: "0x",
    operation: OperationType.Call,
  };

  const safeTransaction = await protocolKit.createTransaction({
    transactions: [safeTransactionData],
  });

  const signedTransaction = await protocolKit.signTransaction(safeTransaction);

  const executeTxResponse = await protocolKit.executeTransaction(
    signedTransaction
  );

  await walletClient.waitForTransactionReceipt({
    hash: executeTxResponse.hash as `0x${string}`,
  });

  return { protocolKit, safeAddress };
}
