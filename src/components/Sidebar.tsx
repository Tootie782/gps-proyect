import { Home, School, Users, UserCheck, BarChart2, BookOpenCheck, ChevronLeft, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type Role = 'admin' | 'teacher' | 'student';

interface SidebarProps {
  role: Role;
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export function Sidebar({ role, isCollapsed, onToggle, isMobile }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const common = [{ 
    icon: <Home size={20} />, 
    label: 'Dashboard', 
    path: role === 'admin' ? '/admin' : role === 'teacher' ? '/teacher' : '/student'
  }];
  
  const adminMenu = [
    ...common,
    { icon: <School size={20} />, label: 'Escuelas', path: '/admin/schools' },
    { icon: <Users size={20} />, label: 'Docentes', path: '/admin/teachers' },
    { icon: <UserCheck size={20} />, label: 'Estudiantes', path: '/admin/students' },
    { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/admin/reports' }
  ];
  
  const teacherMenu = [
    ...common,
    { icon: <School size={20} />, label: 'Escuelas', path: '/teacher/schools' },
    { icon: <UserCheck size={20} />, label: 'Estudiantes', path: '/teacher/students' },
    { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/teacher/reports' }
  ];
  
  const studentMenu = [
    ...common,
    { icon: <BookOpenCheck size={20} />, label: 'Mis Materias', path: '/student/subjects' },
    { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/student/reports' }
  ];

  const menu = role === 'admin' ? adminMenu : role === 'teacher' ? teacherMenu : studentMenu;
  const handleMenuClick = (path: string) => {
    navigate(path);
    // En mobile, cerrar sidebar después de navegar
    if (isMobile && !isCollapsed) {
      onToggle();
    }
  };
  return (
    <>
      {/* Overlay para mobile */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        ${isMobile ? 'fixed' : 'relative'} 
        ${isCollapsed ? (isMobile ? '-translate-x-full' : 'w-16') : 'w-64'} 
        ${isMobile ? 'z-50 left-0 top-0' : 'z-auto'}
        bg-white shadow-lg h-screen transition-all duration-300 ease-in-out border-r border-gray-200
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          {!isCollapsed && (
            <h2 className="text-xl font-semibold text-emerald-700">
              EduConecta
            </h2>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {isMobile ? (
              <ChevronLeft size={20} />
            ) : isCollapsed ? (
              <Menu size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menu.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={idx}
                className={`
                  flex items-center gap-3 p-3 rounded-lg text-gray-700 
                  hover:bg-emerald-50 hover:text-emerald-700 
                  transition-all cursor-pointer group
                  ${isCollapsed ? 'justify-center' : ''}
                  ${isActive ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : ''}
                `}
                title={isCollapsed ? item.label : undefined}
                onClick={() => handleMenuClick(item.path)}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="text-sm font-medium transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="p-4 flex-shrink-0">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="text-xs text-emerald-700">
                <p className="font-medium">Modo Rural</p>
                <p className="text-emerald-600">Sincronización automática</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
