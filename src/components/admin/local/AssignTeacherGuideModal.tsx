import { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';

interface Teacher { 
  id: number; 
  name: string; 
  courseIds: number[];
}

interface AssignTeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacherId: number, courseLevel: string, courseSection: string) => void;
  teacher: Teacher | null;
}

const courseLevels = [
  { value: '1', label: '1° Básico' },
  { value: '2', label: '2° Básico' },
  { value: '3', label: '3° Básico' },
  { value: '4', label: '4° Básico' },
  { value: '5', label: '5° Básico' },
  { value: '6', label: '6° Básico' },
  { value: '7', label: '7° Básico' },
  { value: '8', label: '8° Básico' },
  { value: '1M', label: '1° Medio' },
  { value: '2M', label: '2° Medio' },
  { value: '3M', label: '3° Medio' },
  { value: '4M', label: '4° Medio' },
];

const courseSections = [
  'A', 'B', 'C', 'D', 'E', 'F'
];

export function AssignTeacherGuideModal({ isOpen, onClose, onSave, teacher }: AssignTeacherGuideModalProps) {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedLevel('');
      setSelectedSection('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (teacher && selectedLevel && selectedSection) {
      onSave(teacher.id, selectedLevel, selectedSection);
      onClose();
    }
  };

  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-md rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Asignar Profesor Guía</h2>
              <p className="text-sm text-gray-600">{teacher.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-sm text-gray-600">
            Selecciona el curso del cual este docente será profesor guía.
          </p>

          {/* Nivel del Curso */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nivel del Curso
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Seleccionar nivel...</option>
              {courseLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sección del Curso */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Sección
            </label>
            <div className="grid grid-cols-3 gap-2">
              {courseSections.map((section) => (
                <button
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className={`p-3 text-center border rounded-lg transition-colors ${
                    selectedSection === section
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {selectedLevel && selectedSection && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Curso asignado:</span> {
                  courseLevels.find(l => l.value === selectedLevel)?.label
                } - Sección {selectedSection}
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button 
            type="button" 
            onClick={onClose} 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={handleSubmit}
            disabled={!selectedLevel || !selectedSection}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Asignar como Profesor Guía
          </button>
        </div>
      </div>
    </div>
  );
}
