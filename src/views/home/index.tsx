import { useCallback, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

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
  }, [isConnected, address]);

  useEffect(() => {
    getImasData();
  }, [getImasData]);

  return (
    <MainLayout>
      <div className="text-slate-300 w-full min-h-full flex justify-evenly items-center ">
        <img
          style={{ filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0))" }}
          className="w-60"
          src="./svg/Ima-NFT.svg"
          alt="Ima NFT"
          loading="lazy"
        />
        <section
          className="flex flex-col-reverse md:flex-row items-center space-x-8 md:space-x-10 py-20 md:py-28 "
          // align={"center"}
          // spacing={{ base: 8, md: 10 }}
          // py={{ base: 20, md: 28 }}
          // direction={{ base: "column-reverse", md: "row" }}
        >
          <div
            className="flex-1 space-x-5 md:space-x-10"
            //  flex={1} spacing={{ base: 5, md: 10 }}
          >
            <p className="text-5xl max-w-96 p-8 rounded-r-md bg-[#000000aa]">
              Create avatars representing NFTs with the{" "}
              <span className="text-cyan-400">network of your choice</span>.
            </p>
            <div
              className="space-x-4 sm:space-x-6 "
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"green"}
                bg={"green.400"}
                _hover={{ bg: "green.500" }}
                disabled={!platziPunks}
              >
                Obtén tu punk
              </Button>
              <Link to="/punks">
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                >
                  Galería
                </Button>
              </Link>
            </div>
          </div>
          <Flex
            flex={1}
            direction="column"
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Image src={active ? imageSrc : "https://avataaars.io/"} />
            {active ? (
              <>
                <Flex mt={2}>
                  <Badge>
                    Next ID:
                    <Badge ml={1} colorScheme="green">
                      1
                    </Badge>
                  </Badge>
                  <Badge ml={2}>
                    Address:
                    <Badge ml={1} colorScheme="green">
                      0x0000...0000
                    </Badge>
                  </Badge>
                </Flex>
                <Button
                  onClick={getPlatziPunksData}
                  mt={4}
                  size="xs"
                  colorScheme="green"
                >
                  Actualizar
                </Button>
              </>
            ) : (
              <Badge mt={2}>Wallet desconectado</Badge>
            )}
          </Flex>
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;
