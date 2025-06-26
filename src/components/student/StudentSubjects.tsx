import { BookOpen } from 'lucide-react';
import { SubjectCard } from './SubjectCard';
import type { Subject } from '../../types/student';

interface StudentSubjectsProps {
  subjects: Subject[];
  completedActivities: number;
  totalActivities: number;
  onSubjectClick: (subject: Subject) => void;
}

export function StudentSubjects({ 
  subjects, 
  completedActivities, 
  totalActivities, 
  onSubjectClick 
}: StudentSubjectsProps) {
  return (
    <div className="xl:col-span-2 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Mis Materias
        </h2>
        <p className="text-sm text-gray-600">
          {completedActivities} de {totalActivities} actividades completadas
        </p>
      </div>
      <div className="grid gap-4">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={index}
            subject={subject}
            onClick={() => onSubjectClick(subject)}
          />
        ))}
      </div>
    </div>
  );
}
