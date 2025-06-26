import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { StudentDashboardContent } from '../../../components/student/StudentDashboardContent';
import { useStudents } from '../../../hooks/useStudents';
import { getRecentActivities } from '../../../utils/activityUtils';

export function StudentDashboard() {
  const { loading, getStudentById, getStudentProgress, getOverallGrade } = useStudents();
  const [selectedStudent] = useState<string>('1'); // Simula estudiante actual logueado
  
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

  const progress = getStudentProgress(student);
  const overallGrade = getOverallGrade(student);
  const totalActivities = student.materias?.reduce((total, materia) => 
    total + materia.actividades.length, 0) || 0;
  const completedActivities = student.materias?.reduce((total, materia) => 
    total + materia.actividades.filter((act: any) => act.estado === 'completada').length, 0) || 0;
  const pendingActivities = student.materias?.reduce((total, materia) => 
    total + materia.actividades.filter((act: any) => act.estado === 'pendiente').length, 0) || 0;
  const overdueActivities = student.materias?.reduce((total, materia) => 
    total + materia.actividades.filter((act: any) => act.estado === 'atrasada').length, 0) || 0;  // Obtener actividades recientes ordenadas por prioridad
  const recentActivities = getRecentActivities(student.materias || [], 6);

  return (
    <AppShell role='student'>
      <StudentDashboardContent
        student={student}
        progress={progress}
        overallGrade={overallGrade}
        completedActivities={completedActivities}
        totalActivities={totalActivities}
        pendingActivities={pendingActivities}
        overdueActivities={overdueActivities}
        recentActivities={recentActivities}
      />
    </AppShell>
  );
}
