import { initializeSafe, deploySafe } from "../../clients/Safe";
import { useAccount, useClient } from "@getpara/react-sdk";
import { useState, useEffect } from "react";
import Transactions from "./Transaction";

export default function Safe() {
  const { data: account } = useAccount();
  const [loading, setLoading] = useState(false);
  const [safeAcc, setSafeAcc] = useState("");
  const [deployed, setIsDeployed] = useState(false);
  const para = useClient();

  const handleSafe = async () => {
    if (account) {
      setLoading(true);
      try {
        if (para) {
          const data = await initializeSafe(para);
          const safeAddress = data?.safeAddress;
          const isDeployed = data?.isDeployed;
          if (isDeployed) setIsDeployed(true);
          if (safeAddress) setSafeAcc(safeAddress);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeploy = async () => {
    setLoading(true);
    try {
      if (para) {
        const data = await deploySafe(para);
        const safeAddress = data?.safeAddress;
        const isDeployed = data?.isDeployed;
        if (isDeployed) setIsDeployed(true);
        if (safeAddress) setSafeAcc(safeAddress);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSafe();
  }, [account]);

  return (
    <div className="w-screen h-screen space-y-4 flex flex-col justify-center items-center text-white  bg-orange-900">
      <h1 className="text-white text-4xl font-bold">Safe + CapsulePara</h1>
      {safeAcc && (
        <>
          <p className="text-white font-bold text-center w-full">
            Safe Address:
          </p>
          <p className="text-white font-bold text-center w-full">{safeAcc}</p>
        </>
      )}
      {deployed ? (
        <Transactions />
      ) : (
        <button
          type="button"
          className="text-white bg-orange-800 hover:bg-transparent border-2 border-white  hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center  dark:focus:ring-blue-800"
          onClick={handleDeploy}
        >
          {
          loading ? "Deploying SFA..." : "Deploy safe smart account"
          
          }
        </button>
      )}
    </div>
  );
}
