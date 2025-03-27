import { useState } from "react";
import { useAccount } from "@getpara/react-sdk";
import ParaModalCapsule from "./components/ParaModal";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Safe from "./components/Safe";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: account } = useAccount();

  const isLogged = account ? account.isConnected : false;

  return (
    <div className="w-screen h-screen flex justify-center items-center space-y-2">
      <Navigation setIsModalOpen={setIsModalOpen} isLogged={isLogged} />
      {account?.isConnected && <Safe />}
      {!account?.isConnected && (
        <Hero isLogged={isLogged} setIsModalOpen={setIsModalOpen} />
      )}
      <ParaModalCapsule
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      ;
    </div>
  );
}

export default App;
