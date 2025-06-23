import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../../components/AppShell';
import { Plus, Edit, FileText } from 'lucide-react';
import { AddLocalStudentModal } from './AddLocalStudentModal';
import { AssignCoursesModal } from './AssignCoursesModal';

// Mock Data
const allStudents = [
  { id: 1, name: 'Javiera Carrera', schoolId: 1, courseIds: [1] },
  { id: 2, name: 'Pedro de Valdivia', schoolId: 1, courseIds: [1, 2] },
  { id: 3, name: 'Isabel Riquelme', schoolId: 2, courseIds: [3] },
  { id: 4, name: 'Arturo Prat', schoolId: 2, courseIds: [3, 4] },
];

const mockCourses = [
  { id: 1, name: 'Matemáticas 1°A', teacherId: 1, studentIds: [1, 2], schoolId: 1 },
  { id: 2, name: 'Lenguaje 1°A', teacherId: 2, studentIds: [1], schoolId: 1 },
  { id: 3, name: 'Matemáticas 2°B', teacherId: 3, studentIds: [3, 4], schoolId: 2 },
  { id: 4, name: 'Lenguaje 2°B', teacherId: 4, studentIds: [4], schoolId: 2 },
];

export function SchoolStudents() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;
  
  const [students, setStudents] = useState(() => allStudents.filter(s => s.schoolId === adminSchoolId));
  const schoolCourses = mockCourses.filter(c => c.schoolId === adminSchoolId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleOpenAssignModal = (student) => {
    setSelectedStudent(student);
    setIsAssignModalOpen(true);
  };
  
  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  const handleGenerateReport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  const handleAddStudent = (name, courseIds) => { console.log('Add student', name, courseIds); };
  const handleSaveAssignments = (userId, courseIds) => { console.log('Save assignments for user:', userId, 'courses:', courseIds); };

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
        </div>

        {/* Tabla de Estudiantes */}
        <div className="bg-white overflow-x-auto rounded-lg shadow">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
              <tr>
                <th scope="col" className="px-6 py-3">Nombre</th>
                <th scope="col" className="px-6 py-3">Cursos Asignados</th>
                <th scope="col" className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4">
                    {student.courseIds
                      .map(id => schoolCourses.find(c => c.id === id)?.name)
                      .filter(Boolean)
                      .join(', ') || <span className="text-gray-400">No asignado</span>}
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button 
                      onClick={() => handleOpenAssignModal(student)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition"
                    >
                      <Edit size={14} /> Asignar Cursos
                    </button>
                    <button 
                      onClick={handleGenerateReport}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-600 border border-green-200 rounded-md hover:bg-green-50 transition"
                    >
                      <FileText size={14} /> Generar Reporte
                    </button>
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
      />
      
      <AssignCoursesModal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        onSave={handleSaveAssignments}
        person={selectedStudent}
        courses={schoolCourses}
        initialAssignedCourseIds={selectedStudent?.courseIds || []}
      />
    </AppShell>
  );
} 