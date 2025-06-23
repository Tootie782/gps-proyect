import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type Role = 'admin' | 'admin-regional' | 'admin-local' | 'teacher' | 'student';

const roleNames: Record<Role, string> = {
  admin: 'Admin',
  'admin-regional': 'Admin Regional',
  'admin-local': 'Admin de Escuela',
  teacher: 'Docente',
  student: 'Estudiante',
};

export function AppShell({
  children,
  role,
}: {
  children: React.ReactNode;
  role: Role;
}) {
  const userName = roleNames[role] ?? 'Usuario';

  // ──────────────────────────────────────────────
  // Sidebar state: collapsed by default on mobile
  // ──────────────────────────────────────────────
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // Tailwind lg breakpoint
      setIsMobile(mobile);

      // Expand on desktop, collapse on mobile
      if (mobile && !isSidebarCollapsed) setIsSidebarCollapsed(true);
      if (!mobile && isSidebarCollapsed) setIsSidebarCollapsed(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarCollapsed]);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        role={role}
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
        onToggle={toggleSidebar}
      />

      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Topbar userName={userName} onToggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-hidden p-3 md:p-4 lg:p-6">
          <div className="h-full overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
