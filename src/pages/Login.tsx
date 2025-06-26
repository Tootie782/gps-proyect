import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Back to Landing Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a Inicio</span>
      </button>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EduConecta Rural</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Acceso al Prototipo
          </h2>
          <p className="text-gray-300 text-sm">
            Selecciona tu tipo de usuario para explorar las funcionalidades
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            />
          </div>

          <fieldset className="border border-white/30 p-6 rounded-xl bg-white/5">
            <legend className="text-sm font-medium text-gray-200 px-3">Tipo de usuario</legend>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  name="role"
                  value="admin-regional"
                  checked={role === 'admin-regional'}
                  onChange={() => setRole('admin-regional')}
                  className="accent-emerald-500"
                />
                <span className="text-white font-medium">Administrador Regional</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  name="role"
                  value="admin-local"
                  checked={role === 'admin-local'}
                  onChange={() => setRole('admin-local')}
                  className="accent-blue-500"
                />
                <span className="text-white font-medium">Administrador de Escuela</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                  className="accent-purple-500"
                />
                <span className="text-white font-medium">Docente</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-all">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  className="accent-pink-500"
                />
                <span className="text-white font-medium">Estudiante</span>
              </label>
            </div>
          </fieldset>

          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Acceder al Prototipo
            </button>

            <Link
              to="/recuperar"
              className="w-full block text-center text-gray-300 hover:text-white transition-colors"
            >
              Recuperar Contraseña
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
