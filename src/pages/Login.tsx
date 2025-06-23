import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Role = 'admin-regional' | 'admin-local' | 'teacher' | 'student';

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('admin-regional');

  const handleLogin = () => {
    if (role === 'admin-local') {
      navigate('/admin-local/1'); // Redirige a la escuela con ID 1
    } else if (role === 'admin-regional') {
      navigate('/admin-regional');
    } else {
      navigate(`/${role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Iniciar Sesión
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="text-sm font-medium text-gray-600 px-2">Tipo de usuario</legend>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin-regional"
                  checked={role === 'admin-regional'}
                  onChange={() => setRole('admin-regional')}
                  className="accent-red-600"
                />
                Administrador Regional
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin-local"
                  checked={role === 'admin-local'}
                  onChange={() => setRole('admin-local')}
                  className="accent-blue-600"
                />
                Administrador de Escuela
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                  className="accent-green-600"
                />
                Docente
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  className="accent-purple-600"
                />
                Estudiante
              </label>
            </div>
          </fieldset>

        <Link
          to="/recuperar"
          className="w-full block text-center text-blue-600 hover:underline"
        >
          Recuperar Contraseña
        </Link>
          <button
            onClick={handleLogin}
            className="mt-6 w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
