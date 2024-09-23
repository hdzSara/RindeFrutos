import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { Toaster } from "react-hot-toast";
import axios from "axios";



const Home = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Para manejar el estado del menú
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let key = window.localStorage.getItem("publicKey");
    setPublicKey(key);
    if (key) getBalances(key);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const signIn = async () => {
    const provider = window?.phantom?.solana;
    const { solana } = window;

    if (!provider?.isPhantom || !solana.isPhantom) {
      toast.error("Phantom no está instalado");
      setTimeout(() => {
        window.open("https://phantom.app/", "_blank");
      }, 2000);
      return;
    }

    let phantom;
    if (provider?.isPhantom) phantom = provider;

    const { publicKey } = await phantom.connect(); //conecta a phantom
        console.log("publicKey", publicKey.toString()); //muestra la publicKey
        setPublicKey(publicKey.toString()); //guarda la publicKey en el state
        window.localStorage.setItem("publicKey", publicKey.toString()); //guarda la publicKey en el localStorage

        toast.success("Tu Wallet esta conectada 👻");
    getBalances(publicKey);
  };

  const signOut = async () => {
    const { solana } = window;
    window.localStorage.removeItem("publicKey");
    setPublicKey(null);
    solana.disconnect();
    router.reload(window?.location?.pathname);
  };

  const getBalances = async (publicKey) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const balance = await connection.getBalance(new PublicKey(publicKey));
      const balancenew = balance / LAMPORTS_PER_SOL;
      setBalance(balancenew);
    } catch (error) {
      console.error("ERROR GET BALANCE", error);
      toast.error("Something went wrong getting the balance");
    }
  };
  const handleLogoClick = () => {
    router.push("/");
  };

  // Redirigir a la página de crear cuenta
  const handleCreateAccountClick = () => {
    router.push("/createaccount"); // Redirige a la página de youraccount
  };

  // Redirigir a la página de dispersión de recursos
  const handleDistributionClick = () => {
    router.push("/distribution"); // Redirige a la página de distribution
  };
  return (
    <div className="min-h-screen bg-green-100">
      {/* Barra de navegación */}
      <nav className="bg-green-50 flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center space-x-4">
        <img
            src="/img/banner.png"
            alt="Logo"
            className="w-12 h-12 cursor-pointer"
            onClick={handleLogoClick}
          />
          <h1 className="text-lg sm:text-2xl font-bold text-green-800">
            RINDE FRUTOS
          </h1>
        </div>

        {/* Ícono del menú hamburguesa para pantallas pequeñas */}
        <div className="block md:hidden">
          <button
            className="text-green-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex space-x-4">
        <button
            className="bg-green-400 text-white rounded-full px-4 py-2"
            onClick={handleDistributionClick} // Redirige a la página de distribución
          >
            Dispersión de recursos
          </button>
          <button
            className="bg-green-400 text-white rounded-full px-4 py-2"
            onClick={handleCreateAccountClick} // Redirige a la página de crear cuenta
          >
            Crea tu cuenta
          </button>
          <button className="bg-green-400 text-white rounded-full px-4 py-2" onClick={() => {
                                    signIn();
                                }}>
            Tu cuenta
          </button>
        </div>
      </nav>

      {/* Menú desplegable en pantallas pequeñas */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-2 p-4 bg-green-50">
        <button
            className="bg-green-400 text-white rounded-full px-4 py-2"
            onClick={handleDistributionClick} // Redirige a la página de distribución
          >
            Dispersión de recursos
          </button>
          <button
            className="bg-green-400 text-white rounded-full px-4 py-2"
            onClick={handleCreateAccountClick} // Redirige a la página de crear cuenta
          >
            Crea tu cuenta
          </button>
          <button className="bg-green-400 text-white rounded-full px-4 py-2" onClick={() => {
                                    signIn();
                                }}>
            Tu cuenta
          </button>
        </div>
      </div>

      {/* Contenido central */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 px-4 sm:px-20">
        {/* Texto a la izquierda */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold"
            style={{ color: "#347571" }}
          >
            La Secretaría de Agricultura y Desarrollo Rural rinde transparencia
            en la distribución de recursos económicos.
          </h2>
        </div>

        {/* Imagen a la derecha */}
        <div className="md:w-1/2">
          <img
            src="/img/computer.png"
            alt="Imagen de recursos"
            className="w-full"
          />
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Home;
