import { useState } from 'react';
import { UserPlus, ChevronDown } from 'lucide-react';
import { AppShell } from '../AppShell';
import { AssignSchoolToStudentModal } from './AssignSchoolToStudentModal';
import { AddStudentModal } from './AddStudentModal';

// Mock data - en un futuro, estos datos vendrían de una API
const mockSchools = [
  { id: 1, name: 'Liceo Nacional A' },
  { id: 2, name: 'Colegio San Francisco' },
  { id: 3, name: 'Instituto Tecnológico' }
];

interface Student {
  id: number;
  name: string;
  email: string;
  schoolId: number | null;
}

const mockStudents: Student[] = [
  { id: 1, name: 'Javiera Carrera', email: 'j.carrera@example.com', schoolId: 1 },
  { id: 2, name: 'Bernardo O\'Higgins', email: 'b.ohiggins@example.com', schoolId: 1 },
  { id: 3, name: 'Arturo Prat', email: 'a.prat@example.com', schoolId: 2 },
  { id: 4, name: 'Violeta Parra', email: 'v.parra@example.com', schoolId: null },
  { id: 5, name: 'Pablo Neruda', email: 'p.neruda@example.com', schoolId: 3 },
];

export function Students() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const role = 'admin-regional'; // Simulado, se pasaría desde AppShell

  const handleOpenAssignModal = (student: Student) => {
    setSelectedStudent(student);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setSelectedStudent(null);
    setIsAssignModalOpen(false);
  };

  const handleAssignSchool = (studentId: number, schoolId: number | null) => {
    setStudents(prev =>
      prev.map(s => (s.id === studentId ? { ...s, schoolId } : s))
    );
    handleCloseAssignModal();
  };

  const handleAddStudent = ({ name, email, schoolId }: { name: string; email: string; schoolId: number | null }) => {
    const newStudent: Student = {
      id: Math.max(0, ...students.map(s => s.id)) + 1,
      name,
      email,
      schoolId
    };
    setStudents(prev => [...prev, newStudent]);
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Directorio de Estudiantes</h1>
            <p className="text-gray-600 mt-1">Consulta la información de los estudiantes registrados</p>
          </div>
          {role !== 'admin-regional' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus size={20} />
              Agregar Estudiante
            </button>
          )}
        </div>

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
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={`https://i.pravatar.cc/40?u=${student.email}`} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getSchoolName(student.schoolId)}
                  </td>
                  {role !== 'admin-regional' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenAssignModal(student)}
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

      <AssignSchoolToStudentModal
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        onAssign={handleAssignSchool}
        student={selectedStudent}
        schools={mockSchools}
        currentSchoolId={selectedStudent?.schoolId ?? null}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddStudent}
        schools={mockSchools}
      />
    </AppShell>
  );
} 