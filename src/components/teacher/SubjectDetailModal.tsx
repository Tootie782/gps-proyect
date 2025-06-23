import { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { 
  School, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Plus,
  Edit2,
  Trash2,
  BookOpen
} from 'lucide-react';
import type { Subject } from '../../types/student';
import type { Teacher } from '../../types/teacher';

interface SubjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  subject: Subject;
  teacher: Teacher;
  onAddActivity?: () => void;
  onEditClass?: (classId: string) => void;
}

export function SubjectDetailModal({
  isOpen,
  onClose,
  subject,
  teacher,
  onAddActivity,
  onEditClass
}: SubjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'activities'>('overview');

  // Extraer información de escuela y curso desde la descripción
  const [curso, escuela] = subject.descripcion.split(' • ');

  // Obtener clases de esta materia específica
  const subjectClasses = teacher.horarioSemanal.filter(
    clase => clase.escuela === escuela && clase.curso === curso
  );

  // Obtener actividades de esta materia específica
  const subjectActivities = teacher.actividades.filter(
    actividad => actividad.escuela === escuela && actividad.curso === curso
  );

  const dayLabels = {
    'lunes': 'Lunes',
    'martes': 'Martes',
    'miercoles': 'Miércoles',
    'jueves': 'Jueves',
    'viernes': 'Viernes'
  };

  return (
    <BaseModal open={isOpen} onClose={onClose} title={`${subject.nombre} - ${curso}`} size="xl">
      <div className="space-y-6">
        {/* Header con información básica */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">{subject.nombre}</h3>
                <p className="text-sm text-blue-700">{subject.descripcion}</p>
              </div>
            </div>
            <button
              onClick={onAddActivity}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Nueva Actividad
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-blue-600" />
              <span>{escuela}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{curso}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{subject.aula}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Resumen', icon: BookOpen },
              { key: 'schedule', label: 'Horario', icon: Calendar },
              { key: 'activities', label: 'Actividades', icon: Clock }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de tabs */}
        <div className="min-h-[300px]">
          {/* Tab Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Promedio del Curso</h4>
                  <p className="text-2xl font-bold text-green-600">{subject.promedio.toFixed(1)}</p>
                  <p className="text-sm text-green-700">Muy buen rendimiento</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Asistencia</h4>
                  <p className="text-2xl font-bold text-purple-600">{subject.asistencia}%</p>
                  <p className="text-sm text-purple-700">Por encima del promedio</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Estadísticas Semanales</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">{subjectClasses.length}</p>
                    <p className="text-sm text-gray-600">Clases por semana</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">{subjectActivities.length}</p>
                    <p className="text-sm text-gray-600">Actividades activas</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                      {subjectClasses.reduce((total, clase) => total + (parseInt(clase.horaFin.split(':')[0]) - parseInt(clase.horaInicio.split(':')[0])), 0)}h
                    </p>
                    <p className="text-sm text-gray-600">Horas semanales</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Schedule */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Horario Semanal</h4>
                <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors">
                  <Plus className="w-3 h-3" />
                  Agregar Clase
                </button>
              </div>
              
              {subjectClasses.length > 0 ? (
                <div className="space-y-3">
                  {subjectClasses.map((clase) => (
                    <div key={clase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="font-medium text-gray-900 capitalize">{dayLabels[clase.dia as keyof typeof dayLabels]}</p>
                          <p className="text-sm text-gray-600">{clase.horaInicio} - {clase.horaFin}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{clase.tema}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPin className="w-3 h-3" />
                            <span>{clase.aula}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          clase.estado === 'completada' 
                            ? 'bg-green-100 text-green-800'
                            : clase.estado === 'cancelada'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {clase.estado === 'completada' ? 'Completada' :
                           clase.estado === 'cancelada' ? 'Cancelada' : 'Programada'}
                        </span>
                        <button
                          onClick={() => onEditClass?.(clase.id)}
                          className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay clases programadas para este curso</p>
                </div>
              )}
            </div>
          )}

          {/* Tab Activities */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Actividades y Evaluaciones</h4>
                <button
                  onClick={onAddActivity}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Nueva Actividad
                </button>
              </div>

              {subjectActivities.length > 0 ? (
                <div className="space-y-3">
                  {subjectActivities.map((actividad) => (
                    <div key={actividad.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          actividad.tipo === 'evaluacion' ? 'bg-red-100' :
                          actividad.tipo === 'proyecto' ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          <span className="text-lg">
                            {actividad.tipo === 'evaluacion' ? '📝' :
                             actividad.tipo === 'proyecto' ? '🎯' : '📚'}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{actividad.titulo}</p>
                          <p className="text-sm text-gray-600">{actividad.descripcion}</p>
                          <p className="text-xs text-gray-500">Vence: {actividad.fechaVencimiento}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          actividad.estado === 'activa'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {actividad.estado === 'activa' ? 'Activa' : 'Completada'}
                        </span>
                        <button className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay actividades creadas para este curso</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </BaseModal>
  );
}
