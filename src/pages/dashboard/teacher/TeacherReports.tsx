import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { Reports } from '../../../components/admin/Reports';
import { useTeachers } from '../../../hooks/useTeachers';
import { School, GraduationCap, BarChart3 } from 'lucide-react';

export function TeacherReports() {
  const { loading, getTeacherById } = useTeachers();
  const [selectedTeacher] = useState<string>('1');
  const [selectedSchool, setSelectedSchool] = useState<number | 'all'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string | 'all'>('all');
  
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

  // Obtener cursos únicos
  const allCourses = [...new Set(teacher.horarioSemanal.map(clase => clase.curso))];
  const filteredCourses = selectedSchool === 'all' 
    ? allCourses 
    : [...new Set(teacher.horarioSemanal
        .filter(clase => {
          const schoolData = teacher.escuelas.find(esc => esc.nombre === clase.escuela);
          return schoolData?.id === selectedSchool;
        })
        .map(clase => clase.curso))];

  // Si se selecciona un curso específico, usar el componente Reports existente
  if (selectedCourse !== 'all') {
    // Simular que el curso seleccionado es schoolId "1" para reutilizar el componente Reports
    return <Reports />;
  }

  return (
    <AppShell role='teacher'>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Reportes</h1>
                <p className="text-gray-600">Análisis de rendimiento de mis cursos - {teacher.materia}</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={selectedSchool}
                  onChange={(e) => {
                    setSelectedSchool(e.target.value === 'all' ? 'all' : parseInt(e.target.value));
                    setSelectedCourse('all');
                  }}
                >
                  <option value="all">Todas las escuelas</option>
                  {teacher.escuelas.map((escuela) => (
                    <option key={escuela.id} value={escuela.id}>
                      {escuela.nombre}
                    </option>
                  ))}
                </select>
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="all">Todos los cursos</option>
                  {filteredCourses.map((curso) => (
                    <option key={curso} value={curso}>
                      {curso}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto bg-gray-50">
          <div className="p-4 md:p-6">
            
            {/* Resumen general por escuela */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {teacher.escuelas.map((escuela) => {
                if (selectedSchool !== 'all' && escuela.id !== selectedSchool) return null;
                
                const escuelaCourses = teacher.horarioSemanal
                  .filter(clase => clase.escuela === escuela.nombre)
                  .map(clase => clase.curso);
                const uniqueCourses = [...new Set(escuelaCourses)];
                
                const escuelaActivities = teacher.actividades.filter(act => act.escuela === escuela.nombre);
                
                return (
                  <div key={escuela.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <School className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{escuela.nombre}</h3>
                        <p className="text-sm text-gray-600">{escuela.ciudad}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <GraduationCap className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="text-lg font-bold text-purple-600">{uniqueCourses.length}</div>
                          <div className="text-xs text-gray-600">Cursos</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <BarChart3 className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-lg font-bold text-green-600">{escuelaActivities.length}</div>
                          <div className="text-xs text-gray-600">Actividades</div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Cursos:</p>
                        <div className="flex flex-wrap gap-1">
                          {uniqueCourses.map((curso) => (
                            <button
                              key={curso}
                              onClick={() => setSelectedCourse(curso)}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors cursor-pointer"
                            >
                              {curso}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lista de actividades recientes */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Actividades Recientes</h3>
                <p className="text-sm text-gray-600 mt-1">Últimas actividades programadas por curso</p>
              </div>
              
              <div className="p-6">
                {teacher.actividades.length > 0 ? (
                  <div className="space-y-4">
                    {teacher.actividades
                      .filter(activity => {
                        if (selectedSchool === 'all') return true;
                        const schoolData = teacher.escuelas.find(esc => esc.id === selectedSchool);
                        return activity.escuela === schoolData?.nombre;
                      })
                      .map((activity) => {
                        const pendingGrades = activity.calificaciones.filter(grade => 
                          grade.entregado && grade.nota === null
                        ).length;
                        const totalStudents = activity.calificaciones.length;
                        
                        return (
                          <div key={activity.id} className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-medium text-gray-900">{activity.titulo}</h4>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {activity.curso}
                                  </span>
                                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                    {activity.escuela}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{activity.descripcion}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>Vence: {new Date(activity.fechaVencimiento).toLocaleDateString('es-CL')}</span>
                                  <span>Tipo: {activity.tipo}</span>
                                  <span>Estado: {activity.estado}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                {pendingGrades > 0 && (
                                  <div className="text-xs text-orange-600 font-medium">
                                    {pendingGrades} por calificar
                                  </div>
                                )}
                                <div className="text-xs text-gray-500">
                                  {totalStudents} estudiante{totalStudents !== 1 ? 's' : ''}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay actividades</h3>
                    <p className="text-gray-500">Aún no has creado actividades para tus cursos</p>
                  </div>
                )}
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-blue-600">{teacher.estadisticas.totalEstudiantes}</div>
                <div className="text-sm text-gray-600">Total Estudiantes</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-green-600">{teacher.estadisticas.promedioGeneral.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Promedio General</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-purple-600">{teacher.estadisticas.asistenciaPromedio}%</div>
                <div className="text-sm text-gray-600">Asistencia</div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm text-center">
                <div className="text-2xl font-bold text-orange-600">{teacher.estadisticas.actividadesPendientes}</div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
