import { useState } from 'react';
import { Calendar, Clock, MapPin, School, Users, Plus } from 'lucide-react';
import type { Teacher, TeacherClass } from '../../types/teacher';

interface TeacherScheduleProps {
  teacher: Teacher;
  upcomingClasses: Array<TeacherClass & { dayName: string; isToday: boolean }>;
}

export function TeacherSchedule({ teacher, upcomingClasses }: TeacherScheduleProps) {
  const [viewMode, setViewMode] = useState<'week' | 'upcoming'>('week');
  
  const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
  
  const getClassesForDay = (day: string) => {
    return teacher.horarioSemanal.filter(clase => clase.dia.toLowerCase() === day.toLowerCase());
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'completada': return 'bg-green-100 text-green-800 border-green-200';
      case 'programada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelada': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSchoolColor = (schoolName: string) => {
    const colors = [
      'bg-purple-100 text-purple-800',
      'bg-indigo-100 text-indigo-800',
      'bg-teal-100 text-teal-800',
      'bg-orange-100 text-orange-800'
    ];
    const hash = schoolName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Mi Horario</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'week' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Semanal
              </button>
              <button
                onClick={() => setViewMode('upcoming')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  viewMode === 'upcoming' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Próximas
              </button>
            </div>
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'week' ? (
          <div className="space-y-4">
            {daysOfWeek.map((day) => {
              const dayClasses = getClassesForDay(day);
              
              return (
                <div key={day} className="space-y-2">
                  <h4 className="font-medium text-gray-900 capitalize text-sm sticky top-0 bg-white py-1">
                    {day}
                  </h4>
                  {dayClasses.length > 0 ? (
                    <div className="space-y-2">
                      {dayClasses.map((clase) => (
                        <div
                          key={clase.id}
                          className={`p-3 rounded-lg border transition-colors hover:shadow-sm cursor-pointer ${getStatusColor(clase.estado)}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {clase.horaInicio} - {clase.horaFin}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getSchoolColor(clase.escuela)}`}>
                                  {clase.escuela}
                                </span>
                              </div>
                              <p className="font-medium text-sm">{clase.tema}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{clase.curso}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{clase.aula}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">Sin clases programadas</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((clase) => (
                <div
                  key={clase.id}
                  className={`p-4 rounded-lg border transition-colors hover:shadow-sm cursor-pointer ${
                    clase.isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {clase.dayName}
                        </span>
                        {clase.isToday && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                            Hoy
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {clase.horaInicio} - {clase.horaFin}
                        </span>
                      </div>
                      <p className="font-medium">{clase.tema}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                          <School className="w-4 h-4" />
                          <span>{clase.escuela}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{clase.curso}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{clase.aula}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No hay clases próximas programadas</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
