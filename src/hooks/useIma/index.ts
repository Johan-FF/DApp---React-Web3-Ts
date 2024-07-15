import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import ImaArtifact from "../../config/web3/artifacts/Ima";

const { address, abi } = ImaArtifact;

const useIma = () => {
  const { isActive, chainId } = useWeb3React();

  const imas = useMemo(() => {
    if (!isActive) return;

    const index = typeof chainId === "undefined" ? 0 : chainId;

    // return new connector.provider.eth.Contract(abi, address[index]);
    // @ts-ignore
    const web3 = new Web3(window.ethereum);
    // @ts-ignore
    return new web3.eth.Contract(abi, address[index]);
  }, [isActive, chainId /*, connector.provider?.eth?.Contract*/]);

  return imas;
};

export default useIma;
