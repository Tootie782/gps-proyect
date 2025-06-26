import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../AppShell';
import { Plus } from 'lucide-react';
import { AssignTeacherGuideModal } from './AssignTeacherGuideModal';
import { AddLocalTeacherModal } from './AddLocalTeacherModal';

// Mock Data
interface Teacher {
  id: number;
  name: string;
  schoolId: number;
  courseIds: number[];
}

interface Course {
  id: number;
  name: string;
  schoolId: number;
}

const allTeachers: Teacher[] = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1, courseIds: [1] },
  { id: 2, name: 'Gabriela Mistral', schoolId: 1, courseIds: [] },
  { id: 3, name: 'Pablo Neruda', schoolId: 2, courseIds: [3] },
  { id: 4, name: 'Nicanor Parra', schoolId: 2, courseIds: [] },
];

const mockCourses: Course[] = [
  { id: 1, name: '1° Básico A', schoolId: 1 },
  { id: 2, name: '1° Básico B', schoolId: 1 },
  { id: 3, name: '2° Básico A', schoolId: 2 },
  { id: 4, name: '2° Básico B', schoolId: 2 },
];


export function SchoolTeachers() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;
  
  const [teachers, setTeachers] = useState(() => allTeachers.filter(t => t.schoolId === adminSchoolId));
  const schoolCourses = mockCourses.filter(c => c.schoolId === adminSchoolId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleOpenAssignModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsAssignModalOpen(true);
  };

  const handleGenerateReport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddTeacher = (name: string, courseIds: number[]) => { console.log('Add teacher', name, courseIds); };
  const handleSaveTeacherGuide = (teacherId: number, courseLevel: string, courseSection: string) => { 
    console.log('Assign teacher guide:', teacherId, 'to course:', courseLevel + courseSection); 
  };

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
        </div>        {/* Tabla de Docentes */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profesor Guía de
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map(teacher => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${teacher.id}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        <div className="text-sm text-gray-500">Docente de la escuela</div>
                      </div>
                    </div>
                  </td>                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {teacher.courseIds && teacher.courseIds.length > 0 
                      ? teacher.courseIds
                          .map(id => schoolCourses.find(c => c.id === id)?.name)
                          .filter(Boolean)
                          .join(', ')
                      : <span className="text-gray-400 italic">Sin asignación</span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">                    <div className="flex gap-2 justify-end">                      <button 
                        onClick={() => handleOpenAssignModal(teacher)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Asignar como Profesor Guía
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={handleGenerateReport}
                        className="text-green-600 hover:text-green-800 font-medium"
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

      <AddLocalTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeacher}
        courses={schoolCourses}
      />
        <AssignTeacherGuideModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onSave={handleSaveTeacherGuide}
        teacher={selectedTeacher}
      />
    </AppShell>
  );
} 