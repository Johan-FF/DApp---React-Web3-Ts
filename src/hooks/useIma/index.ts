import { useCallback, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

import ImaArtifact from "../../config/wagmi/artifacts/Ima";
import { config } from "../../config/wagmi";

const useIma = () => {
  const { address, isConnected, connector } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const mint = async () => {
    try {
      const txHash = await writeContractAsync({
        abi: ImaArtifact.abi,
        address: `0x${ImaArtifact.address[0]}`,
        functionName: "mint",
      });

      await waitForTransactionReceipt(config, {
        confirmations: 1,
        hash: txHash,
      });
    } catch (error) {
      console.error("mint error: ", error);
    }
  };

  const totalSupply = useReadContract({
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    functionName: "totalSupply",
  });

  const dnaPreview = useReadContract({
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    functionName: "deterministicPseudoRandomDNA",
    args: [totalSupply.data, address],
  });

  const image = useReadContract({
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    functionName: "imageByDNA",
    args: [dnaPreview.data],
  });

  const balanceOf = useReadContract({
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    functionName: "balanceOf",
    args: [address],
  });

  const getImasData = useCallback(async () => {
    if (!isConnected) return;
    return refetchIma();
  }, [totalSupply.isSuccess, dnaPreview.isSuccess, image.isSuccess, address]);

  const refetchIma = () => {
    totalSupply.refetch();
    dnaPreview.refetch();
    image.refetch();
    const formatedURL = image.data
      ? image.data.toString().replace("getavataaars.com", "avataaars.io")
      : "";
    return formatedURL;
  };

  const imas = useMemo(() => {
    return {
      totalSupply,
      dnaPreview,
      image,
      balanceOf,
      isConnected,
      connector,
      address,
      getImasData,
      refetchIma,
      mint,
    };
  }, [isConnected, address]);

  return imas;
};

export default useIma;
