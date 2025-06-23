import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Course { id: number; name: string; }
interface Person { id: number; name: string; } // Puede ser un docente o un estudiante

interface AssignCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (personId: number, selectedCourseIds: number[]) => void;
  person: Person | null;
  courses: Course[];
  initialAssignedCourseIds: number[];
}

export function AssignCoursesModal({ isOpen, onClose, onSave, person, courses, initialAssignedCourseIds }: AssignCoursesModalProps) {
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setSelectedCourseIds(new Set(initialAssignedCourseIds));
  }, [initialAssignedCourseIds]);

  const handleToggleCourse = (courseId: number) => {
    setSelectedCourseIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };
  
  const handleSubmit = () => {
    if (person) {
      onSave(person.id, Array.from(selectedCourseIds));
      onClose();
    }
  };

  if (!isOpen || !person) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-lg rounded-xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex-shrink-0 flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold text-gray-800">Asignar Cursos a {person.name}</h2>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          <p className="text-sm text-gray-600">Selecciona los cursos para este usuario.</p>
          <div className="border border-gray-300 rounded-lg max-h-80 overflow-y-auto">
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <span>{course.name}</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedCourseIds.has(course.id)}
                  onChange={() => handleToggleCourse(course.id)}
                />
              </div>
            ))}
             {courses.length === 0 && <p className="p-4 text-center text-gray-500">No hay cursos disponibles en esta escuela.</p>}
          </div>
        </div>
        
        <div className="flex-shrink-0 flex gap-3 p-6 border-t bg-gray-50 rounded-b-xl">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-200">Cancelar</button>
          <button type="button" onClick={handleSubmit} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
} 