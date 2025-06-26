import type { Activity } from '../types/student';

interface ActivityWithSubject extends Activity {
  subject: string;
}

/**
 * Ordena las actividades priorizando pendientes y atrasadas primero,
 * luego las completadas. Dentro de cada grupo ordena por fecha.
 */
export function sortActivitiesByPriority(activities: ActivityWithSubject[]): ActivityWithSubject[] {
  return activities.sort((a, b) => {
    // Primero separar por estado: pendientes y atrasadas primero
    const aPriority = a.estado === 'pendiente' ? 0 : a.estado === 'atrasada' ? 1 : 2;
    const bPriority = b.estado === 'pendiente' ? 0 : b.estado === 'atrasada' ? 1 : 2;
    
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    
    // Dentro del mismo tipo de estado, ordenar por fecha
    const aDate = new Date(a.fecha).getTime();
    const bDate = new Date(b.fecha).getTime();
    
    // Para pendientes/atrasadas: más próximas primero (ascendente)
    // Para completadas: más recientes primero (descendente)
    if (aPriority < 2) {
      return aDate - bDate; // Más próximas primero
    } else {
      return bDate - aDate; // Más recientes primero
    }
  });
}

/**
 * Obtiene las actividades recientes ordenadas por prioridad
 */
export function getRecentActivities(
  materias: any[],
  limit: number = 6
): ActivityWithSubject[] {
  const allActivities = materias?.flatMap(materia => 
    materia.actividades.map((activity: any) => ({
      ...activity,
      subject: materia.nombre
    }))
  ) || [];

  return sortActivitiesByPriority(allActivities).slice(0, limit);
}
