import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../../components/AppShell';
import { Plus, Edit, FileText } from 'lucide-react';
import { AssignCoursesModal } from './AssignCoursesModal';
import { AddLocalTeacherModal } from './AddLocalTeacherModal';

// Mock Data
const allTeachers = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1, courseIds: [1] },
  { id: 2, name: 'Gabriela Mistral', schoolId: 1, courseIds: [2] },
  { id: 3, name: 'Pablo Neruda', schoolId: 2, courseIds: [3] },
  { id: 4, name: 'Nicanor Parra', schoolId: 2, courseIds: [4] },
];

const mockCourses = [
  { id: 1, name: 'Matemáticas 1°A', schoolId: 1 },
  { id: 2, name: 'Lenguaje 1°A', schoolId: 1 },
  { id: 3, name: 'Matemáticas 2°B', schoolId: 2 },
  { id: 4, name: 'Lenguaje 2°B', schoolId: 2 },
];


export function SchoolTeachers() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;
  
  const [teachers, setTeachers] = useState(() => allTeachers.filter(t => t.schoolId === adminSchoolId));
  const schoolCourses = mockCourses.filter(c => c.schoolId === adminSchoolId);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleOpenAssignModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsAssignModalOpen(true);
  };

  const handleGenerateReport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddTeacher = (name, courseIds) => { console.log('Add teacher', name, courseIds); };
  const handleSaveAssignments = (userId, courseIds) => { console.log('Save assignments for user:', userId, 'courses:', courseIds); };

  return (
    <AppShell role="admin-local">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Reporte generado exitosamente.
        </div>
      )}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Docentes de la Escuela</h1>
            <p className="text-gray-600 mt-1">Administra los docentes y sus cursos asignados.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Agregar Docente
          </button>
        </div>

        {/* Tabla de Docentes */}
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
              {teachers.map(teacher => (
                <tr key={teacher.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{teacher.name}</td>
                  <td className="px-6 py-4">
                    {teacher.courseIds
                      .map(id => schoolCourses.find(c => c.id === id)?.name)
                      .filter(Boolean)
                      .join(', ') || <span className="text-gray-400">No asignado</span>}
                  </td>
                  <td className="px-6 py-4 flex gap-2 justify-end">
                    <button 
                      onClick={() => handleOpenAssignModal(teacher)}
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

      <AddLocalTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeacher}
        courses={schoolCourses}
      />
      
      <AssignCoursesModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSave={handleSaveAssignments}
        person={selectedTeacher}
        courses={schoolCourses}
        initialAssignedCourseIds={selectedTeacher?.courseIds || []}
      />
    </AppShell>
  );
} 