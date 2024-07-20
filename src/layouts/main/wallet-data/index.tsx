import { Link } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";

import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ImaArtifact from "../../../config/web3/artifacts/Ima";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

function WalletData() {
  // const [balance, setBalance] = useState(0);
  const { address, connector, isConnected } = useAccount();
  const { data, isLoading } = useReadContract({
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    functionName: "balanceOf",
    args: [address],
  });
  // const [isSupportedChain, setIsSupportedChain] = useState(true);

  // const connect = useCallback(() => {
  //   connector?.connect();
  //   localStorage.setItem("IMANFT-previouslyConnected", "true");
  // }, [isConnected]);

  const disconnect = () => {
    connector?.disconnect();
    // localStorage.removeItem("IMANFT-previouslyConnected");
  };

  // useEffect(() => {
  //   if (localStorage.getItem("IMANFT-previouslyConnected") === "true")
  //     connect();
  // }, [connect]);

  const truncatedAddress = useTruncatedAddress(address);

  // const getBalance = useCallback(async () => {
  //   const toSet = await data;
  //   setBalance(parseInt((toSet / 1e18).toFixed(2)));
  // }, [connector, address]);

  // useEffect(() => {
  //   if (isConnected) getBalance();
  // }, [isConnected, getBalance]);

  return (
    <section className="flex items-center">
      {isConnected ? (
        <div className="border-2 border-cyan-400 rounded-md flex justify-evenly items-center">
          <span className="ml-8 hover:text-cyan-400 hover:cursor-pointer">
            <Link to={`/imas?address=${address}`}>{truncatedAddress}</Link>
          </span>
          <span className="hidden md:block text-sm ml-8 font-bold">
            ~
            {isLoading ? (
              <p className="opacity-50">Loading...</p>
            ) : (
              data?.toString() + " Ξ"
            )}
          </span>
          <IconButton className="ml-8" onClick={disconnect}>
            <CloseIcon className="stroke-cyan-400" />
          </IconButton>
        </div>
      ) : (
        <div>
          {isConnected ? (
            <h3>Wallet {truncatedAddress}</h3>
          ) : (
            <ConnectButton label="Connect Wallet" />
          )}
        </div>
      )}
    </section>
  );
}

export default WalletData;
