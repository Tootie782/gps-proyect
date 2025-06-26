import { useState } from 'react';
import { TeacherHeader } from './TeacherHeader';
import { TeacherStats } from './TeacherStats';
import { TeacherAlerts } from './TeacherAlerts';
import { WeeklySchedule } from '../student/WeeklySchedule';
import { StudentRecentActivities } from '../student/StudentRecentActivities';
import { ClassDetailModal } from './ClassDetailModal';
import { NewActivityModal } from './NewActivityModal';
import { Calendar, Activity as ActivityIcon, Plus } from 'lucide-react';
import type { Teacher, TeacherClass, TeacherActivity } from '../../types/teacher';
import type { Subject, ClassSchedule, Activity } from '../../types/student';

interface TeacherDashboardContentProps {
  teacher: Teacher;
  upcomingClasses: Array<TeacherClass & { dayName: string; isToday: boolean }>;
  pendingGrades: Array<{ activity: TeacherActivity; pendingCount: number }>;
  recentActivities: TeacherActivity[];
}

export function TeacherDashboardContent({
  teacher,
  upcomingClasses,
  pendingGrades,
  recentActivities: _recentActivities
}: TeacherDashboardContentProps) {
  // Estado para tabs en mobile
  const [activeTab, setActiveTab] = useState<'schedule' | 'activities'>('schedule');
  
  // Estado para modales
  const [selectedClass, setSelectedClass] = useState<{
    classItem: ClassSchedule;
    subject: Subject;
  } | null>(null);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);

  // Convertir datos del profesor al formato que esperan los componentes de estudiantes
  const convertToSubjectFormat = (): Subject[] => {
    const schoolsMap = new Map<string, Subject>();

    teacher.horarioSemanal.forEach(clase => {
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

      // Actualizar el aula del subject (puede variar por clase)
      if (clase.aula) {
        subject.aula = clase.aula;
      }
    });

    return Array.from(schoolsMap.values());
  };

  // Convertir actividades del profesor al formato que espera StudentRecentActivities
  const convertActivitiesToStudentFormat = () => {
    return teacher.actividades.map(activity => ({
      id: activity.id,
      nombre: activity.titulo,
      fecha: activity.fechaVencimiento,
      nota: null,
      estado: (activity.estado === 'activa' ? 'pendiente' : 
              activity.estado === 'completada' ? 'completada' : 'pendiente') as 'pendiente' | 'completada' | 'atrasada',
      tipo: (activity.tipo === 'evaluacion' ? 'prueba' : 
            activity.tipo === 'proyecto' ? 'proyecto' : 'tarea') as 'tarea' | 'proyecto' | 'prueba' | 'exposicion',
      descripcion: activity.descripcion,
      peso: 20,
      materia: teacher.materia,
      subject: `${activity.curso} • ${activity.escuela}`
    }));
  };

  const subjects = convertToSubjectFormat();
  const studentFormatActivities = convertActivitiesToStudentFormat();

  // Handler para cuando se hace click en una clase del horario
  const handleClassClick = (classItem: ClassSchedule, subject: Subject) => {
    setSelectedClass({ classItem, subject });
  };

  // Handler para cuando se hace click en una actividad
  const handleActivityClick = (activity: Activity, subject: string) => {
    console.log('Actividad seleccionada:', activity, subject);
    // Aquí se podría abrir un modal para editar la actividad
  };

  // Handler para crear nueva actividad
  const handleNewActivity = () => {
    setShowNewActivityModal(true);
  };

  // Handler para guardar actividad
  const handleSaveActivity = (activityData: any) => {
    console.log('Nueva actividad:', activityData);
    // Aquí se implementaría la lógica para guardar la actividad
    setShowNewActivityModal(false);
  };

  // Handler para guardar cambios en clase
  const handleSaveClass = (updatedClass: any) => {
    console.log('Clase actualizada:', updatedClass);
    // Aquí se implementaría la lógica para actualizar la clase
    setSelectedClass(null);
  };

  // Obtener lista de cursos para el modal de nueva actividad
  const getCoursesList = () => {
    const courses: Array<{ escuela: string; curso: string }> = [];
    teacher.escuelas.forEach(escuela => {
      escuela.cursos.forEach(curso => {
        courses.push({ escuela: escuela.nombre, curso });
      });
    });
    return courses;
  };

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header - altura fija y compacta */}
        <div className="flex-shrink-0">
          <div className="p-4 md:p-6 pb-2 md:pb-6">
            {/* Header del profesor */}
            <TeacherHeader teacher={teacher} />

            {/* Alertas importantes */}
            <TeacherAlerts 
              pendingGrades={pendingGrades}
              upcomingClasses={upcomingClasses}
            />
          </div>
        </div>

        {/* Contenido principal - Con scroll en mobile */}
        <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
          <div className="px-4 md:px-6 pt-4 pb-6 md:pt-0 md:h-full">
            
            {/* Layout mobile: Grid 2x2 + Tabs */}
            <div className="md:hidden space-y-6">
              
              {/* Estadísticas principales - Grid 2x2 con tamaño fijo */}
              <div className="h-48">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{teacher.estadisticas.totalEstudiantes}</div>
                      <div className="text-xs text-gray-600">Estudiantes</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{teacher.estadisticas.promedioGeneral.toFixed(1)}</div>
                      <div className="text-xs text-gray-600">Promedio</div>
                      <div className="text-xs text-gray-500">General</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{teacher.estadisticas.asistenciaPromedio}%</div>
                      <div className="text-xs text-gray-600">Asistencia</div>
                      <div className="text-xs text-gray-500">Promedio</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">{teacher.escuelas.length}</div>
                      <div className="text-xs text-gray-600">Escuelas</div>
                      <div className="text-xs text-gray-500">Activas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs para Horario y Actividades */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Tab Headers */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'schedule'
                        ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Horario
                  </button>
                  <button
                    onClick={() => setActiveTab('activities')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'activities'
                        ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <ActivityIcon className="w-4 h-4" />
                    Actividades
                  </button>
                </div>

                {/* Tab Content - Altura fija con scroll interno */}
                <div className="min-h-[400px]">
                  {activeTab === 'schedule' ? (
                    <div className="h-[400px]">
                      <WeeklySchedule 
                        subjects={subjects}
                        onClassClick={handleClassClick}
                      />
                    </div>
                  ) : (
                    <div className="h-[400px]">
                      <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">Mis Actividades</h3>
                        <button 
                          onClick={handleNewActivity}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          Nueva
                        </button>
                      </div>
                      <div className="h-[calc(400px-60px)]">
                        <StudentRecentActivities 
                          activities={studentFormatActivities}
                          onActivityClick={handleActivityClick}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Layout desktop: Original mejorado */}
            <div className="hidden md:block h-full">
              {/* Estadísticas completas para desktop */}
              <div className="mb-6">
                <TeacherStats teacher={teacher} />
              </div>

              {/* Grid principal para desktop */}
              <div className="grid grid-cols-4 gap-6 h-full">
                {/* Horario Semanal - Desktop 3/4 */}
                <div className="col-span-3 min-h-0">
                  <WeeklySchedule 
                    subjects={subjects}
                    onClassClick={handleClassClick}
                  />
                </div>

                {/* Actividades y Tareas - Desktop 1/4 */}
                <div className="col-span-1 min-h-0">
                  <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                      <h3 className="text-sm font-semibold text-gray-900">Mis Actividades</h3>
                      <button 
                        onClick={handleNewActivity}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Nueva
                      </button>
                    </div>
                    <div className="flex-1 min-h-0">
                      <StudentRecentActivities 
                        activities={studentFormatActivities}
                        onActivityClick={handleActivityClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      {selectedClass && (
        <ClassDetailModal
          isOpen={true}
          onClose={() => setSelectedClass(null)}
          classItem={selectedClass.classItem}
          subject={selectedClass.subject}
          onSave={handleSaveClass}
        />
      )}

      <NewActivityModal
        isOpen={showNewActivityModal}
        onClose={() => setShowNewActivityModal(false)}
        courses={getCoursesList()}
        onSave={handleSaveActivity}
      />
    </>
  );
}
