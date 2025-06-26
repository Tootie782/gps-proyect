import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../AppShell';
import { Plus } from 'lucide-react';
import { AddLocalStudentModal } from './AddLocalStudentModal';
import { AssignStudentToCourseModal } from './AssignStudentToCourseModal';
import { ChangeStudentCourseModal } from './ChangeStudentCourseModal';

// Mock Data
interface Student {
  id: number;
  name: string;
  schoolId: number;
  courseIds: number[];
}

interface Course {
  id: number;
  name: string;
  level: string;
  section: string;
  teacherId: number;
  studentIds: number[];
  schoolId: number;
}

const allStudents: Student[] = [
  { id: 1, name: 'Javiera Carrera', schoolId: 1, courseIds: [1] },
  { id: 2, name: 'Pedro de Valdivia', schoolId: 1, courseIds: [1] },
  { id: 3, name: 'Isabel Riquelme', schoolId: 2, courseIds: [3] },
  { id: 4, name: 'Arturo Prat', schoolId: 2, courseIds: [3] },
];

const mockCourses: Course[] = [
  { id: 1, name: '1° Básico A', level: '1', section: 'A', teacherId: 1, studentIds: [1, 2], schoolId: 1 },
  { id: 2, name: '1° Básico B', level: '1', section: 'B', teacherId: 2, studentIds: [], schoolId: 1 },
  { id: 3, name: '2° Básico A', level: '2', section: 'A', teacherId: 3, studentIds: [3, 4], schoolId: 2 },
  { id: 4, name: '2° Básico B', level: '2', section: 'B', teacherId: 4, studentIds: [], schoolId: 2 },
];

export function SchoolStudents() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;
  
  const [students, setStudents] = useState(() => allStudents.filter(s => s.schoolId === adminSchoolId));
  const schoolCourses = mockCourses.filter(c => c.schoolId === adminSchoolId);  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleOpenAssignModal = (student: Student) => {
    setSelectedStudent(student);
    setIsAssignModalOpen(true);
  };

  const handleOpenChangeModal = (student: Student) => {
    setSelectedStudent(student);
    setIsChangeModalOpen(true);
  };
  
  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const handleGenerateReport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
    const handleAddStudent = (name: string, courseIds: number[]) => { console.log('Add student', name, courseIds); };  const handleSaveStudentCourse = (studentId: number, courseLevel: string, courseSection: string) => { 
    console.log('Assign student:', studentId, 'to course:', courseLevel + courseSection); 
  };

  const handleChangeStudentCourse = (studentId: number, newCourseId: number) => {
    console.log('Change student:', studentId, 'to new course:', newCourseId);
  };

  return (
    <AppShell role="admin-local">
      {/* Notificación Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Reporte generado exitosamente.
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Estudiantes de la Escuela</h1>
            <p className="text-gray-600 mt-1">Administra los estudiantes y sus cursos asignados.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Agregar Estudiante
          </button>
        </div>        {/* Tabla de Estudiantes */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso Asignado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${student.id}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">Estudiante de la escuela</div>
                      </div>
                    </div>
                  </td>                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.courseIds && student.courseIds.length > 0
                      ? student.courseIds
                          .map(id => schoolCourses.find(c => c.id === id)?.name)
                          .filter(Boolean)
                          .slice(0, 1) // Solo mostrar el primer curso
                          .join('')
                      : <span className="text-gray-400 italic">Sin asignación</span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">                      <button 
                        onClick={() => handleOpenAssignModal(student)}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Asignar a Curso
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => handleOpenChangeModal(student)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Cambiar Curso
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={handleGenerateReport}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Generar Reporte
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddLocalStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudent}
        courses={schoolCourses}
      />      <AssignStudentToCourseModal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        onSave={handleSaveStudentCourse}
        student={selectedStudent}
      />

      <ChangeStudentCourseModal
        isOpen={isChangeModalOpen}
        onClose={() => setIsChangeModalOpen(false)}
        onSave={handleChangeStudentCourse}
        student={selectedStudent}
        availableCourses={schoolCourses}
        currentCourse={selectedStudent?.courseIds && selectedStudent.courseIds.length > 0 
          ? schoolCourses.find(c => c.id === selectedStudent.courseIds[0]) || null 
          : null
        }
      />
    </AppShell>
  );
} 