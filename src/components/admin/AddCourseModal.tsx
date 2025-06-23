import { useState } from 'react';
import { X } from 'lucide-react';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (courseData: { name: string; level: string; section: string }) => void;
}

export function AddCourseModal({ isOpen, onClose, onAdd }: AddCourseModalProps) {
  const [level, setLevel] = useState('1°');
  const [section, setSection] = useState('A');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ 
      name: `${level}${section}`,
      level: level,
      section: section,
    });
    onClose();
    setLevel('1°');
    setSection('A');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Crear Nuevo Curso</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nivel *
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                <option value="1°">1° Básico</option>
                <option value="2°">2° Básico</option>
                <option value="3°">3° Básico</option>
                <option value="4°">4° Básico</option>
                <option value="5°">5° Básico</option>
                <option value="6°">6° Básico</option>
                <option value="7°">7° Básico</option>
                <option value="8°">8° Básico</option>
                <option value="1° Medio">1° Medio</option>
                <option value="2° Medio">2° Medio</option>
                <option value="3° Medio">3° Medio</option>
                <option value="4° Medio">4° Medio</option>
              </select>
            </div>            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sección *
              </label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Curso a crear:</span> {level}{section}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Las materias se asignan por separado después de crear el curso
            </p>
          </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
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
              Crear Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 