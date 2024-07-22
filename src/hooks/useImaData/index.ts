import { useCallback, useEffect, useState } from "react";
import { useReadContract } from "wagmi";

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
  const tokenURI = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "tokenURI",
  });
  console.log(tokenURI);
  const tokenDNA = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "tokenDNA",
  });
  console.log(tokenDNA);
  const ownerOf = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "ownerOf",
  });
  console.log(ownerOf);
  const getAccessoriesType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getAccessoriesType",
  });
  console.log(getAccessoriesType);
  const getClotheColor = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getClotheColor",
  });
  console.log(getClotheColor);
  const getClotheType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getClotheType",
  });
  console.log(getClotheType);
  const getEyeType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getEyeType",
  });
  console.log(getEyeType);
  const getEyeBrowType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getEyeBrowType",
  });
  console.log(getEyeBrowType);
  const getFacialHairType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getFacialHairType",
  });
  console.log(getFacialHairType);
  const getFacialHairColor = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getFacialHairColor",
  });
  console.log(getFacialHairColor);
  const getHairColor = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getHairColor",
  });
  console.log(getHairColor);
  const getHatColor = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getHatColor",
  });
  console.log(getHatColor);
  const getGraphicType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getGraphicType",
  });
  console.log(getGraphicType);
  const getMouthType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getMouthType",
  });
  console.log(getMouthType);
  const getSkinColor = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getSkinColor",
  });
  console.log(getSkinColor);
  const getTopType = useReadContract({
    ...wagmiImaContract(tokenId),
    functionName: "getTopType",
  });
  console.log(getTopType);

  const responseMetadata = await fetch(
    tokenURI.data ? tokenURI.data.toString() : "https://avataaars.io/"
  );
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    attributes: {
      accessoriesType: getAccessoriesType.data,
      clotheColor: getClotheColor.data,
      clotheType: getClotheType.data,
      eyeType: getEyeType.data,
      eyeBrowType: getEyeBrowType.data,
      facialHairColor: getFacialHairColor.data,
      facialHairType: getFacialHairType.data,
      hairColor: getHairColor.data,
      hatColor: getHatColor.data,
      graphicType: getGraphicType.data,
      mouthType: getMouthType.data,
      skinColor: getSkinColor.data,
      topType: getTopType.data,
    },
    tokenURI,
    dna: tokenDNA.data,
    owner: ownerOf.data,
    ...metadata,
  };
};

const useImasData = (owner: null | string = null) => {
  const [imas, setImas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { totalSupply } = useIma();

  const update = useCallback(async () => {
    if (!totalSupply.isSuccess) return;

    setLoading(true);

    let tokenIds;

    if (owner != null) {
      const currentTotalSupply = await totalSupply.data;
      console.log(currentTotalSupply, tokenIds);
      tokenIds = Array.from(
        { length: Number(currentTotalSupply) },
        (_, index) => index
      );
      console.log(currentTotalSupply, tokenIds);
    } else {
      const balanceOf = useReadContract({
        abi: ImaArtifact.abi,
        address: `0x${ImaArtifact.address[0]}`,
        functionName: "balanceOf",
        args: [owner],
      });
      console.log(balanceOf);

      tokenIds = Array.from(
        { length: Number(balanceOf.data) },
        (_, index) => index
      );
    }

    const imasPromise = tokenIds.map((tokenId) => getImaData(tokenId));

    const imas = await Promise.all(imasPromise);
    console.log("imas", imas);

    setImas(imas);
    setLoading(false);
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

const useImaData = (tokenId: number | null = null) => {
  const [ima, setIma] = useState<any>();
  const [loading, setLoading] = useState(true);

  const update = useCallback(async () => {
    if (tokenId != null) {
      setLoading(true);

      const toSet = await getImaData(tokenId);
      setIma(toSet);

      setLoading(false);
    }
  }, [tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    ima,
    update,
  };
};

export { useImasData, useImaData };
