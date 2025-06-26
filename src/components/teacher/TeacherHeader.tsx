import { User, GraduationCap, School, Calendar } from 'lucide-react';
import type { Teacher } from '../../types/teacher';

interface TeacherHeaderProps {
  teacher: Teacher;
}

export function TeacherHeader({ teacher }: TeacherHeaderProps) {
  const totalCourses = teacher.escuelas.reduce((total, escuela) => total + escuela.cursos.length, 0);
  
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
          ¡Hola, {teacher.name}!
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span>{teacher.materia}</span>
          </div>
          <div className="flex items-center gap-1">
            <School className="w-4 h-4" />
            <span>{teacher.escuelas.length} escuela{teacher.escuelas.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{totalCourses} curso{totalCourses !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block flex-shrink-0">
        <div className="text-right">
          <p className="text-sm text-gray-500">Experiencia</p>
          <p className="text-lg font-semibold text-gray-900">{teacher.experiencia} años</p>
        </div>
      </div>
    </div>
  );
}
