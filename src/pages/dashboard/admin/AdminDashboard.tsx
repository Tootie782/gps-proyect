import { AppShell } from '../../../components/AppShell';
import { useNavigate } from 'react-router-dom';
import { Building, Mic, GraduationCap, FileText } from 'lucide-react';

// Mock data para simular los datos totales del sistema
const allSchools = [
  { id: 1, name: 'Escuela El Roble', city: 'Santiago' },
  { id: 2, name: 'Liceo Bicentenario', city: 'Valparaíso' },
  { id: 3, name: 'Colegio Andes', city: 'Concepción' },
];

const allTeachers = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1 },
  { id: 2, name: 'Gabriela Mistral', schoolId: 1 },
  { id: 3, name: 'Pablo Neruda', schoolId: 2 },
  { id: 4, name: 'Nicanor Parra', schoolId: 2 },
  { id: 5, name: 'Isabel Allende', schoolId: 3 },
];

const allStudents = [
  { id: 1, name: 'Javiera Carrera', schoolId: 1 },
  { id: 2, name: 'Pedro de Valdivia', schoolId: 1 },
  { id: 3, name: 'Isabel Riquelme', schoolId: 2 },
  { id: 4, name: 'Arturo Prat', schoolId: 2 },
  { id: 5, name: 'Bernardo O\'Higgins', schoolId: 3 },
  { id: 6, name: 'Violeta Parra', schoolId: 3 },
  { id: 7, name: 'Salvador Allende', schoolId: 1 },
];

export function AdminDashboard() {
  const navigate = useNavigate();

  const handleViewReport = (schoolId) => {
    navigate(`/admin-regional/reports/${schoolId}`);
  };

  const stats = [
    { name: 'Escuelas Totales', value: allSchools.length, icon: Building },
    { name: 'Docentes Totales', value: allTeachers.length, icon: Mic },
    { name: 'Estudiantes Totales', value: allStudents.length, icon: GraduationCap },
  ];

  return (
    <AppShell role="admin-regional">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard del Administrador Regional</h1>
          <p className="text-gray-600 mt-1">Vista general del sistema educativo.</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd className="text-3xl font-semibold text-gray-900">{stat.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reports Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Reportes por Escuela</h2>
          <div className="space-y-4">
            {allSchools.map((school) => (
              <div key={school.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{school.name}</p>
                  <p className="text-sm text-gray-500">{school.city}</p>
                </div>
                <button
                  onClick={() => handleViewReport(school.id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-white border border-gray-300 rounded-lg hover:bg-blue-50"
                >
                  <FileText size={16} />
                  Ver Reporte
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  )
}
