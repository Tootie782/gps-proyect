import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { Plus, User, Users, BookCopy, Calendar, Clock, Target, GraduationCap } from 'lucide-react';
import { AddCourseModal } from './AddCourseModal';
// import { ManageCourseModal } from './ManageCourseModal';
// import { ScheduleModal } from './ScheduleModal';

// Mock Data
const allTeachers = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1 },
  { id: 2, name: 'Ana María Rojas', schoolId: 1 },
  { id: 3, name: 'Pedro Pascal', schoolId: 2 },
  { id: 4, name: 'María González', schoolId: 1 },
  { id: 5, name: 'Luis Hernández', schoolId: 1 },
];

/*
const allStudents = [
  { id: 1, name: 'Javiera Carrera', schoolId: 1 },
  { id: 2, name: 'Bernardo O\'Higgins', schoolId: 1 },
  { id: 3, name: 'Arturo Prat', schoolId: 2 },
  { id: 4, name: 'Violeta Parra', schoolId: 1 },
  { id: 5, name: 'Salvador Allende', schoolId: 1 },
  { id: 6, name: 'Gabriela Mistral', schoolId: 1 },
];
*/

interface Course {
  id: number;
  name: string; // "1°A", "2°B", etc.
  level: string; // "1°", "2°", etc.
  section: string; // "A", "B", etc.
  studentIds: number[];
  schoolId: number;
  teacherCoordinatorId?: number; // Profesor jefe
}

interface Subject {
  id: number;
  name: string; // "Matemáticas", "Historia", etc.
  courseId: number; // A qué curso pertenece
  teacherId: number | null;
  schoolId: number;
  hoursPerWeek: number;
}

interface ScheduleSlot {
  id: string;
  subjectId: number;
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
}

const mockCourses: Course[] = [
  { 
    id: 1, 
    name: '1°A', 
    level: '1°', 
    section: 'A', 
    studentIds: [1, 2, 4], 
    schoolId: 1,
    teacherCoordinatorId: 1
  },
  { 
    id: 2, 
    name: '2°B', 
    level: '2°', 
    section: 'B', 
    studentIds: [5, 6], 
    schoolId: 1,
    teacherCoordinatorId: 2
  },
  { 
    id: 3, 
    name: '3°A', 
    level: '3°', 
    section: 'A', 
    studentIds: [], 
    schoolId: 1 
  },
];

const mockSubjects: Subject[] = [
  { id: 1, name: 'Matemáticas', courseId: 1, teacherId: 1, schoolId: 1, hoursPerWeek: 6 },
  { id: 2, name: 'Lenguaje', courseId: 1, teacherId: 2, schoolId: 1, hoursPerWeek: 6 },
  { id: 3, name: 'Historia', courseId: 1, teacherId: 4, schoolId: 1, hoursPerWeek: 3 },
  { id: 4, name: 'Ciencias', courseId: 1, teacherId: 5, schoolId: 1, hoursPerWeek: 3 },
  { id: 5, name: 'Matemáticas', courseId: 2, teacherId: 1, schoolId: 1, hoursPerWeek: 6 },
  { id: 6, name: 'Lenguaje', courseId: 2, teacherId: 2, schoolId: 1, hoursPerWeek: 6 },
  { id: 7, name: 'Historia', courseId: 2, teacherId: 4, schoolId: 1, hoursPerWeek: 3 },
];

const mockSchedules: ScheduleSlot[] = [
  { id: '1', subjectId: 1, day: 'Lunes', startTime: '08:00', endTime: '08:45', room: 'Aula 101' },
  { id: '2', subjectId: 1, day: 'Lunes', startTime: '08:45', endTime: '09:30', room: 'Aula 101' },
  { id: '3', subjectId: 1, day: 'Miércoles', startTime: '10:15', endTime: '11:00', room: 'Aula 101' },
  { id: '4', subjectId: 2, day: 'Martes', startTime: '08:00', endTime: '08:45', room: 'Aula 102' },
  { id: '5', subjectId: 2, day: 'Jueves', startTime: '14:00', endTime: '14:45', room: 'Aula 102' },
  { id: '6', subjectId: 5, day: 'Lunes', startTime: '10:15', endTime: '11:00', room: 'Aula 103' },
  { id: '7', subjectId: 5, day: 'Miércoles', startTime: '08:00', endTime: '08:45', room: 'Aula 103' },
];

