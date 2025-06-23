import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { 
  BarChart3, 
  Users, 
  School, 
  GraduationCap, 
  TrendingUp, 
  TrendingDown, 
  Download,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  MapPin,
  Eye
} from 'lucide-react';

// Mock data para admin regional - Región del Sur de Chile
const mockRegionalData = {
  generalStats: {
    totalSchools: 10,
    totalStudents: 3850,
    totalTeachers: 298,
    averageGrade: 6.0,
    attendanceRate: 86,
    completionRate: 81,
    improvementRate: 4.2
  },
  schoolsPerformance: [
    { id: 1, name: 'Escuela El Roble', city: 'Temuco', students: 420, teachers: 28, avgGrade: 6.2, attendance: 89, completion: 85, status: 'excellent' },
    { id: 2, name: 'Liceo Bicentenario Araucanía', city: 'Temuco', students: 380, teachers: 25, avgGrade: 6.4, attendance: 92, completion: 88, status: 'excellent' },
    { id: 3, name: 'Colegio Lagos del Sur', city: 'Pucón', students: 280, teachers: 22, avgGrade: 6.1, attendance: 87, completion: 82, status: 'good' },
    { id: 4, name: 'Escuela Rural Llaima', city: 'Curacautín', students: 180, teachers: 15, avgGrade: 5.8, attendance: 83, completion: 75, status: 'attention' },
    { id: 5, name: 'Liceo Técnico Forestal', city: 'Victoria', students: 350, teachers: 28, avgGrade: 5.9, attendance: 85, completion: 78, status: 'good' },
    { id: 6, name: 'Colegio Mapuche Nguillatun', city: 'Nueva Imperial', students: 290, teachers: 24, avgGrade: 6.0, attendance: 88, completion: 80, status: 'good' },
    { id: 7, name: 'Escuela Valle del Cautín', city: 'Villarrica', students: 320, teachers: 26, avgGrade: 6.1, attendance: 90, completion: 83, status: 'good' },
    { id: 8, name: 'Liceo Cordillera', city: 'Angol', students: 360, teachers: 30, avgGrade: 5.7, attendance: 82, completion: 72, status: 'attention' },
    { id: 9, name: 'Escuela Pewenche', city: 'Lonquimay', students: 150, teachers: 12, avgGrade: 5.6, attendance: 80, completion: 70, status: 'attention' },
    { id: 10, name: 'Colegio Volcán Llaima', city: 'Melipeuco', students: 220, teachers: 18, avgGrade: 5.9, attendance: 86, completion: 77, status: 'good' }
  ],
  cityStats: [
    { city: 'Temuco', schools: 2, students: 800, avgGrade: 6.3, attendance: 90.5 },
    { city: 'Victoria', schools: 1, students: 350, avgGrade: 5.9, attendance: 85 },
    { city: 'Angol', schools: 1, students: 360, avgGrade: 5.7, attendance: 82 },
    { city: 'Pucón', schools: 1, students: 280, avgGrade: 6.1, attendance: 87 },
    { city: 'Villarrica', schools: 1, students: 320, avgGrade: 6.1, attendance: 90 },
    { city: 'Nueva Imperial', schools: 1, students: 290, avgGrade: 6.0, attendance: 88 },
    { city: 'Curacautín', schools: 1, students: 180, avgGrade: 5.8, attendance: 83 },
    { city: 'Lonquimay', schools: 1, students: 150, avgGrade: 5.6, attendance: 80 },
    { city: 'Melipeuco', schools: 1, students: 220, avgGrade: 5.9, attendance: 86 }
  ],  trendsData: [
    { month: 'Marzo', avgGrade: 5.8, attendance: 87 },
    { month: 'Abril', avgGrade: 5.9, attendance: 86 },
    { month: 'Mayo', avgGrade: 6.0, attendance: 85 },
    { month: 'Junio', avgGrade: 5.9, attendance: 86 },
    { month: 'Julio', avgGrade: 6.0, attendance: 86 },
    { month: 'Agosto', avgGrade: 6.0, attendance: 86 }
  ],
  subjectPerformance: [
    { subject: 'Matemáticas', avgGrade: 5.7, difficulty: 'Alta', schools: 10, students: 3850 },
    { subject: 'Lenguaje y Comunicación', avgGrade: 6.2, difficulty: 'Media', schools: 10, students: 3850 },
    { subject: 'Historia y Geografía', avgGrade: 6.0, difficulty: 'Media', schools: 8, students: 3080 },
    { subject: 'Ciencias Naturales', avgGrade: 5.9, difficulty: 'Media', schools: 10, students: 3850 },
    { subject: 'Inglés', avgGrade: 5.8, difficulty: 'Alta', schools: 7, students: 2695 },
    { subject: 'Educación Física', avgGrade: 6.4, difficulty: 'Baja', schools: 10, students: 3850 },
    { subject: 'Artes Visuales', avgGrade: 6.3, difficulty: 'Baja', schools: 8, students: 3080 },
    { subject: 'Tecnología', avgGrade: 6.1, difficulty: 'Media', schools: 6, students: 2310 }
  ],  teacherStats: {
    regional: { totalTeachers: 298, avgExperience: 8.5, satisfaction: 4.2 },
    bySubject: [
      { subject: 'Matemáticas', teachers: 45, avgGrade: 5.7, satisfaction: 4.0 },
      { subject: 'Lenguaje y Comunicación', teachers: 42, avgGrade: 6.2, satisfaction: 4.4 },
      { subject: 'Historia y Geografía', teachers: 28, avgGrade: 6.0, satisfaction: 4.3 },
      { subject: 'Ciencias Naturales', teachers: 38, avgGrade: 5.9, satisfaction: 4.1 },
      { subject: 'Inglés', teachers: 18, avgGrade: 5.8, satisfaction: 3.9 },
      { subject: 'Educación Física', teachers: 25, avgGrade: 6.4, satisfaction: 4.6 }
    ]
  }
};

