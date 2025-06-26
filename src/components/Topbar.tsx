import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, LogOut } from 'lucide-react';
import { SyncStatus } from './SyncStatus';

interface TopbarProps {
  userName: string;
  onToggleSidebar?: () => void;
}

export function Topbar({ userName, onToggleSidebar }: TopbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // lógica adicional de logout si se necesita
    navigate('/');
  };

  return (
    <header className="h-14 md:h-16 px-4 lg:px-6 flex-shrink-0 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm">
      {/* Left: menu button & title */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>
        )}
        <h1 className="text-base md:text-lg font-medium text-gray-800">
          Panel Principal
        </h1>
      </div>

      {/* Right: sync status, notifications, user */}
      <div className="flex items-center gap-4">
        <SyncStatus status="sincronizado" />

        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors">
          <Bell size={22} />
        </button>

        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsMenuOpen((o) => !o)}
          >
            <img
              src={`https://i.pravatar.cc/40?u=${encodeURIComponent(userName)}`}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:inline text-sm font-medium text-gray-800">
              {userName}
            </span>
          </div>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
