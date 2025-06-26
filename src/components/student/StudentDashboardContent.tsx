import { useState } from 'react';
import { StudentHeader } from './StudentHeader';
import { StudentAlerts } from './StudentAlerts';
import { StudentStats } from './StudentStats';
import { StudentRecentActivities } from './StudentRecentActivities';
import { SubjectDetailView } from './SubjectDetailView';
import { WeeklySchedule } from './WeeklySchedule';
import { ClassDetailModal } from './ClassDetailModal';
import { ActivityDetailModal } from './ActivityDetailModal';
import { Calendar, Activity as ActivityIcon } from 'lucide-react';
import type { Student, Subject, ClassSchedule, Activity } from '../../types/student';

interface StudentDashboardContentProps {
  student: Student;
  progress: number;
  overallGrade: number;
  completedActivities: number;
  totalActivities: number;
  pendingActivities: number;
  overdueActivities: number;
  recentActivities: any[];
}

export function StudentDashboardContent({
  student,
  progress,
  overallGrade,
  completedActivities,
  totalActivities,
  pendingActivities,
  overdueActivities,
  recentActivities
}: StudentDashboardContentProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showSubjectDetail, setShowSubjectDetail] = useState(false);
  
  // Estado para tabs en mobile
  const [activeTab, setActiveTab] = useState<'schedule' | 'activities'>('schedule');
  
  // Estados para modal de detalle de clase
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [selectedClassSubject, setSelectedClassSubject] = useState<Subject | null>(null);
  const [showClassModal, setShowClassModal] = useState(false);
  
  // Estados para modal de detalle de actividad
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedActivitySubject, setSelectedActivitySubject] = useState<string>('');
  const [showActivityModal, setShowActivityModal] = useState(false);

  const closeSubjectDetail = () => {
    setShowSubjectDetail(false);
    setSelectedSubject(null);
  };

  const handleClassClick = (classItem: ClassSchedule, subject: Subject) => {
    setSelectedClass(classItem);
    setSelectedClassSubject(subject);
    setShowClassModal(true);
  };

  const closeClassModal = () => {
    setShowClassModal(false);
    setSelectedClass(null);
    setSelectedClassSubject(null);
  };

  const handleActivityClick = (activity: Activity, subjectName: string) => {
    setSelectedActivity(activity);
    setSelectedActivitySubject(subjectName);
    setShowActivityModal(true);
  };

  const closeActivityModal = () => {
    setShowActivityModal(false);
    setSelectedActivity(null);
    setSelectedActivitySubject('');
  };  return (
    <div className="h-full flex flex-col">
      {/* Si está viendo detalles de una materia, mostrar vista completa */}
      {showSubjectDetail && selectedSubject ? (
        <SubjectDetailView
          subject={selectedSubject}
          onBack={closeSubjectDetail}
        />
      ) : (
        <>          {/* Header - altura fija y compacta */}
          <div className="flex-shrink-0">
            <div className="p-4 md:p-6 pb-2 md:pb-6">
              {/* Header simplificado */}
              <StudentHeader student={student} />

              {/* Alertas importantes */}
              <StudentAlerts 
                overdueActivities={overdueActivities} 
                pendingActivities={pendingActivities} 
              />
            </div>
          </div>          {/* Contenido principal - Con scroll en mobile */}
          <div className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
            <div className="px-4 md:px-6 pt-4 pb-6 md:pt-0 md:h-full">              {/* Layout mobile: Grid 2x2 + Tabs */}
              <div className="md:hidden space-y-6">                {/* Estadísticas principales - Grid 2x2 con tamaño fijo */}
                <div className="h-48">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-emerald-600">{completedActivities}/{totalActivities}</div>
                        <div className="text-xs text-gray-600">Actividades</div>
                        <div className="text-xs text-gray-500">{progress}% completado</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{overallGrade.toFixed(1)}</div>
                        <div className="text-xs text-gray-600">Promedio</div>
                        <div className="text-xs text-gray-500">General</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{student.asistencia}%</div>
                        <div className="text-xs text-gray-600">Asistencia</div>
                        <div className="text-xs text-gray-500">Este período</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col justify-center shadow-sm">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{student.materias?.length || 0}</div>
                        <div className="text-xs text-gray-600">Materias</div>
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
                          ? 'border-b-2 border-emerald-500 text-emerald-600 bg-emerald-50'
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
                          ? 'border-b-2 border-emerald-500 text-emerald-600 bg-emerald-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <ActivityIcon className="w-4 h-4" />
                      Actividades
                    </button>
                  </div>

                  {/* Tab Content - Hug content con scroll interno */}
                  <div className="min-h-[400px]">
                    {activeTab === 'schedule' ? (
                      <WeeklySchedule
                        subjects={student.materias || []}
                        onClassClick={handleClassClick}
                      />
                    ) : (
                      <StudentRecentActivities
                        activities={recentActivities}
                        onActivityClick={handleActivityClick}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Layout desktop: Original mejorado */}
              <div className="hidden md:block h-full">
                {/* Estadísticas completas para desktop */}
                <div className="mb-6">
                  <StudentStats
                    completedActivities={completedActivities}
                    totalActivities={totalActivities}
                    progress={progress}
                    overallGrade={overallGrade}
                    attendance={student.asistencia}
                    totalSubjects={student.materias?.length || 0}
                  />
                </div>

                {/* Grid principal para desktop */}
                <div className="grid grid-cols-4 gap-6 h-full">
                  {/* Horario Semanal - Desktop 3/4 */}
                  <div className="col-span-3 min-h-0">
                    <WeeklySchedule
                      subjects={student.materias || []}
                      onClassClick={handleClassClick}
                    />
                  </div>

                  {/* Actividades Recientes - Desktop 1/4 */}
                  <div className="col-span-1 min-h-0">
                    <StudentRecentActivities
                      activities={recentActivities}
                      onActivityClick={handleActivityClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de detalle de clase */}
      <ClassDetailModal
        isOpen={showClassModal}
        classItem={selectedClass}
        subject={selectedClassSubject}
        onClose={closeClassModal}
        onViewMore={() => {
          if (selectedClassSubject) {
            setSelectedSubject(selectedClassSubject);
            setShowSubjectDetail(true);
            setShowClassModal(false);
          }
        }}
      />

      {/* Modal de detalle de actividad */}
      <ActivityDetailModal
        isOpen={showActivityModal}
        activity={selectedActivity}
        subjectName={selectedActivitySubject}
        onClose={closeActivityModal}
      />
    </div>
  );
}
