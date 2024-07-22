import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/main";
import RequestAccess from "../../components/request-access";
import Loading from "../../components/loading";
import ImaCard from "../../components/ima-card";

import useIma from "../../hooks/useIma";
import { useImaData } from "../../hooks/useImaData";

function Ima() {
  const { tokenId } = useParams();
  const { isConnected, address } = useIma();
  const { loading, ima } = useImaData(Number(tokenId));

  if (!isConnected) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <MainLayout>
      <section className="space-x-8 md:space-x-10 py-5 flex flex-col md:flex-row">
        {ima ? (
          <>
            <div>
              <span className="mx-auto md:mx-0">
                <ImaCard name={ima.name} image={ima.image} />
              </span>
              <button
                disabled={address !== ima.owner}
                className="rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold"
              >
                {address !== ima.owner
                  ? "You are not the owner..."
                  : "Transfer"}
              </button>
            </div>
            <div className="w-full space-x-5">
              <h2>{ima.name}</h2>
              <p className="text-xl">{ima.description}</p>
              <p className="font-bold">
                DNA:
                <span className="ml-2 rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold">
                  {ima.dna}
                </span>
              </p>
              <p className="font-bold">
                Owner:
                <span className="ml-2 rounded-full px-6 bg-cyan-400 hover:bg-cyan-500 disabled:bg-cyan-800 text-black font-semibold">
                  {ima.owner}
                </span>
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Atributo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ima.attributes).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>
                        <span>{value ? value.toString() : "NN"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </section>
    </MainLayout>
  );
}

export default Ima;
