import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../components/AppShell';
import { Plus, User, Users, BookCopy } from 'lucide-react';
import { AddCourseModal } from './AddCourseModal';
import { ManageCourseModal } from './ManageCourseModal';

// Mock Data
const allTeachers = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1 },
  { id: 2, name: 'Ana María Rojas', schoolId: 1 },
  { id: 3, name: 'Pedro Pascal', schoolId: 2 },
];
const allStudents = [
  { id: 1, name: 'Javiera Carrera', schoolId: 1 },
  { id: 2, name: 'Bernardo O\'Higgins', schoolId: 1 },
  { id: 3, name: 'Arturo Prat', schoolId: 2 },
  { id: 4, name: 'Violeta Parra', schoolId: 1 },
];
const mockCourses = [
  { id: 1, name: 'Matemáticas 1°A', teacherId: 1, studentIds: [1, 2], schoolId: 1 },
  { id: 2, name: 'Historia 1°A', teacherId: 2, studentIds: [1, 2, 4], schoolId: 1 },
  { id: 3, name: 'Ciencias 2°B', teacherId: null, studentIds: [], schoolId: 1 },
  { id: 4, name: 'Química', teacherId: 3, studentIds: [3], schoolId: 2 },
];

export function Courses() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;

  const [courses, setCourses] = useState(() => mockCourses.filter(c => c.schoolId === adminSchoolId));
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const schoolTeachers = allTeachers.filter(t => t.schoolId === adminSchoolId);
  const schoolStudents = allStudents.filter(s => s.schoolId === adminSchoolId);

  const handleOpenManageModal = (course) => {
    setSelectedCourse(course);
    setIsManageModalOpen(true);
  };

  const handleAddCourse = (courseName) => {
    const newCourse = {
      id: Math.max(0, ...mockCourses.map(c => c.id)) + 1,
      name: courseName,
      teacherId: null,
      studentIds: [],
      schoolId: adminSchoolId,
    };
    mockCourses.push(newCourse); // Persistencia simulada
    setCourses(prev => [...prev, newCourse]);
  };

  const handleSaveCourse = (courseId, teacherId, studentIds) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId ? { ...c, teacherId, studentIds } : c
    ));
  };

  const getTeacherName = (teacherId: number | null) => {
    if (!teacherId) return <span className="text-gray-500">No asignado</span>;
    return schoolTeachers.find(t => t.id === teacherId)?.name || 'Desconocido';
  };

  return (
    <AppShell role='admin-local'>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Gestión de Cursos</h1>
            <p className="text-gray-600 mt-1">Crea y administra los cursos de tu escuela</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Crear Curso
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <BookCopy className="text-blue-500" size={24} />
                  <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm font-medium">Docente:</span>
                    <span className="text-sm text-gray-700">{getTeacherName(course.teacherId)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <span className="text-sm font-medium">Estudiantes:</span>
                    <span className="text-sm text-gray-700">{course.studentIds.length} inscritos</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleOpenManageModal(course)}
                className="w-full mt-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Administrar Curso
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <AddCourseModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCourse}
      />
      
      <ManageCourseModal 
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        onSave={handleSaveCourse}
        course={selectedCourse}
        teachers={schoolTeachers}
        students={schoolStudents}
      />
    </AppShell>
  );
} 