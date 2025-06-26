import { useState, useEffect } from 'react';
import { X, GraduationCap } from 'lucide-react';

interface Course { 
  id: number; 
  name: string; 
}

interface Student { 
  id: number; 
  name: string; 
  courseIds: number[];
}

interface AssignCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentId: number, selectedCourseIds: number[]) => void;
  student: Student | null;
  courses: Course[];
  initialAssignedCourseIds: number[];
}

export function AssignCoursesModal({ isOpen, onClose, onSave, student, courses, initialAssignedCourseIds }: AssignCoursesModalProps) {
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
    if (student) {
      onSave(student.id, Array.from(selectedCourseIds));
      onClose();
    }
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-lg rounded-xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Asignar Cursos</h2>
              <p className="text-sm text-gray-600">{student.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600">
            Selecciona los cursos en los que el estudiante estará inscrito.
          </p>
          
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {courses.map(course => (
              <label
                key={course.id}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCourseIds.has(course.id)
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="font-medium text-gray-900">{course.name}</span>
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={selectedCourseIds.has(course.id)}
                  onChange={() => handleToggleCourse(course.id)}
                />
              </label>
            ))}
            {courses.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <GraduationCap className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No hay cursos disponibles en esta escuela.</p>
              </div>
            )}
          </div>

          {/* Selected count */}
          {Array.from(selectedCourseIds).length > 0 && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <span className="font-medium">
                  {Array.from(selectedCourseIds).length} curso(s) seleccionado(s)
                </span>
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
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
} 