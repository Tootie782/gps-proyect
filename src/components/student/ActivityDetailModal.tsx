import { X, FileText, Calendar, Clock, Target, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Activity } from '../../types/student';

interface ActivityDetailModalProps {
  isOpen: boolean;
  activity: Activity | null;
  subjectName?: string;
  onClose: () => void;
}

export function ActivityDetailModal({ isOpen, activity, subjectName, onClose }: ActivityDetailModalProps) {
  if (!isOpen || !activity) return null;

  const getActivityTypeInfo = (tipo: Activity['tipo']) => {
    switch (tipo) {
      case 'prueba':
        return {
          icon: <FileText className="w-5 h-5 text-red-600" />,
          text: 'Prueba',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        };
      case 'proyecto':
        return {
          icon: <Target className="w-5 h-5 text-purple-600" />,
          text: 'Proyecto',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-800',
          borderColor: 'border-purple-200'
        };
      case 'exposicion':
        return {
          icon: <BookOpen className="w-5 h-5 text-blue-600" />,
          text: 'Exposición',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          icon: <FileText className="w-5 h-5 text-gray-600" />,
          text: 'Tarea',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        };
    }
  };

  const getStatusInfo = (estado: Activity['estado']) => {
    switch (estado) {
      case 'completada':
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
          text: 'Completada',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800'
        };
      case 'atrasada':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-red-600" />,
          text: 'Atrasada',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800'
        };
      default:
        return {
          icon: <Clock className="w-4 h-4 text-yellow-600" />,
          text: 'Pendiente',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800'
        };
    }
  };

  const typeInfo = getActivityTypeInfo(activity.tipo);
  const statusInfo = getStatusInfo(activity.estado);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!activity.fechaEntrega) return false;
    const today = new Date();
    const dueDate = new Date(activity.fechaEntrega);
    return today > dueDate && activity.estado !== 'completada';
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
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-auto max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-xl z-10">
            <div className="flex items-center gap-4">
              {typeInfo.icon}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{activity.nombre}</h2>
                {subjectName && (
                  <p className="text-sm text-gray-600 mt-1">{subjectName}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Estado y tipo */}
            <div className="flex flex-wrap gap-3">
              <span className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border
                ${typeInfo.bgColor} ${typeInfo.textColor} ${typeInfo.borderColor}
              `}>
                {typeInfo.icon}
                {typeInfo.text}
              </span>
              <span className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border
                ${statusInfo.bgColor} ${statusInfo.textColor}
              `}>
                {statusInfo.icon}
                {statusInfo.text}
              </span>              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-800 border border-blue-200">
                Peso: {activity.peso}%
              </span>
            </div>            {/* Alerta si está atrasada */}
            {isOverdue() && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-red-800">
                    Esta actividad está atrasada
                  </span>
                </div>
              </div>
            )}

            {/* Información de fechas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activity.fechaEntrega && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Calendar className="w-4 h-4" />
                    Fecha de Entrega
                  </div>
                  <p className="text-base text-gray-700 capitalize bg-gray-50 p-3 rounded-lg">
                    {formatDate(activity.fechaEntrega)}
                  </p>
                </div>
              )}
              
              {activity.nota !== null && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Target className="w-4 h-4" />
                    Calificación
                  </div>
                  <p className="text-base text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {activity.nota.toFixed(1)}
                  </p>
                </div>
              )}
            </div>

            {/* Descripción */}
            {activity.descripcion && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Descripción</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activity.descripcion}
                </p>
              </div>
            )}

            {/* Instrucciones */}
            {activity.instrucciones && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Instrucciones</h3>
                <div className={`
                  p-4 rounded-lg border
                  ${typeInfo.bgColor} ${typeInfo.borderColor}
                `}>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {activity.instrucciones}
                  </p>
                </div>
              </div>
            )}

            {/* Tabla de contenidos (para pruebas principalmente) */}
            {activity.contenidos && activity.contenidos.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900">Contenidos a Evaluar</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {activity.contenidos.map((contenido, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-emerald-600 font-bold mt-0.5">•</span>
                        <span>{contenido}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Consejos según el tipo de actividad */}
            {activity.tipo === 'prueba' && activity.estado === 'pendiente' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800 mb-1">
                      Consejos para preparar la prueba
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Revisa tus apuntes de clase</li>
                      <li>• Practica con ejercicios similares</li>
                      <li>• Consulta dudas con tu profesor</li>
                      <li>• Descansa bien la noche anterior</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activity.tipo === 'proyecto' && activity.estado === 'pendiente' && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-purple-800 mb-1">
                      Consejos para el proyecto
                    </h4>
                    <ul className="text-xs text-purple-700 space-y-1">
                      <li>• Planifica tu tiempo de trabajo</li>
                      <li>• Divide el proyecto en tareas pequeñas</li>
                      <li>• Busca fuentes confiables de información</li>
                      <li>• Revisa los criterios de evaluación</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
