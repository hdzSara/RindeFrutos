import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { Toaster, toast } from "react-hot-toast";

const Distribution = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Para manejar el estado del menú
  const [balance, setBalance] = useState(0);
  const router = useRouter(); // Hook de router para redirigir

  useEffect(() => {
    const key = window.localStorage.getItem("publicKey");
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

    const { publicKey } = await provider.connect();
    setPublicKey(publicKey.toString());
    window.localStorage.setItem("publicKey", publicKey.toString());
    toast.success("Tu Wallet está conectada 👻");
    getBalances(publicKey);
  };

  const signOut = async () => {
    const { solana } = window;
    window.localStorage.removeItem("publicKey");
    setPublicKey(null);
    solana.disconnect();
    toast.success("Wallet desconectada 👋");
  };

  const getBalances = async (publicKey) => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const balance = await connection.getBalance(new PublicKey(publicKey));
      const balancenew = balance / LAMPORTS_PER_SOL;
      setBalance(balancenew);
    } catch (error) {
      console.error("ERROR GET BALANCE", error);
      toast.error("Error obteniendo el balance");
    }
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  // Redirigir a la página de crear cuenta
  const handleCreateAccountClick = () => {
    router.push("/youraccount"); // Redirige a la página de youraccount
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
          <h1 className="text-lg sm:text-2xl font-bold text-green-800">RINDE FRUTOS</h1>
        </div>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <div className="block md:hidden">
          <button className="text-green-800 focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
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
          {publicKey ? (
            <button className="bg-red-400 text-white rounded-full px-4 py-2" onClick={signOut}>
              Desconectar Wallet
            </button>
          ) : (
            <button className="bg-green-400 text-white rounded-full px-4 py-2" onClick={signIn}>
              Conectar Wallet
            </button>
          )}
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
          {publicKey ? (
            <button className="bg-red-400 text-white rounded-full px-4 py-2" onClick={signOut}>
              Desconectar Wallet
            </button>
          ) : (
            <button className="bg-green-400 text-white rounded-full px-4 py-2" onClick={signIn}>
              Conectar Wallet
            </button>
          )}
        </div>
      </div>

      {/* Mostrar tabla solo si la wallet está conectada */}
      {publicKey && (
        <div className="flex items-center justify-center min-h-screen px-4 mt-16">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-5xl">
            {/* Encabezado con estilo modificado */}
            <div className="bg-green-400 text-white font-bold text-center py-4 rounded-full mb-6">
              Distribución de recursos gubernamentales primer semestre del año 2024
            </div>

            <div className="overflow-x-auto"> {/* Scroll horizontal en dispositivos pequeños */}
              <table className="min-w-full bg-green-100 border border-black">
                <thead>
                  <tr className="bg-green-300">
                    <th className="border border-black p-2">Beneficiario</th>
                    <th className="border border-black p-2">Cantidad</th>
                    <th className="border border-black p-2">Wallet</th>
                    <th className="border border-black p-2">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Ejemplo de filas */}
                  <tr>
                    <td className="border border-black p-2">Gabriela Herrera</td>
                    <td className="border border-black p-2">$ 20,000.00</td>
                    <td className="border border-black p-2">H1Ta3tUQCxD4ALnRZ1Q49EvEUQp3UorCUUwuNLzJ1jc1</td>
                    <td className="border border-black p-2">20/01/2024</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Gabriela Herrera</td>
                    <td className="border border-black p-2">$ 20,000.00</td>
                    <td className="border border-black p-2">H1Ta3tUQCxD4ALnRZ1Q49EvEUQp3UorCUUwuNLzJ1jc1</td>
                    <td className="border border-black p-2">20/03/2024</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Gabriela Herrera</td>
                    <td className="border border-black p-2">$ 20,000.00</td>
                    <td className="border border-black p-2">H1Ta3tUQCxD4ALnRZ1Q49EvEUQp3UorCUUwuNLzJ1jc1</td>
                    <td className="border border-black p-2">20/05/2024</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2">Gabriela Herrera</td>
                    <td className="border border-black p-2">$ 20,000.00</td>
                    <td className="border border-black p-2">H1Ta3tUQCxD4ALnRZ1Q49EvEUQp3UorCUUwuNLzJ1jc1</td>
                    <td className="border border-black p-2">20/07/2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Distribution;
