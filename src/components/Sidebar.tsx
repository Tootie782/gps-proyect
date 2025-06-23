import { Home, School, Users, UserCheck, BarChart2, BookOpenCheck } from 'lucide-react';

type Role = 'admin' | 'teacher' | 'student';

interface SidebarProps {
  role: Role;
}

export function Sidebar({ role }: SidebarProps) {
  const common = [{ icon: <Home size={20} />, label: 'Dashboard' }];
  const adminMenu = [
    ...common,
    { icon: <School size={20} />, label: 'Escuelas' },
    { icon: <Users size={20} />, label: 'Docentes' },
    { icon: <UserCheck size={20} />, label: 'Estudiantes' },
    { icon: <BarChart2 size={20} />, label: 'Reportes' }
  ];
  const teacherMenu = [
    ...common,
    { icon: <School size={20} />, label: 'Escuelas' },
    { icon: <UserCheck size={20} />, label: 'Estudiantes' },
    { icon: <BarChart2 size={20} />, label: 'Reportes' }
  ];
  const studentMenu = [
    ...common,
    { icon: <BookOpenCheck size={20} />, label: 'Cursos' },
    { icon: <BarChart2 size={20} />, label: 'Reportes' }
  ];

  const menu = role === 'admin' ? adminMenu : role === 'teacher' ? teacherMenu : studentMenu;

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4 border-r border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">EduConecta</h2>
      <nav className="space-y-2">
        {menu.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all cursor-pointer">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
