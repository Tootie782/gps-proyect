import { useState, useEffect } from 'react';
import { BaseModal } from '../BaseModal';
import { BookCopy, User, Clock, GraduationCap } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  schoolId: number;
}

interface Course {
  id: number;
  name: string;
  schoolId: number;
}

interface Subject {
  id: number;
  name: string;
  courseId: number;
  teacherId: number | null;
  hoursPerWeek: number;
}

interface EditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (subjectData: {
    id: number;
    name: string;
    courseId: number;
    teacherId: number | null;
    hoursPerWeek: number;
  }) => void;
  subject: Subject | null;
  teachers: Teacher[];
  courses: Course[];
}

export function EditSubjectModal({ 
  isOpen, 
  onClose, 
  onEdit, 
  subject,
  teachers, 
  courses 
}: EditSubjectModalProps) {
  const [subjectName, setSubjectName] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<number | null>(null);
  const [hoursPerWeek, setHoursPerWeek] = useState(1);

  useEffect(() => {
    if (subject) {
      setSubjectName(subject.name);
      setSelectedCourseId(subject.courseId);
      setSelectedTeacherId(subject.teacherId);
      setHoursPerWeek(subject.hoursPerWeek);
    }
  }, [subject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !subjectName.trim() || !selectedCourseId) {
      return;
    }

    onEdit({
      id: subject.id,
      name: subjectName.trim(),
      courseId: selectedCourseId,
      teacherId: selectedTeacherId,
      hoursPerWeek
    });

    // Reset form
    setSubjectName('');
    setSelectedCourseId(null);
    setSelectedTeacherId(null);
    setHoursPerWeek(1);
  };

  const handleClose = () => {
    setSubjectName('');
    setSelectedCourseId(null);
    setSelectedTeacherId(null);
    setHoursPerWeek(1);
    onClose();
  };

  if (!subject) return null;

  return (
    <BaseModal 
      open={isOpen} 
      onClose={handleClose}
      title="Editar Materia"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre de la materia */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <BookCopy className="w-4 h-4" />
            Nombre de la Materia
          </label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: Matemáticas, Historia, Ciencias..."
            required
          />
        </div>

        {/* Curso */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4" />
            Curso
          </label>
          <select
            value={selectedCourseId || ''}
            onChange={(e) => setSelectedCourseId(Number(e.target.value) || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Seleccionar curso...</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Docente */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4" />
            Docente Asignado
          </label>
          <select
            value={selectedTeacherId || ''}
            onChange={(e) => setSelectedTeacherId(Number(e.target.value) || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sin asignar</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Horas por semana */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4" />
            Horas por Semana
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