export function RegionalReports() {
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'subjects' | 'teachers' | 'cities' | 'trends'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const StatCard = ({ icon, title, value, trend, trendValue, color = 'blue' }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    trend?: 'up' | 'down';
    trendValue?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
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
  const getGradeColor = (grade: number) => {
    if (grade >= 6.0) return 'text-green-600';
    if (grade >= 5.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Alta': return 'text-red-600 bg-red-100';
      case 'Media': return 'text-yellow-600 bg-yellow-100';
      case 'Baja': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AppShell role="admin-regional">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">              <div>
                <h1 className="text-2xl font-bold text-gray-900">Reportes Regionales - La Araucanía</h1>
                <p className="text-gray-600">Dashboard consolidado de las escuelas de la región sur</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="current">Período Actual</option>
                  <option value="semester1">Primer Semestre</option>
                  <option value="year">Año Completo</option>
                </select>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="px-4 md:px-6">
            <div className="flex space-x-6 overflow-x-auto">              {[
                { id: 'overview', label: 'Resumen General', icon: BarChart3 },
                { id: 'schools', label: 'Por Escuelas', icon: School },
                { id: 'subjects', label: 'Por Materias', icon: BookOpen },
                { id: 'teachers', label: 'Docentes', icon: Users },
                { id: 'cities', label: 'Por Ciudades', icon: MapPin },
                { id: 'trends', label: 'Tendencias', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-6">
            
            {/* Tab: Resumen General */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Estadísticas principales */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatCard
                    icon={<School className="w-5 h-5 text-blue-600" />}
                    title="Total Escuelas"
                    value={mockRegionalData.generalStats.totalSchools}
                    color="blue"
                  />
                  <StatCard
                    icon={<GraduationCap className="w-5 h-5 text-purple-600" />}
                    title="Total Estudiantes"
                    value={mockRegionalData.generalStats.totalStudents.toLocaleString()}
                    trend="up"
                    trendValue="+2.3%"
                    color="purple"
                  />
                  <StatCard
                    icon={<Users className="w-5 h-5 text-green-600" />}
                    title="Total Docentes"
                    value={mockRegionalData.generalStats.totalTeachers}
                    trend="up"
                    trendValue="+1.5%"
                    color="green"
                  />
                  <StatCard
                    icon={<Award className="w-5 h-5 text-orange-600" />}
                    title="Promedio Regional"
                    value={mockRegionalData.generalStats.averageGrade}
                    trend="up"
                    trendValue="+0.1"
                    color="orange"
                  />
                </div>

                {/* Métricas de rendimiento */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                    title="Asistencia Regional"
                    value={`${mockRegionalData.generalStats.attendanceRate}%`}
                    trend="down"
                    trendValue="-0.5%"
                    color="green"
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5 text-blue-600" />}
                    title="Actividades Completadas"
                    value={`${mockRegionalData.generalStats.completionRate}%`}
                    trend="up"
                    trendValue="+2%"
                    color="blue"
                  />
                  <StatCard
                    icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
                    title="Mejora Mensual"
                    value={`+${mockRegionalData.generalStats.improvementRate}%`}
                    color="purple"
                  />
                </div>

                {/* Top y Bottom escuelas */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-green-600" />
                      Mejores Escuelas
                    </h3>
                    <div className="space-y-3">
                      {mockRegionalData.schoolsPerformance
                        .sort((a, b) => b.avgGrade - a.avgGrade)
                        .slice(0, 4)
                        .map((school, index) => (
                          <div key={school.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{school.name}</p>
                              <p className="text-sm text-gray-600">{school.city} • {school.students} estudiantes</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{school.avgGrade}</p>
                              <p className="text-xs text-gray-500">#{index + 1}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      Escuelas que Necesitan Apoyo
                    </h3>
                    <div className="space-y-3">
                      {mockRegionalData.schoolsPerformance
                        .sort((a, b) => a.avgGrade - b.avgGrade)
                        .slice(0, 4)
                        .map((school) => (
                          <div key={school.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{school.name}</p>
                              <p className="text-sm text-gray-600">{school.city} • {school.attendance}% asistencia</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-yellow-600">{school.avgGrade}</p>
                              <Link
                                to={`/admin-regional/reports/${school.id}`}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                Ver detalles
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>                {/* Alertas regionales */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Alertas Regionales - La Araucanía
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">3 escuelas rurales con rendimiento crítico</p>
                        <p className="text-sm text-gray-600">Escuela Pewenche (Lonquimay), Escuela Rural Llaima (Curacautín) y Liceo Cordillera (Angol) requieren intervención inmediata.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Asistencia regional por debajo del objetivo</p>
                        <p className="text-sm text-gray-600">86% vs 90% objetivo. Factores climáticos y ruralidad afectan la asistencia en invierno.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Fortaleza en educación intercultural</p>
                        <p className="text-sm text-gray-600">Colegio Mapuche Nguillatun lidera en integración de cultura mapuche con excelentes resultados.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Mejora en educación técnica</p>
                        <p className="text-sm text-gray-600">Liceo Técnico Forestal muestra gran progreso en especialidades forestales y agrícolas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Por Escuelas */}
            {activeTab === 'schools' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Rendimiento por Escuela</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Escuela</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ciudad</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estudiantes</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Docentes</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Promedio</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Asistencia</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockRegionalData.schoolsPerformance.map((school) => (
                          <tr key={school.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{school.name}</td>
                            <td className="px-4 py-3 text-gray-600">{school.city}</td>
                            <td className="px-4 py-3 text-gray-600">{school.students}</td>
                            <td className="px-4 py-3 text-gray-600">{school.teachers}</td>
                            <td className={`px-4 py-3 font-bold ${getGradeColor(school.avgGrade)}`}>
                              {school.avgGrade}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                school.attendance >= 90 ? 'bg-green-100 text-green-800' :
                                school.attendance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {school.attendance}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(school.status)}`}>
                                {getStatusLabel(school.status)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Link
                                to={`/admin-regional/reports/${school.id}`}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <Eye className="w-4 h-4" />
                                Ver detalles
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>            )}

            {/* Tab: Por Materias */}
            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockRegionalData.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(subject.difficulty)}`}>
                          {subject.difficulty}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Promedio Regional:</span>
                          <span className={`font-bold ${getGradeColor(subject.avgGrade)}`}>
                            {subject.avgGrade}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Estudiantes:</span>
                          <span className="font-medium text-gray-900">{subject.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Escuelas:</span>
                          <span className="font-medium text-gray-900">{subject.schools}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Análisis por dificultad */}
                <div className="grid md:grid-cols-3 gap-4">
                  <StatCard
                    icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                    title="Materias de Alta Dificultad"
                    value={mockRegionalData.subjectPerformance.filter(s => s.difficulty === 'Alta').length}
                    color="red"
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5 text-yellow-600" />}
                    title="Materias de Dificultad Media"
                    value={mockRegionalData.subjectPerformance.filter(s => s.difficulty === 'Media').length}
                    color="yellow"
                  />
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                    title="Materias de Baja Dificultad"
                    value={mockRegionalData.subjectPerformance.filter(s => s.difficulty === 'Baja').length}
                    color="green"
                  />
                </div>
              </div>
            )}

            {/* Tab: Docentes */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">                {/* Estadísticas generales de docentes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    icon={<Users className="w-5 h-5 text-blue-600" />}
                    title="Total Docentes Región"
                    value={mockRegionalData.teacherStats.regional.totalTeachers}
                    color="blue"
                  />
                  <StatCard
                    icon={<Award className="w-5 h-5 text-purple-600" />}
                    title="Experiencia Promedio"
                    value={`${mockRegionalData.teacherStats.regional.avgExperience} años`}
                    color="purple"
                  />
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                    title="Satisfacción Promedio"
                    value={`${mockRegionalData.teacherStats.regional.satisfaction}/5`}
                    color="green"
                  />
                </div>

                {/* Desempeño por materia */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Desempeño Docente por Materia</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockRegionalData.teacherStats.bySubject.map((subject) => (
                      <div key={subject.subject} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                          <span className="text-sm text-gray-600">{subject.teachers} docentes</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Promedio de materia:</span>
                            <span className={`font-bold ${getGradeColor(subject.avgGrade)}`}>
                              {subject.avgGrade}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Satisfacción:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-gray-900">{subject.satisfaction}/5</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= subject.satisfaction ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  >
                                    ★
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendaciones para docentes */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    Recomendaciones para Docentes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Capacitación en Matemáticas</p>
                        <p className="text-sm text-gray-600">Implementar talleres de metodologías innovadoras para mejorar el rendimiento en matemáticas.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Fortalecimiento Cultural</p>
                        <p className="text-sm text-gray-600">Aprovechar la expertise en educación intercultural para replicar en otras escuelas.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Apoyo a Escuelas Rurales</p>
                        <p className="text-sm text-gray-600">Reforzar el equipo docente en escuelas rurales con mayor dificultad de acceso.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Por Ciudades */}
            {activeTab === 'cities' && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockRegionalData.cityStats.map((city) => (
                    <div key={city.city} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          {city.city}
                        </h3>
                        <span className="text-sm text-gray-600">{city.schools} escuelas</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Estudiantes:</span>
                          <span className="font-medium text-gray-900">{city.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Promedio:</span>
                          <span className={`font-bold ${getGradeColor(city.avgGrade)}`}>
                            {city.avgGrade}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Asistencia:</span>
                          <span className={`font-medium ${
                            city.attendance >= 90 ? 'text-green-600' :
                            city.attendance >= 85 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {city.attendance}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Tendencias */}
            {activeTab === 'trends' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Evolución del Promedio Regional</h3>
                    <div className="space-y-4">
                      {mockRegionalData.trendsData.map((month) => (
                        <div key={month.month} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{month.month}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-blue-500"
                                style={{ width: `${(month.avgGrade / 7) * 100}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold text-sm ${getGradeColor(month.avgGrade)}`}>
                              {month.avgGrade}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Evolución de Asistencia Regional</h3>
                    <div className="space-y-4">
                      {mockRegionalData.trendsData.map((month) => (
                        <div key={month.month} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{month.month}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  month.attendance >= 90 ? 'bg-green-500' : 
                                  month.attendance >= 85 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${month.attendance}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold text-sm ${
                              month.attendance >= 90 ? 'text-green-600' :
                              month.attendance >= 85 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {month.attendance}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Meta regional:</strong> 90% de asistencia promedio
                      </p>
                    </div>
                  </div>
                </div>

                {/* Indicadores de tendencia */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                    title="Tendencia Promedio"
                    value="+3.3%"
                    color="green"
                  />
                  <StatCard
                    icon={<TrendingDown className="w-5 h-5 text-red-600" />}
                    title="Tendencia Asistencia"
                    value="-1.1%"
                    color="red"
                  />
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    title="Escuelas Mejorando"
                    value="8 de 12"
                    color="blue"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
