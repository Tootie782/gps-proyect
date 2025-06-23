import { AppShell } from '../../components/AppShell';

export function TeacherDashboard() {
  return (
    <AppShell role='teacher'>
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard del Docente</h2>
      <p className="text-gray-600 mt-2">Escuelas asignadas, cursos y estudiantes bajo tu responsabilidad.</p>

      <div className="mt-6 space-y-4">
        {/* Puedes mapear escuelas y cursos aquí */}
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Escuela: Liceo A</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>Curso 1°A - 20 estudiantes</li>
            <li>Curso 2°B - 18 estudiantes</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
