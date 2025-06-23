import { useState } from 'react';
import { 
  Activity, 
  Plus, 
  Calendar, 
  Users, 
  School, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  BookOpen,
  FileText,
  Award
} from 'lucide-react';
import type { TeacherActivity } from '../../types/teacher';

interface TeacherActivitiesProps {
  activities: TeacherActivity[];
}

export function TeacherActivities({ activities }: TeacherActivitiesProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'activa' | 'programada' | 'completada'>('all');
  
  const filteredActivities = activities.filter(activity => 
    filterStatus === 'all' || activity.estado === filterStatus
  );

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activa': return 'bg-green-100 text-green-800 border-green-200';
      case 'programada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completada': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'vencida': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (estado: string) => {
    switch (estado) {
      case 'activa': return 'Activa';
      case 'programada': return 'Programada';
      case 'completada': return 'Completada';
      case 'vencida': return 'Vencida';
      default: return estado;
    }
  };

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case 'tarea': return <BookOpen className="w-4 h-4" />;
      case 'evaluacion': return <Award className="w-4 h-4" />;
      case 'proyecto': return <FileText className="w-4 h-4" />;
      case 'laboratorio': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTypeColor = (tipo: string) => {
    switch (tipo) {
      case 'tarea': return 'text-blue-600';
      case 'evaluacion': return 'text-purple-600';
      case 'proyecto': return 'text-orange-600';
      case 'laboratorio': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const isOverdue = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    return dueDate < today;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Mis Actividades</h3>
          </div>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'Todas' },
            { key: 'activa', label: 'Activas' },
            { key: 'programada', label: 'Programadas' },
            { key: 'completada', label: 'Completadas' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setFilterStatus(filter.key as any)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filterStatus === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredActivities.length > 0 ? (
          <div className="space-y-3">
            {filteredActivities.map((activity) => {
              const pendingGrades = activity.calificaciones.filter(grade => 
                grade.entregado && grade.nota === null
              ).length;
              const totalStudents = activity.calificaciones.length;
              
              return (
                <div
                  key={activity.id}
                  className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(activity.tipo)} bg-opacity-10`}>
                      {getTypeIcon(activity.tipo)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{activity.titulo}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(activity.estado)}`}>
                          {getStatusLabel(activity.estado)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {activity.descripcion}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <School className="w-3 h-3" />
                            <span>{activity.escuela}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{activity.curso}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-1 text-xs ${
                            isOverdue(activity.fechaVencimiento) ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            <Calendar className="w-3 h-3" />
                            <span>Vence: {formatDate(activity.fechaVencimiento)}</span>
                            {isOverdue(activity.fechaVencimiento) && (
                              <AlertTriangle className="w-3 h-3 ml-1" />
                            )}
                          </div>
                          
                          {activity.estado === 'activa' && pendingGrades > 0 && (
                            <div className="flex items-center gap-1 text-xs text-orange-600">
                              <Clock className="w-3 h-3" />
                              <span>{pendingGrades} por calificar</span>
                            </div>
                          )}
                          
                          {activity.estado === 'completada' && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{totalStudents} estudiantes</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {filterStatus === 'all' 
                ? 'No hay actividades registradas'
                : `No hay actividades ${filterStatus === 'activa' ? 'activas' : filterStatus + 's'}`
              }
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Crear Nueva Actividad
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
