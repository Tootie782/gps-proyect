import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { BaseModal } from '../BaseModal';
import { AddSubjectModal } from './AddSubjectModal';
import { CourseSchedule } from '../shared/CourseSchedule';
import { ChangeStudentCourseModal } from './local/ChangeStudentCourseModal';
import { 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Calendar, 
  UserCheck,
  Plus,
  Edit,
  Trash2,
  Clock,
  User,
  RefreshCw
} from 'lucide-react';

// Mock data
const mockCourses = [
  {
    id: '1',
    level: '1',
    section: 'A',
    homeroomTeacherId: 1,
    studentCount: 25,
    description: 'Primer año sección A'
  },
  {
    id: '2',
    level: '2', 
    section: 'B',
    homeroomTeacherId: 2,
    studentCount: 23,
    description: 'Segundo año sección B'
  }
];

const mockSubjects = [
  {
    id: 1,
    name: 'Matemáticas',
    courseId: '1',
    teacherId: 1,
    teacherName: 'Prof. García',
    hoursPerWeek: 6,
    color: '#3B82F6'
  },
  {
    id: 2,
    name: 'Lenguaje',
    courseId: '1', 
    teacherId: 2,
    teacherName: 'Prof. López',
    hoursPerWeek: 5,
    color: '#10B981'
  },
  {
    id: 3,
    name: 'Historia',
    courseId: '1',
    teacherId: 3,
    teacherName: 'Prof. Martínez',
    hoursPerWeek: 3,
    color: '#8B5CF6'
  }
];

const mockTeachers = [
  { id: 1, name: 'Prof. García', subject: 'Matemáticas', schoolId: 1 },
  { id: 2, name: 'Prof. López', subject: 'Lenguaje', schoolId: 1 },
  { id: 3, name: 'Prof. Martínez', subject: 'Historia', schoolId: 1 },
  { id: 4, name: 'Prof. Silva', subject: 'Ciencias', schoolId: 1 },
  { id: 5, name: 'Prof. Rojas', subject: 'Inglés', schoolId: 1 }
];

const mockStudents = [
  { id: 1, name: 'Ana Pérez', rut: '12.345.678-9', courseId: '1', courseIds: [1] },
  { id: 2, name: 'Carlos Morales', rut: '98.765.432-1', courseId: '1', courseIds: [1] },
  { id: 3, name: 'María González', rut: '11.222.333-4', courseId: '1', courseIds: [1] },
  { id: 4, name: 'Diego Hernández', rut: '55.666.777-8', courseId: '1', courseIds: [1] },
  { id: 5, name: 'Sofia Vargas', rut: '99.888.777-6', courseId: '1', courseIds: [1] },
  { id: 6, name: 'Pedro Silva', rut: '22.333.444-5', courseId: '2', courseIds: [2] },
  { id: 7, name: 'Carmen López', rut: '33.444.555-6', courseId: '2', courseIds: [2] },
];

// Available courses for transfers
const allAvailableCourses = [
  { id: 1, name: '1° Básico A', level: '1', section: 'A' },
  { id: 2, name: '1° Básico B', level: '1', section: 'B' },
  { id: 3, name: '1° Básico C', level: '1', section: 'C' },
  { id: 4, name: '2° Básico A', level: '2', section: 'A' },
  { id: 5, name: '2° Básico B', level: '2', section: 'B' },
  { id: 6, name: '3° Básico A', level: '3', section: 'A' },
];

