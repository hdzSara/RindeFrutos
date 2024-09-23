import React, { useState } from "react";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
    } else {
      // Lógica para crear la cuenta
      alert("Cuenta creada con éxito");
    }
  };

  return (
    <div className="min-h-screen bg-green-100">
      {/* Barra de navegación */}
      <nav className="bg-green-50 flex justify-between items-center p-4 shadow-md fixed w-full top-0 left-0 z-10">
        <div className="flex items-center space-x-4">
          <img src="/img/banner.png" alt="Logo" className="w-12 h-12" />
          <h1 className="text-lg sm:text-2xl font-bold text-green-800">
            RINDE FRUTOS
          </h1>
        </div>
      </nav>

      {/* Contenido principal centrado */}
      <div className="flex items-center justify-center min-h-screen mt-24 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-green-600 mb-6">
            CREA TU CUENTA
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              {/* Usuario */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label
                  className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center"
                  htmlFor="email"
                >
                  Usuario
                </label>
                <input
                  className="bg-green-50 w-full px-4 py-2 rounded-lg"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@example.com"
                />
              </div>

              {/* Crea contraseña */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label
                  className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center"
                  htmlFor="password"
                >
                  Crea Contraseña
                </label>
                <input
                  className="bg-green-50 w-full px-4 py-2 rounded-lg"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              {/* Confirma contraseña */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label
                  className="bg-green-400 text-white px-4 py-2 rounded-full w-full sm:w-40 text-center"
                  htmlFor="confirmPassword"
                >
                  Confirma Contraseña
                </label>
                <input
                  className="bg-green-50 w-full px-4 py-2 rounded-lg"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                />
              </div>

              {/* Botón para enviar */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold px-6 py-2 rounded-full w-full sm:w-auto"
                >
                  Crear tu cuenta
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
