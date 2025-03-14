import { useState, useEffect } from "react";
import ParaModalCapsule from "./components/ParaModal";
import Navigation from "./components/Navigation";
import { useClient, WalletEntity } from "@getpara/react-sdk";
import Hero from "./components/Hero";
import Safe from "./components/Safe";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wallet, setWallet] = useState<WalletEntity | undefined>(undefined);
  const [isLogged, setIsLogged] = useState(false);
  const para = useClient();

  useEffect(() => {
    fetchWallet();
  }, [para]);

  async function fetchWallet() {
    try {
      if (para) {
        const wallets = await para?.fetchWallets();
        if (wallets[0]) {
          console.log(wallet)
          setWallet(wallets[0]);
        }
        setIsLogged(true);
      }
    } catch (err) {
      setIsLogged(true);
      console.log(err)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center space-y-2">
      <Navigation setIsModalOpen={setIsModalOpen} isLogged={isLogged} />
      {isLogged ? (
        <Safe />
      ) : (
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
