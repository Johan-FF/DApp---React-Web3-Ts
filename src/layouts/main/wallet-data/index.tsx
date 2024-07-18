import { Link } from "react-router-dom";
import { useCallback, useEffect } from "react";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

function WalletData() {
  const { address, connector, isConnected } = useAccount();
  // const [isSupportedChain, setIsSupportedChain] = useState(true);

  const connect = useCallback(() => {
    connector?.connect();
    localStorage.setItem("IMANFT-previouslyConnected", "true");
  }, [isConnected]);

  const disconnect = () => {
    connector?.disconnect();
    localStorage.removeItem("IMANFT-previouslyConnected");
  };

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
          <IconButton onClick={disconnect}>
            <CloseIcon />
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