export function Courses() {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;  const [courses, setCourses] = useState(() => mockCourses.filter(c => c.schoolId === adminSchoolId));
  const [schedules] = useState(mockSchedules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  // const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  // const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const schoolTeachers = allTeachers.filter(t => t.schoolId === adminSchoolId);
  // const schoolStudents = allStudents.filter(s => s.schoolId === adminSchoolId);
  // Estadísticas
  const totalCourses = courses.length;
  const coursesWithTeacher = courses.filter(c => c.teacherCoordinatorId !== null && c.teacherCoordinatorId !== undefined).length;
  const totalStudentsEnrolled = courses.reduce((sum, course) => sum + course.studentIds.length, 0);
  const averageStudentsPerCourse = totalCourses > 0 ? Math.round(totalStudentsEnrolled / totalCourses) : 0;
  /*
  const handleOpenManageModal = (course: Course) => {
    setSelectedCourse(course);
    setIsManageModalOpen(true);
  };
  */
  const handleOpenScheduleModal = (course: Course) => {
    // setSelectedCourse(course);
    // setIsScheduleModalOpen(true);
    alert(`Funcionalidad de horarios para ${course.name} estará disponible pronto`);
  };
  const handleAddCourse = (courseData: { name: string; level: string; section: string }) => {
    const newCourse: Course = {
      id: Math.max(0, ...mockCourses.map(c => c.id)) + 1,
      name: courseData.name,
      studentIds: [],
      schoolId: adminSchoolId,
      level: courseData.level,
      section: courseData.section,
      teacherCoordinatorId: undefined,
    };
    mockCourses.push(newCourse);
    setCourses(prev => [...prev, newCourse]);
  };
  /*
  const handleSaveCourse = (courseId: number, teacherId: number | null, studentIds: number[]) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, teacherId, studentIds } : c
    ));
  };
  */
  // const handleSaveSchedule = (courseId: number, newSchedules: ScheduleSlot[]) => {
  //   setSchedules(prev => [
  //     ...prev.filter(s => s.courseId !== courseId),
  //     ...newSchedules
  //   ]);
  // };
  const getTeacherName = (teacherId: number | null | undefined) => {
    if (!teacherId) return <span className="text-gray-500">No asignado</span>;
    return schoolTeachers.find(t => t.id === teacherId)?.name || 'Desconocido';
  };
  const getCourseScheduleCount = (courseId: number) => {
    // Obtener las materias del curso y luego contar los slots de horario
    const courseSubjectIds = mockSubjects.filter(s => s.courseId === courseId).map(s => s.id);
    return schedules.filter(s => courseSubjectIds.includes(s.subjectId)).length;
  };

  return (
    <AppShell role='admin-local'>
      <div className="h-full flex flex-col">
        {/* Header compacto */}
        <div className="flex-shrink-0">
          <div className="p-4 md:p-6 pb-2 md:pb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookCopy className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900">Gestión de Cursos</h1>
                  <p className="text-sm text-gray-600">Administra cursos y horarios de tu escuela</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full md:w-auto"
              >
                <Plus className="w-4 h-4" />
                Crear Curso
              </button>
            </div>
          </div>
        </div>

        {/* Contenido principal con scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-4 md:px-6 pt-2 pb-6">
            
            {/* Estadísticas compactas */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <BookCopy className="w-4 h-4 text-blue-600" />
                    <div className="text-base md:text-lg font-bold text-blue-600">
                      {totalCourses}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Cursos</div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <User className="w-4 h-4 text-emerald-600" />
                    <div className="text-base md:text-lg font-bold text-emerald-600">
                      {coursesWithTeacher}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Con Docente</div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <div className="text-base md:text-lg font-bold text-purple-600">
                      {totalStudentsEnrolled}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Estudiantes</div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="w-4 h-4 text-orange-600" />
                    <div className="text-base md:text-lg font-bold text-orange-600">
                      {averageStudentsPerCourse}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Promedio/Curso</div>
                </div>
              </div>
            </div>

            {/* Lista de cursos */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm md:text-base font-semibold text-gray-800 flex items-center gap-2">
                  <BookCopy className="w-4 h-4" />
                  Lista de Cursos
                  <span className="ml-auto text-xs text-gray-500">
                    {totalCourses} cursos registrados
                  </span>
                </h2>
              </div>
              
              <div className="p-4">
                {courses.length > 0 ? (
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map(course => {
                      const scheduleCount = getCourseScheduleCount(course.id);
                      return (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <BookCopy className="w-5 h-5 text-blue-500 flex-shrink-0" />
                              <div>
                                <h3 className="font-semibold text-gray-900 text-sm">{course.name}</h3>
                                <p className="text-xs text-gray-500">{course.level} - {course.section}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-xs">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">Docente:</span>
                              <span className="text-gray-800 font-medium">{getTeacherName(course.teacherCoordinatorId)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Users className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">Estudiantes:</span>
                              <span className="text-gray-800 font-medium">{course.studentIds.length} inscritos</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">Horarios:</span>
                              <span className="text-gray-800 font-medium">{scheduleCount} bloques</span>
                            </div>
                          </div>
                            <div className="flex gap-2">                            <button 
                              onClick={() => navigate(`/admin-local/${schoolId}/courses/${course.id}`)}
                              className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              Gestionar
                            </button>
                            <button 
                              onClick={() => handleOpenScheduleModal(course)}
                              className="flex-1 px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
                            >
                              <Calendar className="w-3 h-3" />
                              Horarios
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookCopy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No hay cursos registrados</p>
                    <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Crear tu primer curso
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>      
      <AddCourseModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCourse}
      />
        {/* ManageCourseModal comentado porque ahora "Gestionar" navega a CourseDetail
      <ManageCourseModal 
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        onSave={handleSaveCourse}
        course={selectedCourse}
        teachers={schoolTeachers}
        students={schoolStudents}
      />      
      */}
      {/* {selectedCourse && (
        <ScheduleModal 
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          onSave={handleSaveSchedule}
          course={selectedCourse}
          schedules={schedules.filter(s => s.courseId === selectedCourse.id)}
        />
      )} */}
    </AppShell>
  );
}