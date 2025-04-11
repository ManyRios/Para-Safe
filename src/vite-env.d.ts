/// <reference types="vite/client" />

import { Environment } from "@getpara/web-sdk";

interface ParasEnv {
  readonly VITE_CAPSULE_ENV: Environment.BETA;
  readonly VITE_PARA_API_KEY: string;
  readonly VITE_RPC_BASESEPOLIA: string;
  readonly VITE_RPC_ETHSEPOLIA: string;
  readonly VITE_INFURA_API: string;
}

interface ImportMeta {
  readonly env: ParasEnv;
}
