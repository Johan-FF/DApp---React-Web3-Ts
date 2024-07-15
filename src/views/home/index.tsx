import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import useIma from "../../hooks/useIma";

function Home() {
  const { isActive } = useWeb3React();
  const [maxSupply, setMaxSupply] = useState(0);
  const [ima, setIma] = useState<any>(undefined);

  useEffect(() => {
    setIma(useIma());
  }, []);

  const getMaxSupply = useCallback(async () => {
    if (typeof ima === "undefined") return;

    const result = await ima.methods.maxSupply().call();
    setMaxSupply(result);
  }, [ima]);

  useEffect(() => {
    getMaxSupply();
  }, [getMaxSupply]);

  if (!isActive) return <p>Connect your wallet...</p>;

  return (
    <>
      <h1>Max Supply: {maxSupply}</h1>
    </>
  );
}

export default Home;
