import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { useTeachers } from '../../../hooks/useTeachers';
import { School, Clock, MapPin, Users, Calendar, Plus } from 'lucide-react';
import { WeeklySchedule } from '../../../components/student/WeeklySchedule';
import type { Subject } from '../../../types/student';

export function TeacherClasses() {
  const { loading, getTeacherById } = useTeachers();
  const [selectedTeacher] = useState<string>('1');
  const [selectedSchool, setSelectedSchool] = useState<number | 'all'>('all');

  const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
  
  const teacher = getTeacherById(selectedTeacher);

  if (loading) {
    return (
      <AppShell role='teacher'>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AppShell>
    );
  }

  if (!teacher) {
    return (
      <AppShell role='teacher'>
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron datos del docente</p>
        </div>
      </AppShell>
    );
  }

  // Convertir el horario del profesor al formato que espera WeeklySchedule
  const convertToSubjectFormat = (): Subject[] => {
    const schoolsMap = new Map<string, Subject>();

    teacher.horarioSemanal.forEach(clase => {
      const schoolData = teacher.escuelas.find(esc => esc.nombre === clase.escuela);
      const schoolId = schoolData?.id || 0;

      if (selectedSchool !== 'all' && schoolId !== selectedSchool) {
        return;
      }

      const key = `${clase.escuela}-${clase.curso}`;

      if (!schoolsMap.has(key)) {
        schoolsMap.set(key, {
          nombre: `${teacher.materia}`,
          promedio: 6.0,
          asistencia: 88,
          profesor: teacher.name,
          aula: clase.aula,
          descripcion: `${clase.curso} • ${clase.escuela}`,
          horario: [],
          actividades: []
        });
      }

      const subject = schoolsMap.get(key)!;
      // Mapear el día correctamente
      const dayMap: { [key: string]: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' } = {
        'lunes': 'lunes',
        'martes': 'martes',
        'miércoles': 'miercoles',
        'miercoles': 'miercoles',
        'jueves': 'jueves',
        'viernes': 'viernes'
      };
      
      subject.horario.push({
        id: clase.id,
        dia: dayMap[clase.dia.toLowerCase()] || 'lunes',
        horaInicio: clase.horaInicio,
        horaFin: clase.horaFin,
        tema: clase.tema,
        descripcion: `${clase.curso} • ${clase.escuela}`,
        tipo: 'clase',
        estado: clase.estado === 'programada' ? 'programada' : 'completada'
      });

      // Actualizar el aula si es diferente
      if (clase.aula && clase.aula !== subject.aula) {
        subject.aula = clase.aula;
      }
    });

    return Array.from(schoolsMap.values());
  };

  const subjects = convertToSubjectFormat();

  return (
    <AppShell role='teacher'>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Clases</h1>
                <p className="text-gray-600">Gestión de clases por escuela - {teacher.materia}</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                >
                  <option value="all">Todas las escuelas</option>
                  {teacher.escuelas.map((escuela) => (
                    <option key={escuela.id} value={escuela.id}>
                      {escuela.nombre}
                    </option>
                  ))}
                </select>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Nueva Clase
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-6">
            
            {/* Vista Mobile: Lista por escuela */}
            <div className="md:hidden space-y-6">
              {teacher.escuelas.map((escuela) => {
                if (selectedSchool !== 'all' && escuela.id !== selectedSchool) return null;
                
                const escuelaClasses = teacher.horarioSemanal.filter(clase => clase.escuela === escuela.nombre);
                
                return (
                  <div key={escuela.id} className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <School className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-800">{escuela.nombre}</h3>
                        <span className="text-sm text-gray-500">• {escuela.ciudad}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {escuela.cursos.length} cursos • {escuelaClasses.length} clases semanales
                      </p>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-3">
                        {daysOfWeek.map((day) => {
                          const dayClasses = escuelaClasses.filter(clase => clase.dia.toLowerCase() === day.toLowerCase());
                          
                          if (dayClasses.length === 0) return null;
                          
                          return (
                            <div key={day}>
                              <h4 className="font-medium text-gray-700 capitalize text-sm mb-2">{day}</h4>
                              <div className="space-y-2">
                                {dayClasses.map((clase) => (
                                  <div key={clase.id} className="p-3 bg-gray-50 rounded-lg border">
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium">
                                          {clase.horaInicio} - {clase.horaFin}
                                        </span>
                                      </div>
                                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        {clase.curso}
                                      </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{clase.tema}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                      <MapPin className="w-3 h-3" />
                                      <span>{clase.aula}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vista Desktop: Horario semanal */}
            <div className="hidden md:block">
              {subjects.length > 0 ? (
                <WeeklySchedule 
                  subjects={subjects}
                  onClassClick={(classItem, subject) => {
                    console.log('Clicked class:', classItem, 'from subject:', subject);
                  }}
                />
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases programadas</h3>
                  <p className="text-gray-500 mb-4">
                    {selectedSchool === 'all' 
                      ? 'No tienes clases programadas esta semana'
                      : 'No tienes clases programadas en esta escuela'
                    }
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Programar Clase
                  </button>
                </div>
              )}
            </div>

            {/* Resumen de cursos */}
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teacher.escuelas.map((escuela) => {
                if (selectedSchool !== 'all' && escuela.id !== selectedSchool) return null;
                
                const escuelaClasses = teacher.horarioSemanal.filter(clase => clase.escuela === escuela.nombre);
                const cursosSet = new Set(escuelaClasses.map(clase => clase.curso));
                
                return (
                  <div key={escuela.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <School className="w-4 h-4 text-blue-600" />
                      <h3 className="font-medium text-gray-900">{escuela.nombre}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-purple-600" />
                          <span className="text-gray-600">{cursosSet.size} cursos</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-green-600" />
                          <span className="text-gray-600">{escuelaClasses.length} clases/sem</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Cursos:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.from(cursosSet).map((curso) => (
                          <span key={curso} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {curso}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
