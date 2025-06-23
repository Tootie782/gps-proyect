import { AppShell } from '../../../components/AppShell';
import { useNavigate, useParams } from 'react-router-dom';
import { Building, Users, GraduationCap, BookOpen, BarChart3 } from 'lucide-react';

// Mock data para simular los datos de una escuela específica
const schoolData = {
  id: 1,
  name: 'Escuela El Roble',
  city: 'Santiago',
  address: 'Av. Principal 123, Santiago',
  totalStudents: 420,
  totalTeachers: 28,
  totalCourses: 15,
  totalSubjects: 45,
};

const quickStats = [
  { label: 'Asistencia Promedio', value: '89%', trend: '+2%', color: 'text-green-600' },
  { label: 'Notas Promedio', value: '6.2', trend: '+0.1', color: 'text-blue-600' },
  { label: 'Actividades Completadas', value: '78%', trend: '+5%', color: 'text-purple-600' },
  { label: 'Docentes Activos', value: '26/28', trend: '92%', color: 'text-orange-600' },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const { schoolId } = useParams();
  
  // Si no hay schoolId en la URL, usar el ID por defecto
  const currentSchoolId = schoolId || '1';

  const handleViewCourses = () => {
    navigate(`/admin-local/${currentSchoolId}/courses`);
  };

  const handleViewSubjects = () => {
    navigate(`/admin-local/${currentSchoolId}/subjects`);
  };

  const handleViewTeachers = () => {
    navigate(`/admin-local/${currentSchoolId}/teachers`);
  };
  const handleViewStudents = () => {
    navigate(`/admin-local/${currentSchoolId}/students`);
  };

  return (
    <AppShell role="admin-local">
      <div className="h-full flex flex-col">
        {/* Header de la escuela */}
        <div className="flex-shrink-0">
          <div className="p-4 md:p-6 pb-2 md:pb-4">
            {/* Info de la escuela */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Building className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-800">{schoolData.name}</h1>
                <p className="text-xs md:text-sm text-gray-600">{schoolData.address}</p>
              </div>
            </div>

            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div 
                className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleViewCourses}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Cursos</p>
                    <p className="text-lg md:text-xl font-bold text-gray-800">{schoolData.totalCourses}</p>
                  </div>
                  <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
                </div>
              </div>

              <div 
                className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleViewSubjects}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Materias</p>
                    <p className="text-lg md:text-xl font-bold text-gray-800">{schoolData.totalSubjects}</p>
                  </div>
                  <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                </div>
              </div>

              <div 
                className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleViewTeachers}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Docentes</p>
                    <p className="text-lg md:text-xl font-bold text-gray-800">{schoolData.totalTeachers}</p>
                  </div>
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-500" />
                </div>
              </div>

              <div 
                className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={handleViewStudents}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Estudiantes</p>
                    <p className="text-lg md:text-xl font-bold text-gray-800">{schoolData.totalStudents}</p>
                  </div>
                  <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido principal con scroll */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pt-2 md:pt-4 space-y-6">
              {/* Estadísticas rápidas */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  <h2 className="text-base md:text-lg font-semibold text-gray-800">Resumen Académico</h2>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">{stat.label}</p>
                      <p className="text-xs text-green-600 font-medium">{stat.trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
