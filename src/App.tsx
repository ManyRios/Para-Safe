import { useState, useEffect } from "react";
import ParaModalCapsule from "./components/ParaModal";
import Navigation from "./components/Navigation";
import { useClient } from "@getpara/react-sdk";
import Hero from "./components/Hero";
import Safe from "./components/Safe";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const para = useClient();
  const address = para?.getAddress();

  useEffect(() => {
    if (address != undefined) {
      console.log('first')
      setIsLogged((prevIsLogged) => !prevIsLogged);
    }
 }, [address]); 
 

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
