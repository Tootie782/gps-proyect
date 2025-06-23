import { useState, useEffect } from 'react';
import { X, User, Users } from 'lucide-react';

// Interfaces que deberían ser importadas desde un archivo de tipos común
interface Teacher { id: number; name: string; }
interface Student { id: number; name: string; }
interface Course { id: number; name: string; teacherId: number | null; studentIds: number[]; }

interface ManageCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courseId: number, teacherId: number | null, studentIds: number[]) => void;
  course: Course | null;
  teachers: Teacher[];
  students: Student[];
}

export function ManageCourseModal({ isOpen, onClose, onSave, course, teachers, students }: ManageCourseModalProps) {
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (course) {
      setTeacherId(course.teacherId);
      setSelectedStudentIds(new Set(course.studentIds));
    }
  }, [course]);

  const handleStudentToggle = (studentId: number) => {
    setSelectedStudentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };

  const handleSubmit = () => {
    if (course) {
      onSave(course.id, teacherId, Array.from(selectedStudentIds));
      onClose();
    }
  };

  if (!isOpen || !course) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Administrar: {course.name}</h2>
          <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {/* Asignar Docente */}
          <div>
            <label className="flex items-center gap-2 text-md font-medium text-gray-700 mb-2">
              <User size={18} /> Asignar Docente
            </label>
            <select
              value={teacherId ?? ''}
              onChange={(e) => setTeacherId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Sin docente asignado --</option>
              {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          {/* Asignar Estudiantes */}
          <div>
            <label className="flex items-center gap-2 text-md font-medium text-gray-700 mb-2">
              <Users size={18} /> Asignar Estudiantes
            </label>
            <div className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
              {students.map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                  <span>{student.name}</span>
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedStudentIds.has(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
} 