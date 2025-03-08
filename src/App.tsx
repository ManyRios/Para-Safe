import { useState, useEffect } from "react";
import ParasModalCapsule from "./components/ParasModal";
import Navigation from "./components/Navigation";
import para from "./clients/Para";
import Hero from "./components/Hero";
import Safe from "./components/Safe";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (para.getAddress()) {
        setIsLogged(true);
    }else {
      setIsLogged(false);
    }
   }, [isLogged]);

  return (
    <div className="w-screen h-screen flex justify-center items-center space-y-2">
      <Navigation setIsModalOpen={setIsModalOpen} isLogged={isLogged} />
      {isLogged ? <Safe /> : <Hero isLogged={isLogged} setIsModalOpen={setIsModalOpen}/>}
      <ParasModalCapsule
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      ;
    </div>
  );
}

export default App;
