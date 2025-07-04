import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
}

interface School {
  id: number;
  name: string;
}

interface AssignSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (teacherId: number, schoolId: number | null) => void;
  teacher: Teacher | null;
  schools: School[];
  currentSchoolId: number | null;
}

export function AssignSchoolModal({ isOpen, onClose, onAssign, teacher, schools, currentSchoolId }: AssignSchoolModalProps) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedSchoolId(currentSchoolId);
  }, [currentSchoolId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacher) {
      onAssign(teacher.id, selectedSchoolId);
    }
  };
  
  if (!isOpen || !teacher) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >      <div 
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
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

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              Asignar una escuela para el docente: <span className="font-medium">{teacher.name}</span>
            </p>
          </div>

          <div>
            <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">
              Escuela
            </label>
            <select
              id="school"
              value={selectedSchoolId ?? ''}
              onChange={(e) => setSelectedSchoolId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            >
              <option value="">-- No asignar --</option>
              {schools.map(school => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Guardar Asignación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 