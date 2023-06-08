import { ContractSummary } from "./types";
import { ENTRYPOINT_ABI } from "./abi";

export const entrypointContract: ContractSummary = {
  name: "Entrypoint",
  abi: ENTRYPOINT_ABI,
  deploy: {
    80001: {
      address: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      explorer: "https://mumbai.polygonscan.com/address/0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    },
  },
};
