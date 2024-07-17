import { ReactNode, useState } from "react";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import NavLink from "./nav-link";
import Footer from "./footer";
import WalletData from "./wallet-data";

const LINKS = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Imas",
    to: "/imas",
  },
];

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="mx-auto max-w-7xl w-full bg-emerald-800 px-4">
        <div className="text-slate-400 min-h-16 py-2 px-4 border-b-2 border-b-solid border-b-cyan-400 flex items-center justify-between">
          <IconButton
            className="flex md:hidden"
            aria-label={"Open Menu"}
            onClick={isOpen ? onClose : onOpen}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <div className="space-x-8 flex items-center">
            <span className="flex items-center">
              <img
                className="w-20"
                src="./svg/Ima-NFT.svg"
                alt="Ima NFT"
                loading="lazy"
              />
              <h1 className="text-3xl text-slate-400 mt-1 ml-1">Ima NFT</h1>
            </span>
            <span className="space-x-4 hidden md:flex">
              {LINKS.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </span>
          </div>
          <WalletData />
        </div>

        {isOpen ? (
          <div className="pb-4 md:hidden">
            <span className="space-x-4">
              {LINKS.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </span>
          </div>
        ) : null}
      </section>
      <section className="mx-auto flex-1 p-4 max-w-7xl w-full">
        {children}
      </section>
      <Footer />
    </main>
  );
}

export default MainLayout;
