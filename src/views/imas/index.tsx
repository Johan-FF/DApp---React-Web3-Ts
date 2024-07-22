import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { SearchSharp } from "@mui/icons-material";

import MainLayout from "../../layouts/main";
import ImaCard from "../../components/ima-card";
import Loading from "../../components/loading";
import RequestAccess from "../../components/request-access";

import useIma from "../../hooks/useIma";
import { useImasData } from "../../hooks/useImaData";

const isValidAddress = (address: string) => {
  if (address.startsWith("0x") && address.length === 42) {
    const hexPart = address.slice(2);
    const hexRegExp = /^[0-9A-Fa-f]+$/;
    return hexRegExp.test(hexPart);
  }
  return false;
};

const Imas = () => {
  const { isConnected } = useIma();

  const { search } = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState(
    new URLSearchParams(search).get("address")
  );
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);

  const { imas, loading } = useImasData(
    submitted && validAddress ? address : null
  );

  // @ts-ignore
  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = () => {
    // event.preventDefault();
    if (address) {
      const isValid = isValidAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) navigate(`/imas?address=${address}`);
    } else {
      navigate("/imas");
    }
  };

  if (!isConnected) return <RequestAccess />;
  console.log("en pagina", imas);

  return (
    <MainLayout>
      <section className="w-full pt-4 flex justify-center items-center">
        <form onSubmit={submit} className="w-full">
          <div className="mb-3 flex items-center w-full">
            <span className="flex justify-center items-center w-4/5 rounded-2xl p-2 bg-[#000000aa]">
              <SearchSharp className="stroke-cyan-400" />
              <input
                className="p-2 pl-4 w-full text-lg rounded-2xl text-white bg-[#000000aa] border-none selection:border-none"
                value={address ? address : ""}
                onChange={handleAddressChange}
                placeholder="Search by address"
              />
            </span>
            <button
              type="submit"
              className="h-7 rounded-full ml-8 px-6 text-lg bg-cyan-400 hover:bg-cyan-500 text-black font-semibold"
            >
              Search
            </button>
          </div>
          {submitted && !validAddress && (
            <span className="text-rose-700 font-semibold">Invalid Address</span>
          )}
        </form>
      </section>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="gap-6 grid grid-cols-[repeat(auto-fill, minmax(250px, 1fr))] "
          // templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        >
          {imas.map(({ name, image, tokenId }) => (
            <>
              <ImaCard key={tokenId} image={image} name={name} />
              <Link key={tokenId} to={`/punks/${tokenId}`}>
                <ImaCard image={image} name={name} />
              </Link>
            </>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default Imas;
