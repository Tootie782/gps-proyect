import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import type { TeacherClass, TeacherActivity } from '../../types/teacher';

interface TeacherAlertsProps {
  pendingGrades: Array<{ activity: TeacherActivity; pendingCount: number }>;
  upcomingClasses: Array<TeacherClass & { dayName: string; isToday: boolean }>;
}

export function TeacherAlerts({ pendingGrades, upcomingClasses }: TeacherAlertsProps) {
  const totalPendingGrades = pendingGrades.reduce((total, item) => total + item.pendingCount, 0);
  const todayClasses = upcomingClasses.filter(clase => clase.isToday);
  
  if (totalPendingGrades === 0 && todayClasses.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 mb-4">
      {/* Calificaciones pendientes */}
      {totalPendingGrades > 0 && (
        <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">
              Tienes {totalPendingGrades} calificación{totalPendingGrades !== 1 ? 'es' : ''} pendiente{totalPendingGrades !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-gray-600">
              {pendingGrades.length} actividad{pendingGrades.length !== 1 ? 'es' : ''} necesita{pendingGrades.length === 1 ? '' : 'n'} revisión
            </p>
          </div>
        </div>
      )}

      {/* Clases de hoy */}
      {todayClasses.length > 0 && (
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">
              Tienes {todayClasses.length} clase{todayClasses.length !== 1 ? 's' : ''} hoy
            </p>
            <p className="text-sm text-gray-600">
              Próxima clase: {todayClasses[0].horaInicio} - {todayClasses[0].curso}
            </p>
          </div>
        </div>
      )}

      {/* Estado positivo */}
      {totalPendingGrades === 0 && todayClasses.length === 0 && (
        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900">¡Todo al día!</p>
            <p className="text-sm text-gray-600">No tienes tareas pendientes urgentes</p>
          </div>
        </div>
      )}
    </div>
  );
}
