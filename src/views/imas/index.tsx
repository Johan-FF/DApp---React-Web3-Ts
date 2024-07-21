import ImaCard from "../../components/ima-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";

import useIma from "../../hooks/useIma";
import { useImasData } from "../../hooks/useImaData";

const Imas = () => {
  const { isConnected } = useIma();
  const { imas, loading } = useImasData();

  if (!isConnected) return <RequestAccess />;
  console.log(imas);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="gap-6 grid grid-cols-[repeat(auto-fill, minmax(250px, 1fr))] "
          // templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          {/* {imas.map(({ name, image, tokenId }) => (
            <ImaCard key={tokenId} image={image} name={name} />
          ))} */}
        </div>
      )}
    </>
  );
};

export default Imas;
