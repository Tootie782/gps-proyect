export interface TeacherSchool {
  id: number;
  nombre: string;
  ciudad: string;
  cursos: string[];
}

export interface TeacherClass {
  id: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  escuela: string;
  curso: string;
  tema: string;
  aula: string;
  estado: 'programada' | 'completada' | 'cancelada';
}

export interface StudentGrade {
  estudiante: string;
  nota: number | null;
  entregado: boolean;
}

export interface TeacherActivity {
  id: string;
  titulo: string;
  descripcion: string;
  curso: string;
  escuela: string;
  fechaVencimiento: string;
  estado: 'activa' | 'programada' | 'completada' | 'vencida';
  tipo: 'tarea' | 'evaluacion' | 'proyecto' | 'laboratorio';
  calificaciones: StudentGrade[];
}

export interface TeacherStats {
  totalEstudiantes: number;
  promedioGeneral: number;
  asistenciaPromedio: number;
  actividadesPendientes: number;
  evaluacionesPorCalificar: number;
}

export interface Teacher {
  id: string;
  name: string;
  rut: string;
  email: string;
  telefono: string;
  materia: string;
  experiencia: number;
  especialidad: string;
  titulo: string;
  escuelas: TeacherSchool[];
  horarioSemanal: TeacherClass[];
  actividades: TeacherActivity[];
  estadisticas: TeacherStats;
}
