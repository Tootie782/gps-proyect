import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { SubjectDetailView } from '../../../components/student/SubjectDetailView';
import { SubjectCard } from '../../../components/student/SubjectCard';
import { useStudents } from '../../../hooks/useStudents';
import { BookOpen, Target, Award, TrendingUp } from 'lucide-react';
import type { Subject } from '../../../types/student';

export function StudentSubjectsPage() {
  const { loading, getStudentById } = useStudents();
  const [selectedStudent] = useState<string>('1'); // Simula estudiante actual logueado
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showSubjectDetail, setShowSubjectDetail] = useState(false);
  
  const student = getStudentById(selectedStudent);

  if (loading) {
    return (
      <AppShell role='student'>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </AppShell>
    );
  }

  if (!student) {
    return (
      <AppShell role='student'>
        <div className="text-center py-8">
          <p className="text-gray-600">No se encontraron datos del estudiante</p>
        </div>
      </AppShell>
    );
  }

  const openSubjectDetail = (subject: Subject) => {
    setSelectedSubject(subject);
    setShowSubjectDetail(true);
  };

  const closeSubjectDetail = () => {
    setShowSubjectDetail(false);
    setSelectedSubject(null);
  };

  const totalActivities = student.materias?.reduce((total, materia) => 
    total + materia.actividades.length, 0) || 0;
  const completedActivities = student.materias?.reduce((total, materia) => 
    total + materia.actividades.filter((act: any) => act.estado === 'completada').length, 0) || 0;
  const overallGrade = student.materias?.reduce((sum, materia) => sum + materia.promedio, 0) / (student.materias?.length || 1) || 0;
  const progressPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
  return (
    <AppShell role='student'>
      <div className="h-full flex flex-col">
        {showSubjectDetail && selectedSubject ? (
          <SubjectDetailView
            subject={selectedSubject}
            onBack={closeSubjectDetail}
          />
        ) : (
          <>
            {/* Header compacto */}
            <div className="flex-shrink-0">
              <div className="p-4 md:p-6 pb-2 md:pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h1 className="text-lg md:text-xl font-bold text-gray-900">Mis Materias</h1>
                    <p className="text-sm text-gray-600">Gestiona el progreso de tus materias</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido principal con scroll */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="px-4 md:px-6 pt-2 pb-6">
                
                {/* Estadísticas compactas - Grid 2x2 en mobile, 4 columnas en desktop */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <div className="text-base md:text-lg font-bold text-emerald-600">
                          {student.materias?.length || 0}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Materias</div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Award className="w-4 h-4 text-blue-600" />
                        <div className="text-base md:text-lg font-bold text-blue-600">
                          {overallGrade.toFixed(1)}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Promedio</div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <div className="text-base md:text-lg font-bold text-green-600">
                          {completedActivities}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Completadas</div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <div className="w-4 h-4 rounded-full bg-purple-600 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">%</span>
                        </div>
                        <div className="text-base md:text-lg font-bold text-purple-600">
                          {progressPercentage}%
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">Progreso</div>
                    </div>
                  </div>
                </div>

                {/* Lista de materias */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-sm md:text-base font-semibold text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Lista de Materias
                      <span className="ml-auto text-xs text-gray-500">
                        {completedActivities}/{totalActivities} actividades
                      </span>
                    </h2>
                  </div>
                  
                  <div className="p-4">
                    {student.materias && student.materias.length > 0 ? (
                      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        {student.materias.map((subject, index) => (
                          <SubjectCard
                            key={index}
                            subject={subject}
                            onClick={() => openSubjectDetail(subject)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-500">No hay materias disponibles</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
