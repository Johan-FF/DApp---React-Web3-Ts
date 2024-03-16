import { useMemo } from "react";

const useTruncatedAddress = (account: any) => {
  const truncated = useMemo(
    () => `${account?.substr(0, 7)}...${account?.substr(-5)}`,
    [account]
  );

  return truncated;
};

export default useTruncatedAddress;
