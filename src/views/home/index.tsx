import reaact, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import useIma from "../../hooks/useIma";

import MainLayout from "../../layouts/main";

function Home() {
  const [isMinting, setIsMinting] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  const {
    mint,
    refetchIma,
    totalSupply,
    dnaPreview,
    image,
    isConnected,
    address,
  } = useIma();

  const getImasData = useCallback(async () => {
    if (!isConnected) return;
    return refetchIma();
  }, [totalSupply.isSuccess, dnaPreview.isSuccess, image.isSuccess, address]);

  const mintHandler = async () => {
    try {
      setIsMinting(true);
      await mint();

      const urlImage = refetchIma();
      setImageSrc(urlImage);

      setIsMinting(false);
      toast("Minted successfully");
    } catch (error) {
      toast.error("Error while minting. Try again.");
      setIsMinting(false);
      console.error("mintHander error: ", error);
    }
  };

  const getImaDataHandler = async () => {
    try {
      const nesUrlImage = await getImasData();
      if (nesUrlImage) setImageSrc(nesUrlImage);
    } catch (error) {
      toast.error("Error while update. Try again.");
      console.error("getImaDataHandler error: ", error);
    }
  };

  return (
    <MainLayout>
      <div className="text-slate-300 w-full min-h-full flex justify-evenly items-center ">
        <section className="flex flex-col-reverse md:flex-row items-center space-x-8 md:space-x-10 w-3/4">
          <div className="flex-1 space-x-5 md:space-x-10">
            <p className="text-5xl max-w-96 p-8 rounded-md bg-[#000000aa]">
              Create avatars representing NFTs with the{" "}
              <span className="text-cyan-400">network of your choice</span>.
            </p>
            <div className="space-x-4 sm:space-x-6 flex flex-col sm:flex-row mt-4">
              <button
                className="rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold"
                disabled={
                  !totalSupply.isSuccess ||
                  !dnaPreview.isSuccess ||
                  !image.isSuccess ||
                  isMinting
                }
                onClick={mintHandler}
              >
                {isMinting ? "Minting..." : "Get an Avatar"}
              </button>
              <button className="rounded-full font-semibold px-6 border-2 border- border-cyan-400 hover:border-cyan-500 disabled:border-cyan-800">
                <Link to="/imas">Gallery</Link>
              </button>
            </div>
          </div>
          <div className="flex-1 flex-col justify-center items-center w-full ">
            <div className="w-full flex justify-center">
              <img
                style={{ filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0))" }}
                className="w-60"
                src={isConnected ? imageSrc : "https://avataaars.io/"}
                alt="Ima NFT"
                loading="lazy"
              />
            </div>
            {isConnected ? (
              <div className="w-full flex flex-col items-center">
                <div className="mt-2">
                  <span>
                    Next ID:
                    <span className="ml-1 bg-cyan-400">1</span>
                  </span>
                  <span className="ml-2">
                    Address:
                    <span className="ml-1 bg-cyan-400">0x0000...0000</span>
                  </span>
                </div>
                <button
                  className="mt-4 rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold max-w-min"
                  onClick={getImaDataHandler}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <span className="mt-2 rounded-md bg-[#000000aa] px-8 font-bold">
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
