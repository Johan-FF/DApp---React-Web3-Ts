import { useCallback, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { Link } from "react-router-dom";

import ImaArtifact from "../../config/web3/artifacts/Ima";

import MainLayout from "../../layouts/main";

function Home() {
  const [imageSrc, setImageSrc] = useState("");
  const { address, isConnected } = useAccount();
  // const { data, isLoading, refetch } = useReadContract({
  const totalSupply = useReadContract({
    abi: ImaArtifact.abi,
    address: `0x${ImaArtifact.address[0]}`,
    functionName: "totalSupply",
    // args: [address],
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

  const getImasData = useCallback(async () => {
    // const totalSupply = await platziPunks.methods.totalSupply().call();
    // const dnaPreview = await platziPunks.methods
    //   .deterministicPseudoRandomDNA(totalSupply, account)
    //   .call();
    // const image = await platziPunks.methods.imageByDNA(dnaPreview).call();
    if (!isConnected) return;

    totalSupply.refetch();
    dnaPreview.refetch();
    image.refetch();
    setImageSrc(image.data ? image.data.toString() : "");
  }, [totalSupply.isSuccess, dnaPreview.isSuccess, image.isSuccess, address]);

  useEffect(() => {
    getImasData();
  }, [getImasData]);

  return (
    <MainLayout>
      <div className="text-slate-300 w-full min-h-full flex justify-evenly items-center ">
        <section
          className="flex flex-col-reverse md:flex-row items-center space-x-8 md:space-x-10 w-3/4"
          // align={"center"}
          // spacing={{ base: 8, md: 10 }}
          // py={{ base: 20, md: 28 }}
          // direction={{ base: "column-reverse", md: "row" }}
        >
          <div
            className="flex-1 space-x-5 md:space-x-10"
            //  flex={1} spacing={{ base: 5, md: 10 }}
          >
            <p className="text-5xl max-w-96 p-8 rounded-md bg-[#000000aa]">
              Create avatars representing NFTs with the{" "}
              <span className="text-cyan-400">network of your choice</span>.
            </p>
            <div
              className="space-x-4 sm:space-x-6 flex flex-col sm:flex-row mt-4"
              // spacing={{ base: 4, sm: 6 }}
              // direction={{ base: "column", sm: "row" }}
            >
              <button
                className="rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold"
                // rounded={"full"}
                // size={"lg"}
                // fontWeight={"normal"}
                // px={6}
                // colorScheme={"green"}
                // bg={"green.400"}
                // _hover={{ bg: "green.500" }}
                disabled={
                  !totalSupply.isSuccess ||
                  !dnaPreview.isSuccess ||
                  !image.isSuccess
                }
              >
                Get an Avatar
              </button>
              <button
                className="rounded-full font-semibold px-6 border-2 border- border-cyan-400 hover:border-cyan-500 disabled:border-cyan-800"
                // rounded={"full"}
                // size={"lg"}
                // fontWeight={"normal"}
                // px={6}
              >
                <Link to="/imas">Gallery</Link>
              </button>
            </div>
          </div>
          <div
            className="flex-1 flex-col justify-center items-center w-full "
            // flex={1}
            // direction="column"
            // justify={"center"}
            // align={"center"}
            // position={"relative"}
            // w={"full"}
          >
            <div className="w-full flex justify-center">
              <img
                style={{ filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0))" }}
                className="w-60"
                // src="./svg/Ima-NFT.svg"
                src={isConnected ? imageSrc : "https://avataaars.io/"}
                alt="Ima NFT"
                loading="lazy"
              />
            </div>
            {/* <Image src={isConnected ? imageSrc : "https://avataaars.io/"} /> */}
            {isConnected ? (
              <div className="w-full flex flex-col items-center">
                <div
                  className="mt-2"
                  // mt={2}
                >
                  <span>
                    Next ID:
                    <span
                      className="ml-1 bg-cyan-400"
                      // ml={1}
                      // colorScheme="green"
                    >
                      1
                    </span>
                  </span>
                  <span
                    className="ml-2"
                    //  ml={2}
                  >
                    Address:
                    <span
                      className="ml-1 bg-cyan-400"
                      //  ml={1} colorScheme="green"
                    >
                      0x0000...0000
                    </span>
                  </span>
                </div>
                <button
                  className="mt-4 rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold max-w-min"
                  onClick={getImasData}
                  // mt={4}
                  // size="xs"
                  // colorScheme="green"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <span
                  className="mt-2 rounded-md bg-[#000000aa] px-8 font-bold"
                  // mt={2}
                >
                  Disconnected Wallet
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;
