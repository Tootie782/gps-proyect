import { Target, Award, Calendar, BookOpen } from 'lucide-react';
import { StatCard } from '../StatCard';

interface StudentStatsProps {
  completedActivities: number;
  totalActivities: number;
  progress: number;
  overallGrade: number;
  attendance: number;
  totalSubjects: number;
}

export function StudentStats({ 
  completedActivities, 
  totalActivities, 
  progress, 
  overallGrade, 
  attendance, 
  totalSubjects 
}: StudentStatsProps) {  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <StatCard
        title="Actividades"
        value={`${completedActivities}/${totalActivities}`}
        icon={Target}
        color="primary"
        subtitle={`${progress}% completado`}
      />
      <StatCard
        title="Promedio"
        value={overallGrade.toFixed(1)}
        icon={Award}
        color={overallGrade >= 6.0 ? 'success' : overallGrade >= 5.0 ? 'warning' : 'danger'}
        subtitle="General"
      />
      <StatCard
        title="Asistencia"
        value={`${attendance}%`}
        icon={Calendar}
        color={attendance >= 85 ? 'success' : 'warning'}
        subtitle="Período"
      />
      <StatCard
        title="Materias"
        value={totalSubjects}
        icon={BookOpen}
        color="primary"
        subtitle="Activas"
      />
    </div>
  );
}
