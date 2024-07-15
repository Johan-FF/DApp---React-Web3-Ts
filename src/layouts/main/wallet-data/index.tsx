import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";

import { connectors } from "../../../config/web3";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

function WalletData() {
  const [balance, setBalance] = useState(0);
  const [isSupportedChain, setIsSupportedChain] = useState(true);
  const { isActive, account, connector, chainId } = useWeb3React();

  const connect = useCallback(() => {
    connector.activate(connectors);
    localStorage.setItem("previouslyConnected", "true");
  }, [isActive]);

  const disconnect = () => {
    if (connector?.deactivate) {
      void connector.deactivate();
    } else {
      void connector.resetState();
    }
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    const toSet: any = await connector.provider?.request({
      method: "eth_getBalance",
      params: [account, "0x0"],
    });
    const balanceInEther = toSet / 1e18;
    setBalance(balanceInEther);
  }, [connector?.provider, account]);

  useEffect(() => {
    if (isActive) getBalance();
  }, [isActive, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  useEffect(() => {
    if (typeof chainId === "undefined") return;
    const isSupported = chainId == 11155111;
    setIsSupportedChain(isSupported);
    if (!isSupported) disconnect();
  }, [chainId]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <Flex alignItems={"center"}>
      {isActive ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/imas">{truncatedAddress}</Link>
          </TagLabel>
          <Badge
            display={{
              base: "none",
              md: "block",
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant={"solid"}
          colorScheme={"green"}
          size={"sm"}
          onClick={connect}
          disabled={!isSupportedChain}
        >
          {!isSupportedChain ? "Unsupported Chain" : "Connect Chain"}
        </Button>
      )}
    </Flex>
  );
}

export default WalletData;
