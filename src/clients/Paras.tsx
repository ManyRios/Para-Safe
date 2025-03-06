import Para, { Environment } from "@getpara/react-sdk";

const CapsuleParasApi = import.meta.env.VITE_PARA_API_KEY;

const paras = new Para(Environment.BETA , CapsuleParasApi);

export default paras;