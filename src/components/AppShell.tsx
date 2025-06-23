import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type Role = 'admin-regional' | 'admin-local' | 'teacher' | 'student';

const roleNames = {
  'admin-regional': 'Admin Regional',
  'admin-local': 'Admin de Escuela',
  'teacher': 'Docente',
  'student': 'Estudiante'
};

export function AppShell({ children, role }: { children: React.ReactNode; role: Role }) {
  const userName = roleNames[role] || 'Usuario';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar userName={userName} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
