// Tipos para el dashboard de estudiantes según EduConecta Rural
export interface Student {
  id: string;
  name: string;
  rut: string;
  curso: string;
  escuela: string;
  docente: string;
  asistencia: number;
  progreso: number;
  materias: Subject[];
  ultimaConexion: string;
  estadoSincronizacion: 'sincronizado' | 'pendiente' | 'error';
}

export interface Subject {
  nombre: string;
  promedio: number;
  asistencia: number;
  actividades: Activity[];
  horario: ClassSchedule[];
  profesor: string;
  aula: string;
  descripcion: string;
}

export interface Activity {
  id: string;
  nombre: string;
  fecha: string;
  nota: number | null;
  estado: 'completada' | 'pendiente' | 'atrasada';
  tipo: 'tarea' | 'prueba' | 'proyecto' | 'exposicion';
  descripcion: string;
  contenidos?: string[];
  instrucciones?: string;
  fechaEntrega?: string;
  peso: number; // Porcentaje de la nota final
}

export interface ClassSchedule {
  id: string;
  dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes';
  horaInicio: string;
  horaFin: string;
  tema: string;
  descripcion: string;
  tipo: 'clase' | 'laboratorio' | 'evaluacion' | 'reforzamiento';
  estado: 'programada' | 'en_curso' | 'completada' | 'cancelada';
}
