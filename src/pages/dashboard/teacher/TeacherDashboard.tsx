import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { TeacherDashboardContent } from '../../../components/teacher/TeacherDashboardContent';
import { useTeachers } from '../../../hooks/useTeachers';

export function TeacherDashboard() {
  const { loading, getTeacherById, getUpcomingClasses, getPendingGrades, getRecentActivities } = useTeachers();
  const [selectedTeacher] = useState<string>('1'); // Simula profesor actual logueado
  
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

  const upcomingClasses = getUpcomingClasses(teacher, 5);
  const pendingGrades = getPendingGrades(teacher);
  const recentActivities = getRecentActivities(teacher, 6);

  return (
    <AppShell role='teacher'>
      <TeacherDashboardContent
        teacher={teacher}
        upcomingClasses={upcomingClasses}
        pendingGrades={pendingGrades}
        recentActivities={recentActivities}
      />
    </AppShell>
  );
}
