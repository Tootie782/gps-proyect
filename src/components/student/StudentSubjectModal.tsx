import { Activity } from 'lucide-react';
import { BaseModal } from '../BaseModal';
import type { Subject, Activity as ActivityType } from '../../types/student';

interface StudentSubjectModalProps {
  isOpen: boolean;
  subject: Subject | null;
  onClose: () => void;
  onActivityClick?: (activity: ActivityType, subjectName: string) => void;
}

export function StudentSubjectModal({ isOpen, subject, onClose, onActivityClick }: StudentSubjectModalProps) {
  if (!subject) return null;

  return (
    <BaseModal
      open={isOpen}
      onClose={onClose}
      title={subject.nombre}
      size="xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{subject.promedio.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Promedio</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">{subject.asistencia}%</p>
            <p className="text-sm text-gray-600">Asistencia</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-800">
              {subject.actividades.filter((act: any) => act.estado === 'completada').length}
            </p>
            <p className="text-sm text-gray-600">Completadas</p>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-800 mb-3 flex items-center">
            <Activity className="mr-2" size={16} />
            Actividades ({subject.actividades.length})
          </h3>          <div className="space-y-2 max-h-60 overflow-y-auto">
            {subject.actividades.map((activity: any, index) => (
              <div 
                key={index} 
                className={`
                  flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors
                  ${onActivityClick ? 'hover:bg-gray-100 cursor-pointer hover:shadow-sm' : 'hover:bg-gray-100'}
                `}
                onClick={() => onActivityClick?.(activity, subject.nombre)}
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.fecha).toLocaleDateString('es-CL', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {activity.nota && (
                    <span className="text-sm font-medium bg-white px-2 py-1 rounded">
                      {activity.nota.toFixed(1)}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    activity.estado === 'completada' 
                      ? 'bg-green-100 text-green-700'
                      : activity.estado === 'pendiente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {activity.estado === 'completada' ? 'Completada' : 
                     activity.estado === 'pendiente' ? 'Pendiente' : 'Atrasada'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Recomendaciones</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            {subject.promedio < 5.5 && (
              <li>• Considera solicitar ayuda adicional en esta materia</li>
            )}
            {subject.asistencia < 85 && (
              <li>• Trata de mejorar tu asistencia a clases</li>
            )}
            {subject.actividades.filter((act: any) => act.estado === 'atrasada').length > 0 && (
              <li>• Ponte al día con las actividades atrasadas lo antes posible</li>
            )}
            {subject.actividades.filter((act: any) => act.estado === 'completada').length === subject.actividades.length && (
              <li>• ¡Excelente trabajo! Has completado todas las actividades</li>
            )}
          </ul>
        </div>
      </div>
    </BaseModal>
  );
}
