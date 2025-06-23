import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Student {
  id: number;
  name: string;
}

interface School {
  id: number;
  name: string;
}

interface AssignSchoolToStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (studentId: number, schoolId: number | null) => void;
  student: Student | null;
  schools: School[];
  currentSchoolId: number | null;
}

export function AssignSchoolToStudentModal({ isOpen, onClose, onAssign, student, schools, currentSchoolId }: AssignSchoolToStudentModalProps) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedSchoolId(currentSchoolId);
  }, [currentSchoolId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      onAssign(student.id, selectedSchoolId);
    }
  };
  
  if (!isOpen || !student) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Asignar Escuela</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <p>
            Asignar una escuela para el estudiante: <span className="font-medium">{student.name}</span>
          </p>

          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
              Escuela
            </label>
            <select
              id="school"
              value={selectedSchoolId ?? ''}
              onChange={(e) => setSelectedSchoolId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- No asignar --</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar Asignación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 