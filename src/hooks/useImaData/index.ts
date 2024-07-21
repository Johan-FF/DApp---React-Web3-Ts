import { useCallback, useEffect, useState } from "react";
import { useReadContracts } from "wagmi";

import ImaArtifact from "../../config/wagmi/artifacts/Ima";
import useIma from "../useIma";

const wagmiImaContract = (tokenId: number) => {
  return {
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    args: [tokenId],
  } as const;
};

const getImaData = async (tokenId: number) => {
  // const [
  //   tokenURI,
  //   dna,
  //   owner,
  //   accessoriesType,
  //   clotheColor,
  //   clotheType,
  //   eyeType,
  //   eyeBrowType,
  //   facialHairColor,
  //   facialHairType,
  //   hairColor,
  //   hatColor,
  //   graphicType,
  //   mouthType,
  //   skinColor,
  //   topType,
  // ] = await Promise.all([]);

  const result = useReadContracts({
    contracts: [
      {
        ...wagmiImaContract(tokenId),
        functionName: "tokenURI",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "tokenDNA",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "ownerOf",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getAccessoriesType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getClotheColor",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getClotheType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getEyeType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getEyeBrowType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getFacialHairType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getHairColor",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getHatColor",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getGraphicType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getMouthType",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getSkinColor",
      },
      {
        ...wagmiImaContract(tokenId),
        functionName: "getTopType",
      },
    ],
  });
  console.log(result);

  // const responseMetadata = await fetch(
  //   result.data ? result.data[0].tokenURI : ""
  // );
  // const metadata = await responseMetadata.json();

  // return {
  //   tokenId,
  //   attributes: {
  //     accessoriesType,
  //     clotheColor,
  //     clotheType,
  //     eyeType,
  //     eyeBrowType,
  //     facialHairColor,
  //     facialHairType,
  //     hairColor,
  //     hatColor,
  //     graphicType,
  //     mouthType,
  //     skinColor,
  //     topType,
  //   },
  //   tokenURI,
  //   dna,
  //   owner,
  //   ...metadata,
  // };
};

const useImasData = () => {
  const [imas, setImas] = useState<void[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalSupply } = useIma();

  const update = useCallback(async () => {
    if (totalSupply) {
      setLoading(true);

      let tokenIds;

      const currentTotalSupply = await totalSupply.data;
      tokenIds = Array.from(
        { length: Number(currentTotalSupply) },
        (_, index) => index
      );

      const imasPromise = tokenIds.map((tokenId) => getImaData(tokenId));

      const imas = await Promise.all(imasPromise);

      setImas(imas);
      setLoading(false);
    }
  }, [totalSupply.data]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    imas,
    update,
  };
};

export { useImasData };
