import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type Role = 'admin' | 'teacher' | 'student';

export function AppShell({ children, role }: { children: React.ReactNode; role: Role }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Iniciar colapsado por defecto
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // En mobile, mantener sidebar colapsado por defecto
      // En desktop, expandir por defecto si no hay preferencia
      if (!mobile && isSidebarCollapsed) {
        setIsSidebarCollapsed(false);
      } else if (mobile && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []); // Remover dependencia para evitar loops

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar 
        role={role} 
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        isMobile={isMobile}
      />
      <div className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-300
        ${isMobile ? 'w-full' : isSidebarCollapsed ? 'ml-0' : 'ml-0'}
      `}>        <Topbar onToggleSidebar={toggleSidebar} />        
        <main className="flex-1 overflow-hidden p-3 md:p-4 lg:p-6">
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
