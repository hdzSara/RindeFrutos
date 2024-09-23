import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importar useRouter de Next.js
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";
import { Toaster, toast } from "react-hot-toast";

const YourAccount = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Para manejar el estado del menú
  const [balance, setBalance] = useState(0);
  const [nombres, setNombres] = useState("Gabriela Sarahí");
  const [apellidosPaterno, setApellidosPaterno] = useState("Herrera");
  const [apellidosMaterno, setApellidosMaterno] = useState("Sosa");
  const [calleNumero, setCalleNumero] = useState("Colón 304");
  const [colonia, setColonia] = useState("Carrizales");
  const [ciudad, setCiudad] = useState("Torreón");
  const [estado, setEstado] = useState("Chihuahua");
  const [walletSolana, setWalletSolana] = useState(
    "H1Ta3tUQCxD4ALnRZ1Q49EvEUQp3UorCUUwuNLzJ1jc1"
  );

  const router = useRouter(); // Uso del hook de router

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

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    const formData = {
      nombres,
      apellidosPaterno,
      apellidosMaterno,
      calleNumero,
      colonia,
      ciudad,
      estado,
      walletSolana,
    };
    console.log("Formulario enviado:", formData);
    toast.success("Formulario enviado con éxito 🎉");
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
            onClick={handleLogoClick} // Agregar evento de clic para redirigir al index
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
          {publicKey ? (
            <button
              className="bg-red-400 text-white rounded-full px-4 py-2"
              onClick={signOut}
            >
              Desconectar Wallet
            </button>
          ) : (
            <button
              className="bg-green-400 text-white rounded-full px-4 py-2"
              onClick={signIn}
            >
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
            <button
              className="bg-red-400 text-white rounded-full px-4 py-2"
              onClick={signOut}
            >
              Desconectar Wallet
            </button>
          ) : (
            <button
              className="bg-green-400 text-white rounded-full px-4 py-2"
              onClick={signIn}
            >
              Conectar Wallet
            </button>
          )}
        </div>
      </div>

      {/* Mostrar información de cuenta solo si la wallet está conectada */}
      {publicKey && (
        <div className="flex items-center justify-center min-h-screen px-4 mt-16">
          <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
            <h2 className="text-center text-2xl font-bold text-green-600 mb-6">
              TU CUENTA
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                {/* Nombres */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
                  <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                    Nombres
                  </label>
                  <input
                    className="bg-green-50 w-full px-4 py-2 rounded-lg"
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                  />
                </div>

                {/* Apellidos */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 w-full sm:w-1/2">
                    <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                      Apellidos
                    </label>
                    <input
                      className="bg-green-50 w-full px-4 py-2 rounded-lg"
                      type="text"
                      value={apellidosPaterno}
                      onChange={(e) => setApellidosPaterno(e.target.value)}
                    />
                  </div>
                  <input
                    className="bg-green-50 w-full px-4 py-2 rounded-lg"
                    type="text"
                    value={apellidosMaterno}
                    onChange={(e) => setApellidosMaterno(e.target.value)}
                  />
                </div>

                {/* Calle y Número */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
                  <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                    Calle y número
                  </label>
                  <input
                    className="bg-green-50 w-full px-4 py-2 rounded-lg"
                    type="text"
                    value={calleNumero}
                    onChange={(e) => setCalleNumero(e.target.value)}
                  />
                </div>

                {/* Colonia y Estado */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 w-full sm:w-1/2">
                    <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                      Colonia
                    </label>
                    <input
                      className="bg-green-50 w-full px-4 py-2 rounded-lg"
                      type="text"
                      value={colonia}
                      onChange={(e) => setColonia(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:space-x-4 w-full sm:w-1/2">
                    <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                      Estado
                    </label>
                    <input
                      className="bg-green-50 w-full px-4 py-2 rounded-lg"
                      type="text"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                    />
                  </div>
                </div>

                {/* Ciudad */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
                  <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                    Ciudad
                  </label>
                  <input
                    className="bg-green-50 w-full px-4 py-2 rounded-lg"
                    type="text"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                </div>

                {/* Wallet Solana */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between space-y-4 sm:space-y-0">
                  <label className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center">
                    Wallet Solana
                  </label>
                  <input
                    className="bg-green-50 w-full px-4 py-2 rounded-lg"
                    type="text"
                    value={walletSolana}
                    readOnly
                  />
                </div>

                {/* Botón Enviar */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="bg-green-500 text-white font-bold px-6 py-2 rounded-full w-full sm:w-auto"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster position="bottom-center" />
    </div>
  );
};

export default YourAccount;
