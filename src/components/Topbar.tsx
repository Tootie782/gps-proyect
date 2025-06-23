import { Menu } from 'lucide-react';
import { SyncStatus } from './SyncStatus';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export function Topbar({ onToggleSidebar }: TopbarProps) {
  return (
    <header className="h-14 md:h-16 px-4 lg:px-6 flex items-center justify-between bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Botón de menú para mobile - siempre visible en mobile */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base md:text-lg font-medium text-gray-800">Panel Principal</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 lg:gap-6">
        <div className="hidden sm:block">
          <SyncStatus status="sincronizado" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden sm:inline">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-7 h-7 md:w-8 md:h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
