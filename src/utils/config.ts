import { protocolKit } from "../clients/Safe"


export const safeAddress = await protocolKit.getAddress();

export const deploySmart = async () => {
   await protocolKit.createSafeDeploymentTransaction()
   return await protocolKit.getSafeProvider().getExternalSigner()
}