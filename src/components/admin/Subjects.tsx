import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { Plus, BookCopy, User, Clock, Edit, Trash2, GraduationCap } from 'lucide-react';
import { AddSubjectModal } from './AddSubjectModal';
import { EditSubjectModal } from './EditSubjectModal';

// Mock Data (should be shared or imported)
const allTeachers = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1 },
  { id: 2, name: 'Ana María Rojas', schoolId: 1 },
  { id: 3, name: 'Pedro Pascal', schoolId: 2 },
  { id: 4, name: 'María González', schoolId: 1 },
  { id: 5, name: 'Luis Hernández', schoolId: 1 },
];

const mockCourses = [
  { id: 1, name: '1°A', level: '1°', section: 'A', schoolId: 1 },
  { id: 2, name: '2°B', level: '2°', section: 'B', schoolId: 1 },
  { id: 3, name: '3°A', level: '3°', section: 'A', schoolId: 1 },
];

interface Subject {
  id: number;
  name: string;
  courseId: number;
  teacherId: number | null;
  schoolId: number;
  hoursPerWeek: number;
}

const mockSubjects: Subject[] = [
  { id: 1, name: 'Matemáticas', courseId: 1, teacherId: 1, schoolId: 1, hoursPerWeek: 6 },
  { id: 2, name: 'Lenguaje', courseId: 1, teacherId: 2, schoolId: 1, hoursPerWeek: 6 },
  { id: 3, name: 'Historia', courseId: 1, teacherId: 4, schoolId: 1, hoursPerWeek: 3 },
  { id: 4, name: 'Ciencias', courseId: 1, teacherId: 5, schoolId: 1, hoursPerWeek: 3 },
  { id: 5, name: 'Matemáticas', courseId: 2, teacherId: 1, schoolId: 1, hoursPerWeek: 6 },
  { id: 6, name: 'Lenguaje', courseId: 2, teacherId: 2, schoolId: 1, hoursPerWeek: 6 },
  { id: 7, name: 'Historia', courseId: 2, teacherId: 4, schoolId: 1, hoursPerWeek: 3 },
  { id: 8, name: 'Inglés', courseId: 1, teacherId: null, schoolId: 1, hoursPerWeek: 3 },
  { id: 9, name: 'Educación Física', courseId: 2, teacherId: null, schoolId: 1, hoursPerWeek: 2 },
];

export function Subjects() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;
  
  const [subjects, setSubjects] = useState(() => 
    mockSubjects.filter(s => s.schoolId === adminSchoolId)
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const schoolTeachers = allTeachers.filter(t => t.schoolId === adminSchoolId);
  const schoolCourses = mockCourses.filter(c => c.schoolId === adminSchoolId);

  // Estadísticas
  const totalSubjects = subjects.length;
  const subjectsWithTeacher = subjects.filter(s => s.teacherId !== null).length;
  const subjectsWithoutTeacher = subjects.filter(s => s.teacherId === null).length;
  const totalHoursPerWeek = subjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);

  const handleAddSubject = (subjectData: { 
    name: string; 
    courseId: number; 
    teacherId: number | null; 
    hoursPerWeek: number 
  }) => {
    const newSubject: Subject = {
      id: Math.max(0, ...mockSubjects.map(s => s.id)) + 1,
      name: subjectData.name,
      courseId: subjectData.courseId,
      teacherId: subjectData.teacherId,
      schoolId: adminSchoolId,
      hoursPerWeek: subjectData.hoursPerWeek,
    };
    mockSubjects.push(newSubject);
    setSubjects(prev => [...prev, newSubject]);
  };

  const handleEditSubject = (subjectData: { 
    name: string; 
    courseId: number; 
    teacherId: number | null; 
    hoursPerWeek: number 
  }) => {
    if (!selectedSubject) return;
    
    const updatedSubject = {
      ...selectedSubject,
      ...subjectData
    };
    
    // Update mock data
    const mockIndex = mockSubjects.findIndex(s => s.id === selectedSubject.id);
    if (mockIndex !== -1) {
      mockSubjects[mockIndex] = updatedSubject;
    }
    
    setSubjects(prev => prev.map(s => 
      s.id === selectedSubject.id ? updatedSubject : s
    ));
  };

  const handleDeleteSubject = (subjectId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta materia?')) {
      // Remove from mock data
      const mockIndex = mockSubjects.findIndex(s => s.id === subjectId);
      if (mockIndex !== -1) {
        mockSubjects.splice(mockIndex, 1);
      }
      
      setSubjects(prev => prev.filter(s => s.id !== subjectId));
    }
  };
  const getTeacherName = (teacherId: number | null) => {
    if (!teacherId) return 'Sin asignar';
    const teacher = schoolTeachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Profesor no encontrado';
  };

  // Agrupar materias por curso
  const subjectsByCourse = schoolCourses.map(course => ({
    course,
    subjects: subjects.filter(s => s.courseId === course.id)
  }));

  return (
    <AppShell role="admin-local">
      <div className="p-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Materias</h1>
            <p className="text-gray-600">Administra las materias de todos los cursos</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Materia
          </button>
        </div>        {/* Estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookCopy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Materias</p>
                <p className="text-2xl font-bold text-gray-900">{totalSubjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Con Profesor</p>
                <p className="text-2xl font-bold text-gray-900">{subjectsWithTeacher}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <User className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Sin Profesor</p>
                <p className="text-2xl font-bold text-gray-900">{subjectsWithoutTeacher}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Horas Semanales</p>
                <p className="text-2xl font-bold text-gray-900">{totalHoursPerWeek}</p>
              </div>
            </div>
          </div>
        </div>        {/* Materias por curso */}
        <div className="space-y-6">
          {subjectsByCourse.map(({ course, subjects: courseSubjects }) => (
            <div key={course.id} className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                    <p className="text-sm text-gray-600">{courseSubjects.length} materias</p>
                  </div>
                </div>
              </div>

              <div className="p-4">                {courseSubjects.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {courseSubjects.map((subject) => (
                      <div key={subject.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <BookCopy className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setSelectedSubject(subject);
                                setIsEditModalOpen(true);
                              }}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubject(subject.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">{subject.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            {getTeacherName(subject.teacherId)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {subject.hoursPerWeek} horas/semana
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookCopy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No hay materias asignadas a este curso</p>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Agregar primera materia
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modales */}
        <AddSubjectModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSubject}
          teachers={schoolTeachers}
          courses={schoolCourses}
        />

        <EditSubjectModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedSubject(null);
          }}
          onEdit={handleEditSubject}
          subject={selectedSubject}
          teachers={schoolTeachers}
          courses={schoolCourses}
        />
      </div>
    </AppShell>
  );
}
