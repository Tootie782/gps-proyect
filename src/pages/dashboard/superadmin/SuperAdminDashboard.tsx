import { AppShell } from '../../../components/AppShell';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Users, 
  GraduationCap, 
  BarChart3, 
  MapPin,
  TrendingUp,
  TrendingDown,
  Award,
  CheckCircle2,
  Eye,
  ChevronRight
} from 'lucide-react';

// Mock data para simular los datos totales del sistema regional - Sur de Chile
const allSchools = [
  { id: 1, name: 'Escuela El Roble', city: 'Temuco', students: 420, teachers: 28, avgGrade: 6.2, attendance: 89, status: 'excellent' },
  { id: 2, name: 'Liceo Bicentenario Araucanía', city: 'Temuco', students: 380, teachers: 25, avgGrade: 6.4, attendance: 92, status: 'excellent' },
  { id: 3, name: 'Colegio Lagos del Sur', city: 'Pucón', students: 280, teachers: 22, avgGrade: 6.1, attendance: 87, status: 'good' },
  { id: 4, name: 'Escuela Rural Llaima', city: 'Curacautín', students: 180, teachers: 15, avgGrade: 5.8, attendance: 83, status: 'attention' },
  { id: 5, name: 'Liceo Técnico Forestal', city: 'Victoria', students: 350, teachers: 28, avgGrade: 5.9, attendance: 85, status: 'good' },
  { id: 6, name: 'Colegio Mapuche Nguillatun', city: 'Nueva Imperial', students: 290, teachers: 24, avgGrade: 6.0, attendance: 88, status: 'good' },
  { id: 7, name: 'Escuela Valle del Cautín', city: 'Villarrica', students: 320, teachers: 26, avgGrade: 6.1, attendance: 90, status: 'good' },
  { id: 8, name: 'Liceo Cordillera', city: 'Angol', students: 360, teachers: 30, avgGrade: 5.7, attendance: 82, status: 'attention' },
  { id: 9, name: 'Escuela Pewenche', city: 'Lonquimay', students: 150, teachers: 12, avgGrade: 5.6, attendance: 80, status: 'attention' },
  { id: 10, name: 'Colegio Volcán Llaima', city: 'Melipeuco', students: 220, teachers: 18, avgGrade: 5.9, attendance: 86, status: 'good' }
];

const regionalStats = {
  totalSchools: allSchools.length,
  totalStudents: allSchools.reduce((sum, school) => sum + school.students, 0),
  totalTeachers: allSchools.reduce((sum, school) => sum + school.teachers, 0),
  averageGrade: 6.0,
  attendanceRate: 86,
  improvementRate: 4.2
};

export function SuperAdminDashboard() {
  const navigate = useNavigate();

  const handleViewSchools = () => {
    navigate('/admin-regional/schools');
  };

  const handleViewTeachers = () => {
    navigate('/admin-regional/teachers');
  };

  const handleViewStudents = () => {
    navigate('/admin-regional/students');
  };

  const handleViewReport = (schoolId: number) => {
    navigate(`/admin-regional/reports/${schoolId}`);
  };

  const handleViewRegionalReports = () => {
    navigate('/admin-regional/reports');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'attention': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bueno';
      case 'attention': return 'Atención';
      case 'critical': return 'Crítico';
      default: return 'Normal';
    }
  };

  const StatCard = ({ icon, title, value, trend, trendValue, color = 'blue' }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm ml-1">{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-gray-600 mt-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  return (
    <AppShell role="admin-regional">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel Regional - La Araucanía</h1>
                <p className="text-gray-600">Administración Regional de Escuelas del Sur de Chile</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleViewRegionalReports}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard Completo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-6">
            
            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={<Building className="w-5 h-5 text-blue-600" />}
                title="Total Escuelas"
                value={regionalStats.totalSchools}
                color="blue"
              />
              <StatCard
                icon={<GraduationCap className="w-5 h-5 text-purple-600" />}
                title="Total Estudiantes"
                value={regionalStats.totalStudents.toLocaleString()}
                trend="up"
                trendValue="+2.3%"
                color="purple"
              />
              <StatCard
                icon={<Users className="w-5 h-5 text-green-600" />}
                title="Total Docentes"
                value={regionalStats.totalTeachers}
                trend="up"
                trendValue="+1.5%"
                color="green"
              />
              <StatCard
                icon={<Award className="w-5 h-5 text-orange-600" />}
                title="Promedio Regional"
                value={regionalStats.averageGrade}
                trend="up"
                trendValue="+0.1"
                color="orange"
              />
            </div>

            {/* Métricas de rendimiento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <StatCard
                icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                title="Asistencia Regional"
                value={`${regionalStats.attendanceRate}%`}
                trend="down"
                trendValue="-0.5%"
                color="green"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
                title="Mejora Mensual"
                value={`+${regionalStats.improvementRate}%`}
                color="purple"
              />
            </div>

            {/* Accesos rápidos */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div 
                className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-300"
                onClick={handleViewSchools}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Gestión de Escuelas</h3>
                    <p className="text-sm text-gray-600">Ver todas las escuelas de la región</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div 
                className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-green-300"
                onClick={handleViewTeachers}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Gestión de Docentes</h3>
                    <p className="text-sm text-gray-600">Administrar cuerpo docente</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div 
                className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-purple-300"
                onClick={handleViewStudents}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Gestión de Estudiantes</h3>
                    <p className="text-sm text-gray-600">Ver estudiantes de la región</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Lista de escuelas */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      Escuelas de la Región
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Resumen de rendimiento y estado de las escuelas
                    </p>
                  </div>
                  <button
                    onClick={handleViewSchools}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                  >
                    Ver todas
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {allSchools.slice(0, 5).map((school) => (
                    <div
                      key={school.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Building className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-800">{school.name}</h3>
                            <span className="text-sm text-gray-600">• {school.city}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(school.status)}`}>
                              {getStatusLabel(school.status)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4 text-purple-600" />
                              <span className="text-gray-600">{school.students} estudiantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-green-600" />
                              <span className="text-gray-600">{school.teachers} docentes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-orange-600" />
                              <span className="text-gray-600">Promedio: {school.avgGrade}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                              <span className="text-gray-600">Asistencia: {school.attendance}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewReport(school.id)}
                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            Ver Reporte
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mostrar más escuelas */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleViewSchools}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    Ver las {allSchools.length - 5} escuelas restantes
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
