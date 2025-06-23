import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut } from 'lucide-react';
import { SyncStatus } from './SyncStatus';

export function Topbar({ userName = 'Usuario' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías agregar lógica adicional de logout si es necesario
    navigate('/');
  };

  return (
    <header className="flex-shrink-0 bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
      <div>
        {/* Placeholder para breadcrumbs o título de página si se necesita */}
      </div>
      <div className="flex items-center gap-4">
        <SyncStatus />
        <button className="text-gray-500 hover:text-gray-700">
          <Bell size={22} />
        </button>
        <div className="relative">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img
              src={`https://i.pravatar.cc/40?u=${userName}`}
              alt="Avatar"
              className="w-9 h-9 rounded-full"
            />
            <div className="text-sm">
              <span className="font-medium text-gray-800">{userName}</span>
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut size={16} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
}
