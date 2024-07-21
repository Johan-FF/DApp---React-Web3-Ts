import { useMemo } from "react";
import { getAccount } from "wagmi/actions";
import { useReadContract } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";

import ImaArtifact from "../../config/wagmi/artifacts/Ima";
import { config } from "../../config/wagmi";

const useIma = () => {
  const { address, isConnected, connector } = getAccount(config);
  // const { writeContract } = writeContract();
  // const {  } = writeContract();

  const imas = useMemo(() => {
    const mint = async () => {
      try {
        const txHash = await writeContract(config, {
          abi: ImaArtifact.abi,
          address: `0x${ImaArtifact.address[0]}`,
          functionName: "mint",
          args: [address],
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

    const refetchIma = () => {
      totalSupply.refetch();
      dnaPreview.refetch();
      image.refetch();
      const formatedURL = image.data
        ? image.data.toString().replace("getavataaars.com", "avataaars.io")
        : "";
      return formatedURL;
    };

    return {
      totalSupply,
      dnaPreview,
      image,
      balanceOf,
      isConnected,
      connector,
      address,
      refetchIma,
      mint,
    };
  }, [isConnected, address]);

  return imas;
};

export default useIma;
