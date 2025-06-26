import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

// Mock data más completo
const mockSchoolData = {
  1: {
    name: 'Escuela El Roble',
    city: 'Temuco',
    totalStudents: 420,
    totalTeachers: 28,
    totalCourses: 15,
    totalSubjects: 45,
    currentPeriod: 'Segundo Semestre 2025'
  },
  2: {
    name: 'Liceo Bicentenario Araucanía',
    city: 'Temuco',
    totalStudents: 380,
    totalTeachers: 25,
    totalCourses: 14,
    totalSubjects: 42,
    currentPeriod: 'Segundo Semestre 2025'
  },
  3: {
    name: 'Colegio Lagos del Sur',
    city: 'Pucón',
    totalStudents: 280,
    totalTeachers: 22,
    totalCourses: 12,
    totalSubjects: 36,
    currentPeriod: 'Segundo Semestre 2025'
  },
  4: {
    name: 'Escuela Rural Llaima',
    city: 'Curacautín',
    totalStudents: 180,
    totalTeachers: 15,
    totalCourses: 8,
    totalSubjects: 24,
    currentPeriod: 'Segundo Semestre 2025'
  },
  5: {
    name: 'Liceo Técnico Forestal',
    city: 'Victoria',
    totalStudents: 350,
    totalTeachers: 28,
    totalCourses: 16,
    totalSubjects: 48,
    currentPeriod: 'Segundo Semestre 2025'
  },
  6: {
    name: 'Colegio Mapuche Nguillatun',
    city: 'Nueva Imperial',
    totalStudents: 290,
    totalTeachers: 24,
    totalCourses: 13,
    totalSubjects: 39,
    currentPeriod: 'Segundo Semestre 2025'
  },
  7: {
    name: 'Escuela Valle del Cautín',
    city: 'Villarrica',
    totalStudents: 320,
    totalTeachers: 26,
    totalCourses: 14,
    totalSubjects: 42,
    currentPeriod: 'Segundo Semestre 2025'
  },
  8: {
    name: 'Liceo Cordillera',
    city: 'Angol',
    totalStudents: 360,
    totalTeachers: 30,
    totalCourses: 15,
    totalSubjects: 45,
    currentPeriod: 'Segundo Semestre 2025'
  },
  9: {
    name: 'Escuela Pewenche',
    city: 'Lonquimay',
    totalStudents: 150,
    totalTeachers: 12,
    totalCourses: 6,
    totalSubjects: 18,
    currentPeriod: 'Segundo Semestre 2025'
  },
  10: {
    name: 'Colegio Volcán Llaima',
    city: 'Melipeuco',
    totalStudents: 220,
    totalTeachers: 18,
    totalCourses: 10,
    totalSubjects: 30,
    currentPeriod: 'Segundo Semestre 2025'
  }
};

const mockAcademicData = {
  generalStats: {
    averageGrade: 6.2,
    attendanceRate: 89,
    completionRate: 78,
    improvementRate: 5.2
  },
  coursePerformance: [
    { course: '1° Básico A', students: 28, avgGrade: 6.4, attendance: 92, completion: 85 },
    { course: '1° Básico B', students: 26, avgGrade: 6.1, attendance: 88, completion: 82 },
    { course: '2° Básico A', students: 30, avgGrade: 6.0, attendance: 90, completion: 80 },
    { course: '2° Básico B', students: 28, avgGrade: 6.3, attendance: 87, completion: 78 },
    { course: '3° Básico A', students: 25, avgGrade: 5.9, attendance: 85, completion: 75 },
    { course: '3° Básico B', students: 27, avgGrade: 6.2, attendance: 91, completion: 83 },
    { course: '4° Básico A', students: 29, avgGrade: 5.8, attendance: 86, completion: 77 }
  ],
  subjectPerformance: [
    { subject: 'Matemáticas', avgGrade: 5.8, difficulty: 'Alta', teachersAssigned: 5, students: 210 },
    { subject: 'Lenguaje', avgGrade: 6.3, difficulty: 'Media', teachersAssigned: 4, students: 210 },
    { subject: 'Historia', avgGrade: 6.1, difficulty: 'Media', teachersAssigned: 3, students: 180 },
    { subject: 'Ciencias', avgGrade: 6.0, difficulty: 'Media', teachersAssigned: 4, students: 210 },
    { subject: 'Inglés', avgGrade: 5.9, difficulty: 'Alta', teachersAssigned: 2, students: 210 },
    { subject: 'Educación Física', avgGrade: 6.5, difficulty: 'Baja', teachersAssigned: 2, students: 210 },
    { subject: 'Artes', avgGrade: 6.4, difficulty: 'Baja', teachersAssigned: 2, students: 180 }
  ],
  teacherStats: [
    { name: 'Prof. García', subject: 'Matemáticas', courses: 3, avgGrade: 6.1, studentSatisfaction: 4.2, experience: '8 años' },
    { name: 'Prof. López', subject: 'Lenguaje', courses: 2, avgGrade: 6.4, studentSatisfaction: 4.5, experience: '12 años' },
    { name: 'Prof. Martínez', subject: 'Historia', courses: 2, avgGrade: 6.2, studentSatisfaction: 4.3, experience: '6 años' },
    { name: 'Prof. Silva', subject: 'Ciencias', courses: 3, avgGrade: 6.0, studentSatisfaction: 4.1, experience: '10 años' },
    { name: 'Prof. Rodríguez', subject: 'Inglés', courses: 4, avgGrade: 5.9, studentSatisfaction: 4.0, experience: '5 años' },
    { name: 'Prof. Morales', subject: 'Educación Física', courses: 5, avgGrade: 6.5, studentSatisfaction: 4.7, experience: '15 años' }
  ],
  attendanceTrend: [
    { month: 'Marzo', rate: 91, target: 90 },
    { month: 'Abril', rate: 89, target: 90 },
    { month: 'Mayo', rate: 87, target: 90 },
    { month: 'Junio', rate: 89, target: 90 },
    { month: 'Julio', rate: 88, target: 90 },
    { month: 'Agosto', rate: 90, target: 90 }
  ]
};

