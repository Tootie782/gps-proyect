import { Users, Award, TrendingUp, AlertCircle } from 'lucide-react';
import type { Teacher } from '../../types/teacher';

interface TeacherStatsProps {
  teacher: Teacher;
}

export function TeacherStats({ teacher }: TeacherStatsProps) {
  const stats = teacher.estadisticas;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 mt-2">Total Estudiantes</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.totalEstudiantes}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-green-100 rounded-lg">
            <Award className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 mt-2">Promedio General</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.promedioGeneral.toFixed(1)}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 mt-2">Asistencia</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.asistenciaPromedio}%</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-orange-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 mt-2">Actividades Pendientes</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.actividadesPendientes}</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <h3 className="text-sm text-gray-600 mt-2">Por Calificar</h3>
        <p className="text-2xl font-bold text-gray-900">{stats.evaluacionesPorCalificar}</p>
      </div>
    </div>
  );
}
