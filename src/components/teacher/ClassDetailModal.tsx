import { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { Clock, MapPin, Edit2, Save, X, Users, School as SchoolIcon } from 'lucide-react';
import type { ClassSchedule } from '../../types/student';

interface ClassDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  classItem: ClassSchedule;
  subject: { nombre: string; descripcion: string };
  onSave?: (updatedClass: { id: string; tema: string; descripcion: string; observaciones: string }) => void;
}

export function ClassDetailModal({
  isOpen,
  onClose,
  classItem,
  subject,
  onSave
}: ClassDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    tema: classItem.tema,
    descripcion: classItem.descripcion || '',
    observaciones: ''
  });

  const handleSave = () => {
    if (onSave) {
      onSave({
        id: classItem.id,
        tema: editData.tema,
        descripcion: editData.descripcion,
        observaciones: editData.observaciones
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      tema: classItem.tema,
      descripcion: classItem.descripcion || '',
      observaciones: ''
    });
    setIsEditing(false);
  };

  // Extraer información de escuela y curso desde la descripción
  const [curso, escuela] = subject.descripcion.split(' • ');

  return (
    <BaseModal open={isOpen} onClose={onClose} title="Detalles de la Clase">
      <div className="space-y-6">
        {/* Header de la clase */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-900">{subject.nombre}</h3>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  Editar
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-3 h-3" />
                    Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{classItem.horaInicio} - {classItem.horaFin}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{curso}</span>
            </div>
            <div className="flex items-center gap-2">
              <SchoolIcon className="w-4 h-4 text-blue-600" />
              <span>{escuela}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Aula pendiente</span>
            </div>
          </div>
        </div>

        {/* Contenido editable */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tema de la clase
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.tema}
                onChange={(e) => setEditData(prev => ({ ...prev, tema: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ingresa el tema de la clase"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{editData.tema}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            {isEditing ? (
              <textarea
                value={editData.descripcion}
                onChange={(e) => setEditData(prev => ({ ...prev, descripcion: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe los objetivos y contenidos de la clase"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg min-h-[80px]">
                {editData.descripcion || 'Sin descripción'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            {isEditing ? (
              <textarea
                value={editData.observaciones}
                onChange={(e) => setEditData(prev => ({ ...prev, observaciones: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Observaciones adicionales (opcional)"
              />
            ) : (
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg min-h-[60px]">
                {editData.observaciones || 'Sin observaciones'}
              </p>
            )}
          </div>
        </div>

        {/* Estado de la clase */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-2">Estado</h4>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              classItem.estado === 'completada' 
                ? 'bg-green-100 text-green-800'
                : classItem.estado === 'en_curso'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {classItem.estado === 'completada' ? 'Completada' :
               classItem.estado === 'en_curso' ? 'En curso' : 'Programada'}
            </span>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}
