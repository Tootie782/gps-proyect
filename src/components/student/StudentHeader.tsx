import { User } from 'lucide-react';
import type { Student } from '../../types/student';

interface StudentHeaderProps {
  student: Student;
}

export function StudentHeader({ student }: StudentHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg p-3 text-white">
      <div className="flex items-center gap-3">
        <div className="p-1.5 md:p-2 bg-white/20 rounded-full flex-shrink-0">
          <User className="w-4 h-4 md:w-5 md:h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="text-base md:text-lg font-bold truncate">{student.name}</h1>
          <p className="text-emerald-100 text-xs md:text-sm truncate">{student.curso} - {student.escuela}</p>
          <p className="text-emerald-200 text-xs truncate">Docente: {student.docente}</p>
        </div>
      </div>
    </div>
  );
}
