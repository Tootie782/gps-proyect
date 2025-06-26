import { useState } from 'react';
import { ArrowLeft, BookOpen, Users, Calendar, Target, Clock, Award, TrendingUp } from 'lucide-react';
import { ActivityCard } from '../ActivityCard';
import { ActivityDetailModal } from './ActivityDetailModal';
import type { Subject, Activity } from '../../types/student';

interface SubjectDetailViewProps {
  subject: Subject;
  onBack: () => void;
}

export function SubjectDetailView({ subject, onBack }: SubjectDetailViewProps) {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const closeActivityModal = () => {
    setShowActivityModal(false);
    setSelectedActivity(null);
  };

  const completedActivities = subject.actividades.filter(act => act.estado === 'completada');
  const pendingActivities = subject.actividades.filter(act => act.estado === 'pendiente');
  const overdueActivities = subject.actividades.filter(act => act.estado === 'atrasada');

  const getGradeColor = (grade: number) => {
    if (grade >= 6.0) return 'text-green-600';
    if (grade >= 5.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const nextClasses = subject.horario
    ?.filter(clase => clase.estado === 'programada')
    .slice(0, 3) || [];

  return (
    <div className="h-full flex flex-col">
      {/* Header compacto */}
      <div className="flex-shrink-0">
        <div className="p-4 md:p-6 pb-2 md:pb-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 truncate">{subject.nombre}</h1>
              <p className="text-sm text-gray-600 truncate">{subject.descripcion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal con scroll */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="px-4 md:px-6 pt-2 pb-6 space-y-4 md:space-y-6">
          
          {/* Información básica y estadísticas compactas */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Info profesor y aula */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4 h-full">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  Información
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Profesor</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{subject.profesor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Aula</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{subject.aula}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas principales */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <Award className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <p className={`text-lg font-bold ${getGradeColor(subject.promedio)}`}>
                    {subject.promedio.toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-600">Promedio</p>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className={`text-lg font-bold ${getAttendanceColor(subject.asistencia)}`}>
                    {subject.asistencia}%
                  </p>
                  <p className="text-xs text-gray-600">Asistencia</p>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <Target className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-green-600">
                    {completedActivities.length}
                  </p>
                  <p className="text-xs text-gray-600">Completadas</p>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 text-center">
                  <Clock className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-yellow-600">
                    {pendingActivities.length}
                  </p>
                  <p className="text-xs text-gray-600">Pendientes</p>
                </div>
              </div>
            </div>
          </div>          {/* Próximas clases - Compacto */}
          {nextClasses.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Próximas Clases ({nextClasses.length})
              </h3>
              <div className="space-y-2">
                {nextClasses.map((clase) => (
                  <div key={clase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{clase.tema}</h4>
                      <p className="text-xs text-gray-600 truncate">{clase.descripcion}</p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className="text-xs font-medium text-gray-900 capitalize">{clase.dia}</p>
                      <p className="text-xs text-gray-600">{clase.horaInicio} - {clase.horaFin}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actividades - Mejoradas */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                Actividades
              </h3>
              <span className="text-xs text-gray-500">
                {subject.actividades.length} total
              </span>
            </div>
            
            {/* Filtros compactos */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 font-medium">
                {completedActivities.length} Completadas
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 font-medium">
                {pendingActivities.length} Pendientes
              </span>
              {overdueActivities.length > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 font-medium">
                  {overdueActivities.length} Atrasadas
                </span>
              )}
            </div>

            {/* Lista de actividades con grid responsive */}
            {subject.actividades.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {subject.actividades.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    subject={subject.nombre}
                    onClick={() => handleActivityClick(activity)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No hay actividades disponibles</p>
              </div>
            )}
          </div>

          {/* Recomendaciones compactas */}
          {(subject.promedio < 5.5 || subject.asistencia < 85 || overdueActivities.length > 0 || pendingActivities.length > 0) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recomendaciones
              </h3>
              <ul className="space-y-1 text-xs text-blue-800">
                {subject.promedio < 5.5 && (
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 text-xs">•</span>
                    <span>Solicita ayuda adicional para mejorar tu rendimiento académico</span>
                  </li>
                )}
                {subject.asistencia < 85 && (
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 text-xs">•</span>
                    <span>Mejora tu asistencia para no perderte contenidos importantes</span>
                  </li>
                )}
                {overdueActivities.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5 text-xs">•</span>
                    <span>Ponte al día con {overdueActivities.length} actividades atrasadas</span>
                  </li>
                )}
                {pendingActivities.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-0.5 text-xs">•</span>
                    <span>Planifica tiempo para completar {pendingActivities.length} actividades pendientes</span>
                  </li>
                )}
                {completedActivities.length === subject.actividades.length && subject.actividades.length > 0 && (
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5 text-xs">•</span>
                    <span>¡Excelente! Has completado todas las actividades</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalle de actividad */}
      <ActivityDetailModal
        isOpen={showActivityModal}
        activity={selectedActivity}
        subjectName={subject.nombre}
        onClose={closeActivityModal}
      />
    </div>
  );
}
