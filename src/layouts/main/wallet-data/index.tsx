import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

function WalletData() {
  const {
    address,
    addresses,
    chain,
    chainId,
    connector,
    isConnected,
    isReconnecting,
    isConnecting,
    isDisconnected,
    status,
  } = useAccount();
  const [balance, setBalance] = useState(0);
  const [isSupportedChain, setIsSupportedChain] = useState(true);
  // const { active, activate, deactivate, account, error, library } = useWeb3React();

  // const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    connector?.connect();
    // activate(connector);
    localStorage.setItem("IMANFT-previouslyConnected", "true");
  }, [isConnected]);

  const disconnect = () => {
    // deactivate();
    connector?.disconnect();
    localStorage.removeItem("IMANFT-previouslyConnected");
  };

  // const getBalance = useCallback(async () => {
  //   const toSet = await library.eth.getBalance(account);
  //   setBalance((toSet / 1e18).toFixed(2));
  // }, [library?.eth, account]);

  // useEffect(() => {
  //   if (active) getBalance();
  // }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("IMANFT-previouslyConnected") === "true")
      connect();
  }, [connect]);

  const truncatedAddress = useTruncatedAddress(address);

  return (
    <section className="flex items-center">
      {isConnected ? (
        <div className="bg-cyan-400 rounded-full">
          <span>
            <Link to="/imas">{truncatedAddress}</Link>
          </span>
          <span className="hidden md:block solid text-sm ml-1">
            ~{balance} Ξ
          </span>
          <IconButton onClick={disconnect}>
            <CloseIcon />
          </IconButton>
        </div>
      ) : (
        <div>
          <button
            className="bg-cyan-400  size-min"
            onClick={connect}
            disabled={!isSupportedChain}
          >
            {!isSupportedChain ? "Unsupported Chain" : "Connect Chain"}
          </button>
          {isConnected ? <h3>Wallet {truncatedAddress}</h3> : <ConnectButton />}
        </div>
      )}
    </section>
  );
}

export default WalletData;
