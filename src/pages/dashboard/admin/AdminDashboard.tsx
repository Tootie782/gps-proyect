import { AppShell } from '../../../components/AppShell';

export function AdminDashboard() {
  return (
    <AppShell role='admin'>
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard del Administrador</h2>
      <p className="text-gray-600 mt-2">Gestión completa de escuelas, docentes, cursos y más.</p>
    </AppShell>
  );
}
