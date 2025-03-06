import { useState } from "react";
import { OAuthMethod, ParaModal } from "@getpara/react-sdk";
import Navigation from "./components/Navigation";
import paras from "./clients/Paras";
import "@getpara/react-sdk/styles.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Navigation setIsModalOpen={setIsModalOpen}/>
      <ParaModal
        para={paras}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        logo={""}
        theme={{}}
        oAuthMethods={["GOOGLE","FARCASTER","TELEGRAM","DISCORD","TWITTER"] as OAuthMethod[]}
        authLayout={["AUTH:FULL", "EXTERNAL:FULL"]}
        recoverySecretStepEnabled
        onRampTestMode={true}
      />
      ;
    </div>
  );
}

export default App;
