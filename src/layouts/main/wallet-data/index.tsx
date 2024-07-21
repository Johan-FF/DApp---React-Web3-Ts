import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import useIma from "../../../hooks/useIma";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

function WalletData() {
  const { address, connector, isConnected, balanceOf } = useIma();

  const disconnect = () => {
    try {
      connector?.disconnect();
      toast("Disconnect successfully");
    } catch (error) {
      toast.error("Error while disconnect. Try again.");
      console.error("disconnect error: ", error);
    }
  };

  const truncatedAddress = useTruncatedAddress(address);

  return (
    <section className="flex items-center">
      {isConnected ? (
        <div className="border-2 border-cyan-400 rounded-md flex justify-evenly items-center">
          <span className="ml-8 hover:text-cyan-400 hover:cursor-pointer">
            <Link to={`/imas?address=${address}`}>{truncatedAddress}</Link>
          </span>
          <span className="hidden md:block text-sm ml-8 font-bold">
            ~
            {balanceOf.isLoading ? (
              <p className="opacity-50">Loading...</p>
            ) : (
              balanceOf.data?.toString()
            )}{" "}
            Ξ
          </span>
          <IconButton className="ml-8" onClick={disconnect}>
            <CloseIcon className="stroke-cyan-400" />
          </IconButton>
        </div>
      ) : (
        <div>
          <ConnectButton label="Connect Wallet" />
        </div>
      )}
    </section>
  );
}

export default WalletData;
