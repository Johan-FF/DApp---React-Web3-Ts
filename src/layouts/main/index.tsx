import { ReactNode, useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";

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
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#001e1e",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push",
          },
          onHover: {
            enable: false,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#22d3ee",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 250,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "triangle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <main className="min-h-screen relative">
      {init ? <Particles id="tsparticles" options={options} /> : ""}
      <div className="absolute top-0 left-0 h-full w-full flex flex-col">
        <section className="w-full">
          <div className="text-slate-400 bg-[#000000aa] min-h-16 py-2 px-4 border-b-2 border-b-solid border-b-cyan-400 flex items-center justify-start">
            <IconButton
              className="flex md:hidden"
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <div className="space-x-8 flex flex-1 items-center">
              <span className="flex items-center">
                <img
                  className="w-16"
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
      </div>
    </main>
  );
}

export default MainLayout;
