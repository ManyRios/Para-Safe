import { OAuthMethod, ParaModal } from "@getpara/react-sdk";
import paras from "../clients/Para";

interface IParasModal {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
}


export default function ParasModalCapsule({
    isModalOpen,
    setIsModalOpen
}: IParasModal) {
    return (
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
    )
}