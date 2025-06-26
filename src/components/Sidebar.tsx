import {
  Home,
  School,
  Users,
  UserCheck,
  BarChart2,
  BookOpenCheck,
  BookCopy,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

type Role = 'admin' | 'admin-regional' | 'admin-local' | 'teacher' | 'student';

interface SidebarProps {
  role: Role;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Sidebar({
  role,
  isCollapsed,
  onToggle,
  isMobile,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId } = useParams<{ schoolId: string }>();
  const [isInitialized, setIsInitialized] = useState(false);

  // Avoid animation on initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialized(true), 50);
    return () => clearTimeout(timer);
  }, []);

  /* ─────────────────────────────
   * Build menu by role
   * ──────────────────────────── */  const buildMenu = (): {
    icon: React.ReactElement;
    label: string;
    path: string;
  }[] => {
    /* Dashboard path differs by role */
    const dashboardPath =
      role === 'admin'
        ? '/admin'
        : role === 'admin-regional'
        ? '/admin-regional'
        : role === 'admin-local'
        ? `/admin-local/${schoolId}`
        : role === 'teacher'
        ? '/teacher'
        : '/student';

    const common = [{ icon: <Home size={20} />, label: 'Dashboard', path: dashboardPath }];

    switch (role) {
      /* Admin Ministerial (desarrollo) */
      case 'admin':
        return [
          ...common,
          { icon: <School size={20} />, label: 'Escuelas', path: '/admin/schools' },
          { icon: <Users size={20} />, label: 'Docentes', path: '/admin/teachers' },
          { icon: <UserCheck size={20} />, label: 'Estudiantes', path: '/admin/students' },
          { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/admin/reports' },
        ];

      /* Admin Regional */
      case 'admin-regional':
        return [
          ...common,
          { icon: <School size={20} />, label: 'Escuelas', path: '/admin-regional/schools' },
          { icon: <Users size={20} />, label: 'Docentes', path: '/admin-regional/teachers' },
          { icon: <UserCheck size={20} />, label: 'Estudiantes', path: '/admin-regional/students' },
          { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/admin-regional/reports' },
        ];

      /* Admin Local (una escuela) */
      case 'admin-local':
        if (!schoolId) return common; // Evita crash si aún no hay param
        const base = `/admin-local/${schoolId}`;
        return [
          { icon: <School size={20} />, label: 'Mi Escuela', path: base },
          { icon: <BookCopy size={20} />, label: 'Cursos', path: `${base}/courses` },
          { icon: <BookOpenCheck size={20} />, label: 'Materias', path: `${base}/subjects` },
          { icon: <Users size={20} />, label: 'Docentes', path: `${base}/teachers` },
          { icon: <UserCheck size={20} />, label: 'Estudiantes', path: `${base}/students` },
          { icon: <BarChart2 size={20} />, label: 'Reportes', path: `${base}/reports` },
        ];      /* Docente */
      case 'teacher':
        return [
          ...common,
          { icon: <BookOpenCheck size={20} />, label: 'Mis Clases', path: '/teacher/classes' },
          { icon: <BarChart2 size={20} />, label: 'Mis Reportes', path: '/teacher/reports' },
        ];

      /* Estudiante */
      case 'student':
        return [
          ...common,
          /* En develop ya existe la vista de materias → conservamos /student/subjects */
          { icon: <BookOpenCheck size={20} />, label: 'Mis Materias', path: '/student/subjects' },
        ];

      default:
        return common;
    }
  };

  const menu = buildMenu();

  const handleMenuClick = (path: string) => {
    navigate(path);
    /* En mobile ciérralo tras navegar */
    if (isMobile && !isCollapsed) onToggle();
  };

  /* ─────────────────────────────
   * UI
   * ──────────────────────────── */
  return (
    <>
      {/* Overlay para mobile */}
      {isMobile && !isCollapsed && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onToggle} />
      )}      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? 'fixed top-0 left-0 z-50' : 'relative'}
          ${isCollapsed ? (isMobile ? '-translate-x-full' : 'w-16') : 'w-64'}
          h-screen bg-white shadow-lg border-r border-gray-200
          ${isInitialized ? 'transition-all duration-300 ease-in-out' : ''}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-emerald-700">EduConecta</h2>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {isMobile ? (
              <ChevronLeft size={20} />
            ) : isCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menu.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={idx}
                onClick={() => handleMenuClick(item.path)}
                className={`
                  group flex items-center gap-3 p-3 rounded-lg cursor-pointer
                  transition-all
                  ${isCollapsed ? 'justify-center' : ''}
                  ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                  }
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="rounded-lg bg-emerald-50 p-3">
              <p className="text-xs font-medium text-emerald-700">Modo Rural</p>
              <p className="text-xs text-emerald-600">Sincronización automática</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