const mockSchedule = [
  {
    day: 'Lunes',
    periods: [
      { time: '08:00-08:45', subject: 'Matemáticas', teacher: 'Prof. García', room: 'Sala 101' },
      { time: '08:45-09:30', subject: 'Matemáticas', teacher: 'Prof. García', room: 'Sala 101' },
      { time: '09:45-10:30', subject: 'Lenguaje', teacher: 'Prof. López', room: 'Sala 102' },
      { time: '10:30-11:15', subject: 'Lenguaje', teacher: 'Prof. López', room: 'Sala 102' },
      { time: '11:30-12:15', subject: 'Historia', teacher: 'Prof. Martínez', room: 'Sala 103' },
      { time: '12:15-13:00', subject: 'Historia', teacher: 'Prof. Martínez', room: 'Sala 103' }
    ]
  },
  {
    day: 'Martes',
    periods: [
      { time: '08:00-08:45', subject: 'Lenguaje', teacher: 'Prof. López', room: 'Sala 102' },
      { time: '08:45-09:30', subject: 'Matemáticas', teacher: 'Prof. García', room: 'Sala 101' },
      { time: '09:45-10:30', subject: 'Matemáticas', teacher: 'Prof. García', room: 'Sala 101' },
      { time: '10:30-11:15', subject: 'Historia', teacher: 'Prof. Martínez', room: 'Sala 103' },
      { time: '11:30-12:15', subject: 'Lenguaje', teacher: 'Prof. López', room: 'Sala 102' },
      { time: '12:15-13:00', subject: 'Matemáticas', teacher: 'Prof. García', room: 'Sala 101' }
    ]
  }
];

// Mock data for next year preview
const getNextYearLevel = (currentLevel: string): string => {
  const levelMap: { [key: string]: string } = {
    '1': '2',
    '2': '3', 
    '3': '4',
    '4': '5',
    '5': '6',
    '6': '7',
    '7': '8',
    '8': '1M'
  };
  return levelMap[currentLevel] || 'Graduado';
};

const mockNextYearSubjects = [
  {
    id: 1,
    name: 'Matemáticas Avanzadas',
    teacherName: 'Prof. García',
    hoursPerWeek: 6,
    color: '#3B82F6'
  },
  {
    id: 2,
    name: 'Lenguaje y Literatura',
    teacherName: 'Prof. López',
    hoursPerWeek: 5,
    color: '#10B981'
  },
  {
    id: 3,
    name: 'Historia y Geografía',
    teacherName: 'Prof. Martínez',
    hoursPerWeek: 4,
    color: '#8B5CF6'
  },
  {
    id: 4,
    name: 'Ciencias Naturales',
    teacherName: 'Prof. Silva',
    hoursPerWeek: 4,
    color: '#F59E0B'
  },
  {
    id: 5,
    name: 'Inglés',
    teacherName: 'Prof. Wilson',
    hoursPerWeek: 3,
    color: '#EF4444'
  }
];

const mockNextYearSchedule = [
  {
    day: 'Lunes',
    periods: [
      { time: '08:00-08:45', subject: 'Matemáticas Avanzadas', teacher: 'Prof. García', room: 'Sala 201' },
      { time: '08:45-09:30', subject: 'Matemáticas Avanzadas', teacher: 'Prof. García', room: 'Sala 201' },
      { time: '09:45-10:30', subject: 'Lenguaje y Literatura', teacher: 'Prof. López', room: 'Sala 202' },
      { time: '10:30-11:15', subject: 'Historia y Geografía', teacher: 'Prof. Martínez', room: 'Sala 203' },
      { time: '11:30-12:15', subject: 'Ciencias Naturales', teacher: 'Prof. Silva', room: 'Lab 301' },
      { time: '12:15-13:00', subject: 'Inglés', teacher: 'Prof. Wilson', room: 'Sala 204' }
    ]
  },
  {
    day: 'Martes',
    periods: [
      { time: '08:00-08:45', subject: 'Ciencias Naturales', teacher: 'Prof. Silva', room: 'Lab 301' },
      { time: '08:45-09:30', subject: 'Matemáticas Avanzadas', teacher: 'Prof. García', room: 'Sala 201' },
      { time: '09:45-10:30', subject: 'Lenguaje y Literatura', teacher: 'Prof. López', room: 'Sala 202' },
      { time: '10:30-11:15', subject: 'Historia y Geografía', teacher: 'Prof. Martínez', room: 'Sala 203' },
      { time: '11:30-12:15', subject: 'Inglés', teacher: 'Prof. Wilson', room: 'Sala 204' },
      { time: '12:15-13:00', subject: 'Educación Física', teacher: 'Prof. Torres', room: 'Gimnasio' }
    ]
  }
];

