import { CheckCircle, Clock, AlertCircle, BookOpen } from 'lucide-react';
import type { Activity } from '../types/student';

interface ActivityCardProps {
  activity: Activity;
  subject: string;
  onClick?: (activity: Activity, subject: string) => void;
}

export function ActivityCard({ activity, subject, onClick }: ActivityCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completada':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Completada',
          badgeClass: 'bg-green-100 text-green-700 border-green-200'
        };
      case 'pendiente':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Pendiente',
          badgeClass: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
      case 'atrasada':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Atrasada',
          badgeClass: 'bg-red-100 text-red-700 border-red-200'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Pendiente',
          badgeClass: 'bg-gray-100 text-gray-700 border-gray-200'
        };
    }
  };

  const getActivityTypeConfig = (tipo: string) => {
    switch (tipo) {
      case 'prueba':
        return {
          label: 'Prueba',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-300',
          icon: '📝'
        };
      case 'tarea':
        return {
          label: 'Tarea',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-300',
          icon: '✏️'
        };
      case 'proyecto':
        return {
          label: 'Proyecto',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          borderColor: 'border-purple-300',
          icon: '🏗️'
        };
      case 'laboratorio':
        return {
          label: 'Laboratorio',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
          icon: '🔬'
        };
      default:
        return {
          label: 'Actividad',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-300',
          icon: '📖'
        };
    }
  };

  const getSubjectColor = (subjectName: string) => {
    const colors = [
      'bg-emerald-100 border-emerald-300',
      'bg-blue-100 border-blue-300',
      'bg-purple-100 border-purple-300',
      'bg-orange-100 border-orange-300',
      'bg-pink-100 border-pink-300'
    ];
    const index = subjectName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const statusConfig = getStatusConfig(activity.estado);
  const typeConfig = getActivityTypeConfig(activity.tipo);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      day: 'numeric',
      month: 'short'
    });
  };
  return (
    <div 
      className={`
        p-2 md:p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer
        hover:shadow-md hover:scale-[1.01] 
        ${getSubjectColor(subject)} bg-white
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={() => onClick?.(activity, subject)}
    >
      {/* Header compacto con tipo y fecha */}
      <div className="flex items-start justify-between mb-2">
        <div className={`
          flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium border
          ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}
        `}>
          <span className="text-xs">{typeConfig.icon}</span>
          <span className="hidden sm:inline">{typeConfig.label}</span>
        </div>
        
        <div className="text-right flex flex-col items-end gap-1">
          <div className="text-xs font-medium text-gray-700">
            {formatDate(activity.fecha)}
          </div>
          {activity.nota && (
            <span className="text-xs font-semibold text-gray-600 bg-white px-1.5 py-0.5 rounded border border-gray-200">
              {activity.nota.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      
      {/* Nombre de la actividad - más compacto */}
      <div className="flex items-center gap-1.5 mb-1.5">
        <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-gray-600 flex-shrink-0" />
        <h4 className="font-medium text-gray-900 text-xs md:text-sm line-clamp-1 truncate">
          {activity.nombre}
        </h4>
      </div>
      
      {/* Materia y estado - más compacto */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-700 truncate flex-1 mr-2">{subject}</p>
        <div className={`
          flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs border flex-shrink-0
          ${statusConfig.badgeClass}
        `}>
          <StatusIcon className="w-3 h-3" />
          <span className="hidden sm:inline">{statusConfig.label}</span>
        </div>
      </div>
    </div>
  );
}
