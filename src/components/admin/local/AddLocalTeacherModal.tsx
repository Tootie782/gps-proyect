import { useState } from 'react';

interface Course {
  id: number;
  name: string;
}

interface AddLocalTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, courseIds: number[]) => void;
  courses?: Course[];
}

export function AddLocalTeacherModal({ isOpen, onClose, onAdd, courses = [] }: AddLocalTeacherModalProps) {
  const [name, setName] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  if (!isOpen) return null;

  const handleCourseToggle = (courseId: number) => {
    setSelectedCourses(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const handleSubmit = () => {
    // La funcionalidad no es requerida, solo la UI.
    console.log("Adding teacher:", name, "to courses:", selectedCourses);
    onAdd(name, selectedCourses);
    setName('');
    setSelectedCourses([]);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Docente</h2>
        
        <div className="mb-4">
          <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo del docente
          </label>
          <input
            type="text"
            id="teacherName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Carlos Fuentes"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Asignar Cursos</h3>
          <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2">
            {courses.length > 0 ? courses.map(course => (
              <div key={course.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`course-teacher-${course.id}`}
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => handleCourseToggle(course.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`course-teacher-${course.id}`} className="ml-3 text-sm text-gray-700">
                  {course.name}
                </label>
              </div>
            )) : <p className="text-sm text-gray-500">No hay cursos disponibles en esta escuela.</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Agregar Docente
          </button>
        </div>
      </div>
    </div>
  );
} 