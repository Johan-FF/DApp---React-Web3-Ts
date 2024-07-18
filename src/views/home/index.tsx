import MainLayout from "../../layouts/main";

function Home() {
  return (
    <MainLayout>
      <div className="text-slate-300 w-full min-h-full flex justify-evenly items-center ">
        <p className="text-5xl max-w-96 p-8 rounded-r-md bg-[#000000aa]">
          Create avatars representing NFTs with the{" "}
          <span className="text-cyan-400">network of your choice</span>.
        </p>
        <img
          style={{ filter: "drop-shadow(10px 10px 10px rgba(0, 0, 0))" }}
          className="w-60"
          src="./svg/Ima-NFT.svg"
          alt="Ima NFT"
          loading="lazy"
        />
      </div>
    </MainLayout>
  );
}

export default Home;
