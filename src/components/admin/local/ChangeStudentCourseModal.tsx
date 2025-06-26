import { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';

interface Student { 
  id: number; 
  name: string; 
  courseIds: number[];
}

interface Course {
  id: number;
  name: string;
  level: string;
  section: string;
}

interface ChangeStudentCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentId: number, newCourseId: number) => void;
  student: Student | null;
  availableCourses: Course[];
  currentCourse: Course | null;
}

export function ChangeStudentCourseModal({
  isOpen,
  onClose,
  onSave,
  student,
  availableCourses,
  currentCourse
}: ChangeStudentCourseModalProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  if (!isOpen || !student || !currentCourse) return null;

  // Filter out the current course and get only parallel courses (same level)
  const parallelCourses = availableCourses.filter(course => 
    course.level === currentCourse.level && course.id !== currentCourse.id
  );

  const handleSave = () => {
    if (selectedCourseId && student) {
      onSave(student.id, selectedCourseId);
    }
  };  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-xl border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Cambiar Curso de Estudiante
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Estudiante</h3>
            <p className="text-gray-700">{student.name}</p>
            <p className="text-sm text-gray-500">Curso actual: {currentCourse.name}</p>
          </div>

          {/* Course Selection */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Seleccionar nuevo curso paralelo
            </h3>
            
            {parallelCourses.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No hay cursos paralelos disponibles para este nivel.
              </p>
            ) : (
              <div className="space-y-2">
                {parallelCourses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="newCourse"
                      value={course.id}
                      checked={selectedCourseId === course.id}
                      onChange={() => setSelectedCourseId(course.id)}
                      className="text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">Sección {course.section}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedCourseId}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Cambiar Curso
          </button>
        </div>
      </div>
    </div>
  );
}
