import { X, Clock, MapPin, User, BookOpen, AlertCircle, CheckCircle, Play } from 'lucide-react';
import type { ClassSchedule, Subject } from '../../types/student';

interface ClassDetailModalProps {
  isOpen: boolean;
  classItem: ClassSchedule | null;
  subject: Subject | null;
  onClose: () => void;
  onViewMore?: () => void;
}

export function ClassDetailModal({ isOpen, classItem, subject, onClose, onViewMore }: ClassDetailModalProps) {
  if (!isOpen || !classItem || !subject) return null;

  const getStatusInfo = (estado: ClassSchedule['estado']) => {
    switch (estado) {
      case 'completada':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          text: 'Completada',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800'
        };
      case 'en_curso':
        return {
          icon: <Play className="w-5 h-5 text-blue-600" />,
          text: 'En Curso',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800'
        };
      case 'cancelada':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-600" />,
          text: 'Cancelada',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800'
        };
      default:
        return {
          icon: <Clock className="w-5 h-5 text-gray-600" />,
          text: 'Programada',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800'
        };
    }
  };

  const getTypeInfo = (tipo: ClassSchedule['tipo']) => {
    switch (tipo) {
      case 'evaluacion':
        return {
          text: 'Evaluación',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800'
        };
      case 'laboratorio':
        return {
          text: 'Laboratorio',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        };
      case 'reforzamiento':
        return {
          text: 'Reforzamiento',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800'
        };
      default:
        return {
          text: 'Clase Regular',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800'
        };
    }
  };

  const statusInfo = getStatusInfo(classItem.estado);
  const typeInfo = getTypeInfo(classItem.tipo);

  const dayNames = {
    lunes: 'Lunes',
    martes: 'Martes',
    miercoles: 'Miércoles',
    jueves: 'Jueves',
    viernes: 'Viernes'
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto transition-all duration-300">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 scale-100">          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-xl">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">Detalle de Clase</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Información básica */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{classItem.tema}</h3>
                <p className="text-sm text-gray-600 font-medium">{subject.nombre}</p>
              </div>

              {/* Estado y tipo */}
              <div className="flex gap-2">
                <span className={`
                  inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                  ${statusInfo.bgColor} ${statusInfo.textColor}
                `}>
                  {statusInfo.icon}
                  {statusInfo.text}
                </span>
                <span className={`
                  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                  ${typeInfo.bgColor} ${typeInfo.textColor}
                `}>
                  {typeInfo.text}
                </span>
              </div>
            </div>

            {/* Detalles de horario y ubicación */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {dayNames[classItem.dia]} • {classItem.horaInicio} - {classItem.horaFin}
                </span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{subject.aula}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{subject.profesor}</span>
              </div>
            </div>

            {/* Descripción */}
            {classItem.descripcion && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Descripción</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {classItem.descripcion}
                </p>
              </div>
            )}

            {/* Información adicional según el tipo */}
            {classItem.tipo === 'evaluacion' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Evaluación Programada</span>
                </div>
                <p className="text-xs text-red-700">
                  Recuerda repasar los contenidos vistos en clases anteriores.
                </p>
              </div>
            )}

            {classItem.tipo === 'laboratorio' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Clase Práctica</span>
                </div>
                <p className="text-xs text-blue-700">
                  Actividad práctica para reforzar los conceptos teóricos.
                </p>
              </div>
            )}
          </div>          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
            <div className="flex gap-3">
              {onViewMore && (
                <button
                  onClick={onViewMore}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Ver Materia Completa
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
