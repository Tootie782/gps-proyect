import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

type Role = 'admin' | 'teacher' | 'student';

export function AppShell({ children, role }: { children: React.ReactNode; role: Role }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
