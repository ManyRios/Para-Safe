import { OAuthMethod, ParaModal, AuthLayout } from "@getpara/react-sdk";

interface IParaModal {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
export default function ParaModalCapsule({
  isModalOpen,
  setIsModalOpen,
}: IParaModal) {
  return (
    <ParaModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(!isModalOpen)}
      logo={""}
      theme={{}}
      oAuthMethods={
        [
          OAuthMethod.GOOGLE,
          OAuthMethod.DISCORD,
          OAuthMethod.TWITTER,
        ]
      }
      authLayout={[AuthLayout.AUTH_FULL ,AuthLayout.EXTERNAL_FULL]}
      recoverySecretStepEnabled={true}
      onRampTestMode={true}
    />
  );
}
