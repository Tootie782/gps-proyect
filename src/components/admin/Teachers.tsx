import { useState } from 'react';
import { UserPlus, ChevronDown } from 'lucide-react';
import { AppShell } from '../AppShell';
import { AssignSchoolModal } from './AssignSchoolModal';
import { AddTeacherModal } from './AddTeacherModal';

// Mock data
const mockSchools = [
  { id: 1, name: 'Liceo Nacional A' },
  { id: 2, name: 'Colegio San Francisco' },
  { id: 3, name: 'Instituto Tecnológico' }
];

interface Teacher {
  id: number;
  name: string;
  email: string;
  schoolId: number | null;
}

const mockTeachers: Teacher[] = [
  { id: 1, name: 'Carlos Fuentes', email: 'c.fuentes@example.com', schoolId: 1 },
  { id: 2, name: 'Ana María Rojas', email: 'a.rojas@example.com', schoolId: 1 },
  { id: 3, name: 'Pedro Pascal', email: 'p.pascal@example.com', schoolId: 2 },
  { id: 4, name: 'Isidora Jiménez', email: 'i.jimenez@example.com', schoolId: null },
  { id: 5, name: 'Arturo Vidal', email: 'a.vidal@example.com', schoolId: 3 },
  { id: 6, name: 'Gabriela Mistral', email: 'g.mistral@example.com', schoolId: null }
];

export function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // El rol ahora se pasa como prop para mayor claridad
  const role = 'admin-regional'; // Simulado por ahora, se pasaría desde AppShell

  const handleOpenAssignModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setSelectedTeacher(null);
    setIsAssignModalOpen(false);
  };

  const handleAssignSchool = (teacherId: number, schoolId: number | null) => {
    setTeachers(prevTeachers =>
      prevTeachers.map(t => (t.id === teacherId ? { ...t, schoolId } : t))
    );
    handleCloseAssignModal();
  };

  const handleAddTeacher = ({ name, email, schoolId }: { name: string; email: string; schoolId: number | null }) => {
    const newTeacher: Teacher = {
      id: Math.max(0, ...teachers.map(t => t.id)) + 1,
      name,
      email,
      schoolId
    };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const getSchoolName = (schoolId: number | null) => {
    if (schoolId === null) {
      return <span className="text-gray-500">No asignado</span>;
    }
    const school = mockSchools.find(s => s.id === schoolId);
    return school ? school.name : <span className="text-red-500">Escuela no encontrada</span>;
  };

  return (
    <AppShell role="admin-regional">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Directorio de Docentes</h1>
            <p className="text-gray-600 mt-1">Consulta la información de los docentes registrados</p>
          </div>
          {role !== 'admin-regional' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus size={20} />
              Agregar Docente
            </button>
          )}
        </div>

        {/* Teachers Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escuela Asignada
                </th>
                {role !== 'admin-regional' && (
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Acciones</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${teacher.id}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getSchoolName(teacher.schoolId)}
                  </td>
                  {role !== 'admin-regional' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenAssignModal(teacher)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        Asignar Escuela <ChevronDown size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AssignSchoolModal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        onAssign={handleAssignSchool}
        teacher={selectedTeacher}
        schools={mockSchools}
        currentSchoolId={selectedTeacher?.schoolId ?? null}
      />
      
      <AddTeacherModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTeacher}
        schools={mockSchools}
      />
    </AppShell>
  );
} 