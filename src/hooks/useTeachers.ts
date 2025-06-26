import { useState, useEffect } from 'react';
import type { Teacher, TeacherClass, TeacherActivity } from '../types/teacher';
import teachersData from '../mocks/teachers.json';

export function useTeachers() {
  const [loading, setLoading] = useState(true);
  const [teachers] = useState<Teacher[]>(teachersData as Teacher[]);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getTeacherById = (id: string): Teacher | undefined => {
    return teachers.find(teacher => teacher.id === id);
  };

  const getTeacherScheduleForDay = (teacher: Teacher, day: string) => {
    return teacher.horarioSemanal.filter(clase => clase.dia.toLowerCase() === day.toLowerCase());
  };

  const getTeacherActivitiesByStatus = (teacher: Teacher, status: string) => {
    return teacher.actividades.filter(activity => activity.estado === status);
  };

  const getTeacherActivitiesByCourse = (teacher: Teacher, course: string) => {
    return teacher.actividades.filter(activity => activity.curso === course);
  };

  const getTeacherActivitiesBySchool = (teacher: Teacher, schoolName: string) => {
    return teacher.actividades.filter(activity => activity.escuela === schoolName);
  };
  const getUpcomingClasses = (teacher: Teacher, limit: number = 5) => {
    const today = new Date();
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const todayIndex = today.getDay();
    
    // Obtener clases de hoy y próximos días
    const upcomingClasses: Array<TeacherClass & { dayName: string; isToday: boolean }> = [];
    
    for (let i = 0; i < 7; i++) {
      const dayIndex = (todayIndex + i) % 7;
      const day = daysOfWeek[dayIndex];
      const dayClasses = getTeacherScheduleForDay(teacher, day);
      
      dayClasses.forEach(clase => {
        upcomingClasses.push({
          ...clase,
          dayName: day,
          isToday: i === 0
        });
      });
      
      if (upcomingClasses.length >= limit) break;
    }
    
    return upcomingClasses.slice(0, limit);
  };

  const getPendingGrades = (teacher: Teacher) => {
    const pendingGrades: Array<{ activity: TeacherActivity; pendingCount: number }> = [];
    
    teacher.actividades.forEach(activity => {
      const pendingStudents = activity.calificaciones.filter(grade => 
        grade.entregado && grade.nota === null
      );
      
      if (pendingStudents.length > 0) {
        pendingGrades.push({
          activity,
          pendingCount: pendingStudents.length
        });
      }
    });
    
    return pendingGrades;
  };

  const getRecentActivities = (teacher: Teacher, limit: number = 6) => {
    return teacher.actividades
      .sort((a, b) => new Date(b.fechaVencimiento).getTime() - new Date(a.fechaVencimiento).getTime())
      .slice(0, limit);
  };

  return {
    loading,
    teachers,
    getTeacherById,
    getTeacherScheduleForDay,
    getTeacherActivitiesByStatus,
    getTeacherActivitiesByCourse,
    getTeacherActivitiesBySchool,
    getUpcomingClasses,
    getPendingGrades,
    getRecentActivities
  };
}
