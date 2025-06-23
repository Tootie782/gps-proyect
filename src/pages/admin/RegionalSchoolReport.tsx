import { useParams } from 'react-router-dom';
import { AppShell } from '../../components/AppShell';
import { Building, Mic, GraduationCap, ArrowLeft, BarChart2 } from 'lucide-react';

// Mock data - En una app real, esto vendría de una API
const allSchools = [ { id: 1, name: 'Escuela El Roble', city: 'Santiago' }, { id: 2, name: 'Liceo Bicentenario', city: 'Valparaíso' }, { id: 3, name: 'Colegio Andes', city: 'Concepción' } ];
const allTeachers = [ { id: 1, name: 'Carlos Fuentes', schoolId: 1 }, { id: 2, name: 'Gabriela Mistral', schoolId: 1 }, { id: 3, name: 'Pablo Neruda', schoolId: 2 }, { id: 4, name: 'Nicanor Parra', schoolId: 2 }, { id: 5, name: 'Isabel Allende', schoolId: 3 } ];
const allStudents = [ { id: 1, name: 'Javiera Carrera', schoolId: 1 }, { id: 2, name: 'Pedro de Valdivia', schoolId: 1 }, { id: 3, name: 'Isabel Riquelme', schoolId: 2 }, { id: 4, name: 'Arturo Prat', schoolId: 2 }, { id: 5, name: 'Bernardo O\'Higgins', schoolId: 3 }, { id: 6, name: 'Violeta Parra', schoolId: 3 }, { id: 7, name: 'Salvador Allende', schoolId: 1 } ];
const mockCourses = [ { id: 1, name: 'Matemáticas 1°A', schoolId: 1 }, { id: 2, name: 'Lenguaje 1°A', schoolId: 1 }, { id: 3, name: 'Matemáticas 2°B', schoolId: 2 }, { id: 4, name: 'Lenguaje 2°B', schoolId: 2 }, { id: 5, name: 'Ciencias 3°C', schoolId: 3 } ];

export function RegionalSchoolReport() {
  const { schoolId } = useParams();
  const school = allSchools.find(s => s.id === parseInt(schoolId || '0'));
  
  if (!school) {
    return (
      <AppShell role="admin-regional">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Escuela no encontrada</h1>
        </div>
      </AppShell>
    );
  }

  const teacherCount = allTeachers.filter(t => t.schoolId === school.id).length;
  const studentCount = allStudents.filter(s => s.schoolId === school.id).length;
  const courseCount = mockCourses.filter(c => c.schoolId === school.id).length;
  
  const stats = [
    { name: 'Docentes', value: teacherCount, icon: Mic },
    { name: 'Estudiantes', value: studentCount, icon: GraduationCap },
    { name: 'Cursos Activos', value: courseCount, icon: BarChart2 },
  ];

  return (
    <AppShell role="admin-regional">
      <div className="space-y-6">
        <div>
          <a href="/admin-regional" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={16} />
            Volver al Dashboard
          </a>
          <div className="flex items-center gap-4">
            <Building size={32} className="text-blue-600"/>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">Reporte de {school.name}</h1>
              <p className="text-gray-600 mt-1">Resumen de datos clave y rendimiento.</p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                  <stat.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{stat.value}</dd>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Promedio de Notas por Curso</h3>
                <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                    <p className="text-gray-500">[Gráfico de barras aquí]</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tasa de Asistencia General</h3>
                <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                    <p className="text-gray-500">[Gráfico circular aquí]</p>
                </div>
            </div>
        </div>

      </div>
    </AppShell>
  );
} 