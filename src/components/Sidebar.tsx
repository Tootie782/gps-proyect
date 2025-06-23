import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Home, School, Users, UserCheck, BarChart2, BookOpenCheck, BookCopy } from 'lucide-react';

type Role = 'admin-regional' | 'admin-local' | 'teacher' | 'student';

interface SidebarProps {
  role: Role;
}

export function Sidebar({ role }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { schoolId } = useParams();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  let menu = [];
  const commonPath = role === 'admin-local' ? `/admin-local/${schoolId}` : `/${role}`;
  const common = [{ icon: <Home size={20} />, label: 'Dashboard', path: commonPath }];

  switch (role) {
    case 'admin-regional':
      const regionalBasePath = '/admin-regional';
      menu = [
        { icon: <Home size={20} />, label: 'Dashboard', path: regionalBasePath },
        { icon: <School size={20} />, label: 'Escuelas', path: `${regionalBasePath}/schools` },
        { icon: <Users size={20} />, label: 'Docentes', path: `${regionalBasePath}/teachers` },
        { icon: <UserCheck size={20} />, label: 'Estudiantes', path: `${regionalBasePath}/students` },
        { icon: <BarChart2 size={20} />, label: 'Reportes', path: regionalBasePath },
      ];
      break;
    case 'admin-local':
      const basePath = `/admin-local/${schoolId}`;
      menu = [
        { icon: <School size={20} />, label: 'Mi Escuela', path: basePath },
        { icon: <BookCopy size={20} />, label: 'Cursos', path: `${basePath}/courses` },
        { icon: <Users size={20} />, label: 'Docentes', path: `${basePath}/teachers` },
        { icon: <UserCheck size={20} />, label: 'Estudiantes', path: `${basePath}/students` },
        { icon: <BarChart2 size={20} />, label: 'Reportes', path: `${basePath}/reports` }
      ];
      break;
    case 'teacher':
      menu = [
        ...common,
        { icon: <School size={20} />, label: 'Escuelas', path: '/teacher/schools' },
        { icon: <UserCheck size={20} />, label: 'Estudiantes', path: '/teacher/students' },
        { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/teacher/reports' }
      ];
      break;
    case 'student':
      menu = [
        ...common,
        { icon: <BookOpenCheck size={20} />, label: 'Cursos', path: '/student/courses' },
        { icon: <BarChart2 size={20} />, label: 'Reportes', path: '/student/reports' }
      ];
      break;
    default:
      menu = common;
  }

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4 border-r border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">EduConecta</h2>
      <nav className="space-y-2">
        {menu.map((item, idx) => (
          <div 
            key={idx} 
            className={`flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all cursor-pointer ${
              location.pathname === item.path ? 'bg-blue-50 text-blue-700 font-medium' : ''
            }`}
            onClick={() => handleMenuClick(item.path)}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
