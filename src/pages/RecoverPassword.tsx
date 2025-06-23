import { Link } from "react-router-dom";

export function RecoverPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Recuperar Contraseña
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Ingresa tu correo electrónico y te enviaremos instrucciones.
        </p>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <Link
          to="/"
          className="w-full block text-center text-blue-600 hover:underline mb-4"
        >
          ¿Presionaste por error? Inicia Sesión
        </Link>

        <button className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
          Enviar instrucciones
        </button>

        <p className="text-sm text-green-600 text-center mt-4">
          ✅ Si existe una cuenta con ese correo, recibirás un email pronto.
        </p>
      </div>
    </div>
  );
}
