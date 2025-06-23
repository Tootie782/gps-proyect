import { useState, useEffect } from 'react';
import type { Student } from '../types/student';
import studentsData from '../mocks/students.json';

// Hook para manejar datos de estudiantes siguiendo las guías del context.md
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simula latencia como indica el context.md
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simula latencia de 300ms como en el ejemplo
      await new Promise(resolve => setTimeout(resolve, 300));
      setStudents(studentsData as Student[]);
    } catch (err) {
      setError('Error al cargar estudiantes');
    } finally {
      setLoading(false);
    }
  };

  const getStudentById = (id: string): Student | undefined => {
    return students.find(student => student.id === id);
  };

  const getStudentProgress = (student: Student): number => {
    if (!student.materias || student.materias.length === 0) return 0;
    
    const totalActivities = student.materias.reduce((total, materia) => 
      total + materia.actividades.length, 0
    );
    
    const completedActivities = student.materias.reduce((total, materia) => 
      total + materia.actividades.filter(act => act.estado === 'completada').length, 0
    );
    
    return totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
  };

  const getOverallGrade = (student: Student): number => {
    if (!student.materias || student.materias.length === 0) return 0;
    
    const grades = student.materias.map(materia => materia.promedio);
    const validGrades = grades.filter(grade => grade > 0);
    
    return validGrades.length > 0 
      ? Math.round((validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length) * 10) / 10
      : 0;
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    fetchStudents,
    getStudentById,
    getStudentProgress,
    getOverallGrade
  };
}