export function Reports() {
  const { schoolId } = useParams();
  const location = useLocation();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 1;
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'subjects' | 'teachers' | 'attendance'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Determinar el role basado en la URL
  const isRegionalAdmin = location.pathname.startsWith('/admin-regional/');
  const userRole = isRegionalAdmin ? 'admin-regional' : 'admin-local';

  const schoolData = mockSchoolData[adminSchoolId as keyof typeof mockSchoolData];

  if (!schoolData) {
    return (
      <AppShell role={userRole}>
        <div className="p-6">
          <h1>Escuela no encontrada</h1>
        </div>
      </AppShell>
    );
  }

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Alta': return 'text-red-600 bg-red-100';
      case 'Media': return 'text-yellow-600 bg-yellow-100';
      case 'Baja': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 6.0) return 'text-green-600';
    if (grade >= 5.0) return 'text-yellow-600';
    return 'text-red-600';
  };
  return (
    <AppShell role={userRole}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isRegionalAdmin ? 'Reporte Detallado de Escuela' : 'Centro de Reportes'}
                </h1>
                <p className="text-gray-600">
                  {schoolData.name}
                  {schoolData.city ? ` - ${schoolData.city}` : ''} 
                  {' • '}{schoolData.currentPeriod}
                </p>
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
            <div className="flex space-x-6 overflow-x-auto">
              {[
                { id: 'overview', label: 'Resumen General', icon: BarChart3 },
                { id: 'courses', label: 'Por Cursos', icon: GraduationCap },
                { id: 'subjects', label: 'Por Materias', icon: BookOpen },
                { id: 'teachers', label: 'Docentes', icon: Users },
                { id: 'attendance', label: 'Asistencia', icon: Calendar }
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
                    icon={<Award className="w-5 h-5 text-blue-600" />}
                    title="Promedio General"
                    value={mockAcademicData.generalStats.averageGrade}
                    trend="up"
                    trendValue="+0.2"
                    color="blue"
                  />
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                    title="Asistencia"
                    value={`${mockAcademicData.generalStats.attendanceRate}%`}
                    trend="down"
                    trendValue="-1%"
                    color="green"
                  />
                  <StatCard
                    icon={<Clock className="w-5 h-5 text-purple-600" />}
                    title="Actividades Completadas"
                    value={`${mockAcademicData.generalStats.completionRate}%`}
                    trend="up"
                    trendValue="+3%"
                    color="purple"
                  />
                  <StatCard
                    icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
                    title="Mejora Mensual"
                    value={`+${mockAcademicData.generalStats.improvementRate}%`}
                    color="orange"
                  />
                </div>

                {/* Alertas y avisos */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Alertas y Recomendaciones
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Asistencia en descenso</p>
                        <p className="text-sm text-gray-600">La asistencia ha bajado 2% este mes. Considerar medidas de seguimiento.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Matemáticas requiere atención</p>
                        <p className="text-sm text-gray-600">Promedio de 5.8 en Matemáticas. Sugerir reforzamiento o tutorías.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-900">Mejora en Lenguaje</p>
                        <p className="text-sm text-gray-600">Excelente progreso en Lenguaje con promedio 6.3. ¡Continuar así!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumen de cursos destacados */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Mejores Cursos</h3>
                    <div className="space-y-3">
                      {mockAcademicData.coursePerformance
                        .sort((a, b) => b.avgGrade - a.avgGrade)
                        .slice(0, 3)
                        .map((course, index) => (
                          <div key={course.course} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{course.course}</p>
                              <p className="text-sm text-gray-600">{course.students} estudiantes</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{course.avgGrade}</p>
                              <p className="text-xs text-gray-500">#{index + 1}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Cursos que Necesitan Apoyo</h3>
                    <div className="space-y-3">
                      {mockAcademicData.coursePerformance
                        .sort((a, b) => a.avgGrade - b.avgGrade)
                        .slice(0, 3)
                        .map((course) => (
                          <div key={course.course} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{course.course}</p>
                              <p className="text-sm text-gray-600">{course.students} estudiantes</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">{course.avgGrade}</p>
                              <p className="text-xs text-gray-500">{course.attendance}% asist.</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Por Cursos */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Rendimiento por Curso</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Curso</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estudiantes</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Promedio</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Asistencia</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actividades</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockAcademicData.coursePerformance.map((course) => (
                          <tr key={course.course} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{course.course}</td>
                            <td className="px-4 py-3 text-gray-600">{course.students}</td>
                            <td className={`px-4 py-3 font-bold ${getGradeColor(course.avgGrade)}`}>
                              {course.avgGrade}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                course.attendance >= 90 ? 'bg-green-100 text-green-800' :
                                course.attendance >= 85 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {course.attendance}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                course.completion >= 80 ? 'bg-green-100 text-green-800' :
                                course.completion >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {course.completion}%
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {course.avgGrade >= 6.0 && course.attendance >= 85 ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Por Materias */}
            {activeTab === 'subjects' && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockAcademicData.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(subject.difficulty)}`}>
                          {subject.difficulty}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Promedio:</span>
                          <span className={`font-bold ${getGradeColor(subject.avgGrade)}`}>
                            {subject.avgGrade}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Estudiantes:</span>
                          <span className="font-medium text-gray-900">{subject.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Docentes:</span>
                          <span className="font-medium text-gray-900">{subject.teachersAssigned}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Docentes */}
            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Desempeño Docente</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {mockAcademicData.teacherStats.map((teacher) => (
                      <div key={teacher.name} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{teacher.name}</h4>
                          <span className="text-sm text-gray-600">{teacher.experience}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Materia:</span>
                            <span className="font-medium text-gray-900">{teacher.subject}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Cursos:</span>
                            <span className="font-medium text-gray-900">{teacher.courses}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Promedio:</span>
                            <span className={`font-bold ${getGradeColor(teacher.avgGrade)}`}>
                              {teacher.avgGrade}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Satisfacción:</span>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-gray-900">{teacher.studentSatisfaction}/5</span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div
                                    key={star}
                                    className={`w-3 h-3 ${
                                      star <= teacher.studentSatisfaction ? 'text-yellow-400' : 'text-gray-300'
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
              </div>
            )}

            {/* Tab: Asistencia */}
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Tendencia de Asistencia</h3>
                    <div className="space-y-4">
                      {mockAcademicData.attendanceTrend.map((month) => (
                        <div key={month.month} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{month.month}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  month.rate >= month.target ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${month.rate}%` }}
                              ></div>
                            </div>
                            <span className={`font-bold text-sm ${
                              month.rate >= month.target ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {month.rate}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Meta mensual:</strong> 90% de asistencia
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Asistencia por Curso</h3>
                    <div className="space-y-3">
                      {mockAcademicData.coursePerformance
                        .sort((a, b) => b.attendance - a.attendance)
                        .map((course) => (
                          <div key={course.course} className="flex items-center justify-between p-2 rounded-lg border border-gray-200">
                            <div>
                              <p className="font-medium text-gray-900">{course.course}</p>
                              <p className="text-sm text-gray-600">{course.students} estudiantes</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${
                                course.attendance >= 90 ? 'text-green-600' :
                                course.attendance >= 85 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {course.attendance}%
                              </p>
                              <p className="text-xs text-gray-500">asistencia</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Indicadores de asistencia */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
                    title="Asistencia Excelente (≥90%)"
                    value={mockAcademicData.coursePerformance.filter(c => c.attendance >= 90).length}
                    color="green"
                  />
                  <StatCard
                    icon={<AlertTriangle className="w-5 h-5 text-yellow-600" />}
                    title="Asistencia Regular (85-89%)"
                    value={mockAcademicData.coursePerformance.filter(c => c.attendance >= 85 && c.attendance < 90).length}
                    color="yellow"
                  />
                  <StatCard
                    icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
                    title="Asistencia Preocupante (<85%)"
                    value={mockAcademicData.coursePerformance.filter(c => c.attendance < 85).length}
                    color="red"
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