export function CourseDetail() {
  const { courseId, schoolId } = useParams<{ courseId: string; schoolId: string }>();
  const navigate = useNavigate();
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAssignTeacher, setShowAssignTeacher] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'subjects' | 'schedule' | 'students' | 'preview'>('subjects');
  const [showChangeStudentCourse, setShowChangeStudentCourse] = useState(false);
  const [selectedStudentForChange, setSelectedStudentForChange] = useState<any>(null);

  const course = mockCourses.find(c => c.id === courseId);
  const courseSubjects = mockSubjects.filter(s => s.courseId === courseId);
  const homeroomTeacher = mockTeachers.find(t => t.id === course?.homeroomTeacherId);

  if (!course) {
    return (
      <AppShell role="admin-local">
        <div className="p-6">
          <h1>Curso no encontrado</h1>
        </div>
      </AppShell>
    );
  }

  const handleAssignHomeroomTeacher = () => {
    if (selectedTeacherId) {
      // Aquí iría la lógica para asignar el docente guía
      console.log('Asignando docente guía:', selectedTeacherId);
      setShowAssignTeacher(false);
      setSelectedTeacherId(null);
    }
  };

  return (
    <AppShell role="admin-local">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">              <button
                onClick={() => navigate(`/admin-local/${schoolId}/courses`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  Curso {course.level}°{course.section}
                </h1>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
            </div>

            {/* Stats compactas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{courseSubjects.length}</div>
                <div className="text-xs text-blue-700">Materias</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{course.studentCount}</div>
                <div className="text-xs text-green-700">Estudiantes</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-600">
                  {courseSubjects.reduce((acc, s) => acc + s.hoursPerWeek, 0)}
                </div>
                <div className="text-xs text-purple-700">Horas/Semana</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-orange-600">1</div>
                <div className="text-xs text-orange-700">Docente Guía</div>
              </div>
            </div>

            {/* Docente Guía */}
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm font-medium">Docente Guía</div>
                  <div className="text-sm text-gray-600">
                    {homeroomTeacher ? homeroomTeacher.name : 'No asignado'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAssignTeacher(true)}
                className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {homeroomTeacher ? 'Cambiar' : 'Asignar'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="px-4 md:px-6">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('subjects')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'subjects'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Materias
                </div>
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Horario
                </div>
              </button>              <button
                onClick={() => setActiveTab('students')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'students'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Estudiantes
                </div>
              </button>              <button
                onClick={() => setActiveTab('preview')}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Previsualización 2026
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-6">
            
            {/* Tab: Materias */}
            {activeTab === 'subjects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Materias del Curso</h2>
                  <button
                    onClick={() => setShowAddSubject(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar Materia
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {courseSubjects.map((subject) => (
                    <div key={subject.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        <div className="flex gap-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{subject.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          {subject.teacherName}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {subject.hoursPerWeek} horas/semana
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}            {/* Tab: Horario */}
            {activeTab === 'schedule' && (
              <div className="h-96">
                <CourseSchedule
                  schedule={mockSchedule}
                  courseName={course ? `${course.level}° ${course.section}` : 'Curso'}
                  onPeriodClick={(period, day) => {
                    console.log('Period clicked:', period, 'on', day);
                  }}
                />
              </div>
            )}

            {/* Tab: Estudiantes */}
            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Estudiantes del Curso</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Agregar Estudiante
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="overflow-x-auto">                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nombre</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">RUT</th>
                          <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockStudents.filter(s => s.courseId === courseId).map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{student.rut}</td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center gap-2">
                                <button 
                                  onClick={() => {
                                    setSelectedStudentForChange(student);
                                    setShowChangeStudentCourse(true);
                                  }}
                                  className="p-1 text-gray-400 hover:text-orange-600"
                                  title="Cambiar curso"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-blue-600">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-gray-400 hover:text-red-600">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Preview Próximo Año */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                {/* Header con advertencia */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>                      <h3 className="font-medium text-orange-800">Previsualización Año 2026</h3>
                      <p className="text-sm text-orange-700 mt-1">
                        Esta es una vista previa de cómo se vería el curso {getNextYearLevel(course.level)}°{course.section} el próximo año. 
                        Las materias y horarios mostrados son referenciales y pueden cambiar.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Estadísticas del próximo año */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">{mockNextYearSubjects.length}</div>
                    <div className="text-xs text-blue-700">Materias</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{course.studentCount}</div>
                    <div className="text-xs text-green-700">Est. Estudiantes</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {mockNextYearSubjects.reduce((acc, s) => acc + s.hoursPerWeek, 0)}
                    </div>
                    <div className="text-xs text-purple-700">Horas/Semana</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-600">6</div>
                    <div className="text-xs text-orange-700">Meses Restantes</div>
                  </div>
                </div>

                {/* Materias del próximo año */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Materias Proyectadas para {getNextYearLevel(course.level)}°{course.section}</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockNextYearSubjects.map((subject) => (
                      <div key={subject.id} className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Proyectado</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{subject.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            {subject.teacherName}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {subject.hoursPerWeek} horas/semana
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Horario del próximo año */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Horario Proyectado 2026</h3>
                  <div className="h-96">
                    <CourseSchedule
                      schedule={mockNextYearSchedule}
                      courseName={`${getNextYearLevel(course.level)}° ${course.section} (2026)`}
                      onPeriodClick={(period, day) => {
                        console.log('Preview period clicked:', period, 'on', day);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>      {/* Modal: Agregar Materia */}
      {showAddSubject && (
        <AddSubjectModal
          isOpen={showAddSubject}
          onClose={() => setShowAddSubject(false)}
          onAdd={(subjectData) => {
            console.log('Agregando materia:', subjectData);
            setShowAddSubject(false);
          }}
          teachers={mockTeachers}
          courses={[{ id: parseInt(courseId!), name: `${course.level}°${course.section}`, schoolId: 1 }]}
        />
      )}      {/* Modal: Asignar Docente Guía */}
      {showAssignTeacher && (
        <BaseModal
          open={showAssignTeacher}
          onClose={() => setShowAssignTeacher(false)}
          title="Asignar Docente Guía"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Selecciona el docente que será el profesor jefe de este curso.
            </p>
            
            <div className="space-y-2">
              {mockTeachers.map((teacher) => (
                <label key={teacher.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="homeroomTeacher"
                    value={teacher.id}
                    checked={selectedTeacherId === teacher.id}
                    onChange={() => setSelectedTeacherId(teacher.id)}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                    <div className="text-sm text-gray-600">{teacher.subject}</div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowAssignTeacher(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAssignHomeroomTeacher}
                disabled={!selectedTeacherId}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Asignar
              </button>
            </div>
          </div>
        </BaseModal>
      )}      {/* Modal: Cambiar Curso de Estudiante */}
      {showChangeStudentCourse && selectedStudentForChange && (
        <ChangeStudentCourseModal
          isOpen={showChangeStudentCourse}
          onClose={() => {
            setShowChangeStudentCourse(false);
            setSelectedStudentForChange(null);
          }}
          student={selectedStudentForChange}
          currentCourse={course ? { 
            id: parseInt(course.id), 
            name: `${course.level}° ${course.section}`, 
            level: course.level, 
            section: course.section 
          } : null}
          availableCourses={allAvailableCourses}
          onSave={(studentId: number, newCourseId: number) => {
            console.log('Cambiando estudiante', studentId, 'al curso', newCourseId);
            setShowChangeStudentCourse(false);
            setSelectedStudentForChange(null);
          }}
        />
      )}
    </AppShell>
  );
}
