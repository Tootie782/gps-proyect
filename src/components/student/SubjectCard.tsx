import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Subject } from '../../types/student';
import { ProgressCircle } from '../ProgressCircle';

interface SubjectCardProps {
  subject: Subject;
  onClick?: () => void;
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const completedActivities = subject.actividades.filter(act => act.estado === 'completada').length;
  const totalActivities = subject.actividades.length;
  const progressPercentage = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;
  
  // Calcular tendencia basada en las últimas actividades
  const recentActivities = subject.actividades
    .filter(act => act.estado === 'completada' && act.nota)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 3);
  
  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (recentActivities.length >= 2) {
    const avgRecent = recentActivities.slice(0, 2).reduce((sum, act) => sum + (act.nota || 0), 0) / 2;
    const avgPrevious = recentActivities.slice(1, 3).reduce((sum, act) => sum + (act.nota || 0), 0) / Math.max(1, recentActivities.slice(1, 3).length);
    
    if (avgRecent > avgPrevious + 0.2) trend = 'up';
    else if (avgRecent < avgPrevious - 0.2) trend = 'down';
  }

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-600" />;
      case 'down': return <TrendingDown size={16} className="text-red-600" />;
      default: return <Minus size={16} className="text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 6.0) return 'text-green-600';
    if (grade >= 5.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return 'text-green-600';
    if (attendance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };  return (
    <div 
      className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors text-sm md:text-base truncate">
            {subject.nombre}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-lg md:text-xl font-bold ${getGradeColor(subject.promedio)}`}>
              {subject.promedio.toFixed(1)}
            </span>
            {getTrendIcon()}
          </div>
        </div>
        <div className="ml-2 flex-shrink-0">
          <ProgressCircle 
            progress={progressPercentage} 
            size={40} 
            strokeWidth={4}
            color="#2D6A4F"
            showText={false}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-3 mb-2 md:mb-3">
        <div className="text-center p-2 bg-gray-50 rounded-md">
          <p className={`text-xs md:text-sm font-semibold ${getAttendanceColor(subject.asistencia)}`}>
            {subject.asistencia}%
          </p>
          <p className="text-xs text-gray-600">Asistencia</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-md">
          <p className="text-xs md:text-sm font-semibold text-gray-700">
            {completedActivities}/{totalActivities}
          </p>
          <p className="text-xs text-gray-600">Actividades</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">
          {Math.round(progressPercentage)}% completado
        </span>
        <span className={`font-medium text-xs ${getTrendColor()}`}>
          {trend === 'up' && 'Mejorando'}
          {trend === 'down' && 'Atención'}
          {trend === 'stable' && 'Estable'}
        </span>
      </div>

      {/* Actividades pendientes o atrasadas - Más compacto */}
      {subject.actividades.some(act => act.estado === 'pendiente' || act.estado === 'atrasada') && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-1 flex-wrap">
            {subject.actividades.filter(act => act.estado === 'pendiente').length > 0 && (
              <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium">
                {subject.actividades.filter(act => act.estado === 'pendiente').length} pend.
              </span>
            )}
            {subject.actividades.filter(act => act.estado === 'atrasada').length > 0 && (
              <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium">
                {subject.actividades.filter(act => act.estado === 'atrasada').length} atr.
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
