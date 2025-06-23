import { AppShell } from '../../../components/AppShell';

export function StudentDashboard() {
  return (
    <AppShell role='student'>
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard del Estudiante</h2>
      <p className="text-gray-600 mt-2">Consulta tus cursos y progreso académico.</p>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Curso: Matemáticas 1°A</h3>
          <p className="text-sm text-gray-500">Profesor: María Contreras</p>
        </div>
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h3 className="text-lg font-medium text-gray-700">Curso: Historia 1°A</h3>
          <p className="text-sm text-gray-500">Profesor: Juan Pérez</p>
        </div>
      </div>
    </AppShell>
  );
}
