import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/AppShell';
import { useTeachers } from '../../../hooks/useTeachers';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  Activity, 
  CheckSquare, 
  GraduationCap,
  School,
  Clock,
  Plus,
  Save
} from 'lucide-react';
import { NewActivityModal } from '../../../components/teacher/NewActivityModal';

interface Student {
  id: string;
  nombre: string;
  rut: string;
  email: string;
}

export function CourseDetail() {
  const { schoolId, courseId } = useParams<{ schoolId: string; courseId: string }>();
  const navigate = useNavigate();
  const { loading, getTeacherById } = useTeachers();
  const [selectedTeacher] = useState<string>('1');
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'activities' | 'attendance' | 'grades'>('overview');
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const teacher = getTeacherById(selectedTeacher);

  // Mock data para estudiantes del curso
  const [students] = useState<Student[]>([
    { id: '1', nombre: 'Ana García', rut: '12.345.678-9', email: 'ana.garcia@email.com' },
    { id: '2', nombre: 'Carlos López', rut: '98.765.432-1', email: 'carlos.lopez@email.com' },
    { id: '3', nombre: 'María Rodríguez', rut: '11.111.111-1', email: 'maria.rodriguez@email.com' },
    { id: '4', nombre: 'Diego Fernández', rut: '22.222.222-2', email: 'diego.fernandez@email.com' },
    { id: '5', nombre: 'Sofía González', rut: '33.333.333-3', email: 'sofia.gonzalez@email.com' }
  ]);

  // Estado para asistencia (fecha actual)
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  
  // Estado para calificaciones
  const [grades, setGrades] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    // Inicializar asistencia con false para todos los estudiantes
    const initialAttendance: Record<string, boolean> = {};
    students.forEach(student => {
      initialAttendance[student.id] = false;
    });
    setAttendance(initialAttendance);
  }, [students]);

  if (loading) {
    return (
      <AppShell role='teacher'>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AppShell>
    );
  }

  if (!teacher || !schoolId || !courseId) {
    return (
      <AppShell role='teacher'>
        <div className="text-center py-8">
          <p className="text-gray-600">Curso no encontrado</p>
        </div>
      </AppShell>
    );
  }
  // Encontrar la escuela y curso específicos
  const school = teacher.escuelas.find(e => e.id.toString() === schoolId);
  const courseName = decodeURIComponent(courseId || ''); // Decodificar el nombre del curso
  
  if (!school || !school.cursos.includes(courseName)) {
    return (
      <AppShell role='teacher'>
        <div className="text-center py-8">
          <p className="text-gray-600">Curso no encontrado: {courseName} en {school?.nombre}</p>
          <button 
            onClick={() => navigate('/teacher/classes')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Volver a Mis Clases
          </button>
        </div>
      </AppShell>
    );
  }

  // Obtener clases de este curso específico
  const courseClasses = teacher.horarioSemanal.filter(
    clase => clase.escuela === school.nombre && clase.curso === courseName
  );

  // Obtener actividades de este curso específico
  const courseActivities = teacher.actividades.filter(
    actividad => actividad.escuela === school.nombre && actividad.curso === courseName
  );

  const dayLabels = {
    'lunes': 'Lunes',
    'martes': 'Martes',
    'miercoles': 'Miércoles',
    'jueves': 'Jueves',
    'viernes': 'Viernes'
  };

  const handleSaveActivity = (activityData: any) => {
    console.log('Nueva actividad:', activityData);
    setShowNewActivityModal(false);
  };

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleGradeChange = (studentId: string, activityId: string, grade: number) => {
    setGrades(prev => ({
      ...prev,
      [activityId]: {
        ...prev[activityId],
        [studentId]: grade
      }
    }));
  };

  const saveAttendance = () => {
    console.log('Guardando asistencia:', attendance);
    // Aquí implementarías la lógica para guardar la asistencia
  };

  const saveGrades = () => {
    console.log('Guardando calificaciones:', grades);
    // Aquí implementarías la lógica para guardar las calificaciones
  };

  return (
    <AppShell role='teacher'>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/teacher/classes')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {teacher.materia} - {courseName}
                  </h1>
                  <p className="text-gray-600">{school.nombre}</p>
                </div>
              </div>
              <button
                onClick={() => setShowNewActivityModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nueva Actividad
              </button>
            </div>

            {/* Estadísticas del curso */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Estudiantes</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{students.length}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Clases/Semana</span>
                </div>
                <p className="text-xl font-bold text-green-600">{courseClasses.length}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Actividades</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{courseActivities.length}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <GraduationCap className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Promedio</span>
                </div>
                <p className="text-xl font-bold text-orange-600">6.2</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { key: 'overview', label: 'Resumen', icon: Activity },
                  { key: 'schedule', label: 'Horario', icon: Calendar },
                  { key: 'activities', label: 'Actividades', icon: GraduationCap },
                  { key: 'attendance', label: 'Asistencia', icon: CheckSquare },
                  { key: 'grades', label: 'Evaluaciones', icon: Users }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Contenido de tabs */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6">
          {/* Tab Resumen */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Rendimiento Académico</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Promedio General:</span>
                      <span className="font-semibold text-green-600">6.2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Asistencia Promedio:</span>
                      <span className="font-semibold text-blue-600">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Actividades Pendientes:</span>
                      <span className="font-semibold text-orange-600">3</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Próximas Clases</h3>
                  <div className="space-y-3">
                    {courseClasses.slice(0, 3).map((clase) => (
                      <div key={clase.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-sm">{dayLabels[clase.dia as keyof typeof dayLabels]}</p>
                          <p className="text-xs text-gray-600">{clase.horaInicio} - {clase.horaFin}</p>
                        </div>
                        <div className="ml-auto">
                          <p className="text-sm font-medium">{clase.tema}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Horario */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Horario Semanal</h3>
              {courseClasses.length > 0 ? (
                <div className="grid gap-3">
                  {courseClasses.map((clase) => (
                    <div key={clase.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="font-medium text-gray-900 capitalize">
                              {dayLabels[clase.dia as keyof typeof dayLabels]}
                            </p>
                            <p className="text-sm text-gray-600">{clase.horaInicio} - {clase.horaFin}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{clase.tema}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <School className="w-3 h-3" />
                              <span>{clase.aula}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          clase.estado === 'completada' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {clase.estado === 'completada' ? 'Completada' : 'Programada'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay clases programadas</p>
                </div>
              )}
            </div>
          )}

          {/* Tab Actividades */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Actividades y Evaluaciones</h3>
                <button
                  onClick={() => setShowNewActivityModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Plus className="w-3 h-3" />
                  Nueva Actividad
                </button>
              </div>

              {courseActivities.length > 0 ? (
                <div className="space-y-3">
                  {courseActivities.map((actividad) => (
                    <div key={actividad.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            actividad.tipo === 'evaluacion' ? 'bg-red-100' :
                            actividad.tipo === 'proyecto' ? 'bg-purple-100' : 'bg-blue-100'
                          }`}>
                            <span className="text-lg">
                              {actividad.tipo === 'evaluacion' ? '📝' :
                               actividad.tipo === 'proyecto' ? '🎯' : '📚'}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{actividad.titulo}</p>
                            <p className="text-sm text-gray-600">{actividad.descripcion}</p>
                            <p className="text-xs text-gray-500">Vence: {actividad.fechaVencimiento}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            actividad.estado === 'activa'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {actividad.estado === 'activa' ? 'Activa' : 'Completada'}
                          </span>
                          <button
                            onClick={() => setSelectedActivity(actividad.id)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
                          >
                            Calificar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No hay actividades creadas</p>
                </div>
              )}
            </div>
          )}

          {/* Tab Asistencia */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Asistencia - {new Date().toLocaleDateString()}</h3>
                <button
                  onClick={saveAttendance}
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Save className="w-3 h-3" />
                  Guardar Asistencia
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
                    <span>Estudiante</span>
                    <span>RUT</span>
                    <span>Asistencia</span>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <div key={student.id} className="p-4 grid grid-cols-3 gap-4 items-center">
                      <span className="font-medium text-gray-900">{student.nombre}</span>
                      <span className="text-gray-600">{student.rut}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAttendanceChange(student.id, true)}
                          className={`px-3 py-1 rounded text-sm ${
                            attendance[student.id] === true
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                          }`}
                        >
                          Presente
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.id, false)}
                          className={`px-3 py-1 rounded text-sm ${
                            attendance[student.id] === false
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                          }`}
                        >
                          Ausente
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Evaluaciones */}
          {activeTab === 'grades' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Evaluaciones</h3>
                {selectedActivity && (
                  <button
                    onClick={saveGrades}
                    className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <Save className="w-3 h-3" />
                    Guardar Calificaciones
                  </button>
                )}
              </div>

              {/* Selector de actividad */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Actividad
                </label>
                <select
                  value={selectedActivity || ''}
                  onChange={(e) => setSelectedActivity(e.target.value || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar actividad para calificar</option>
                  {courseActivities.map((actividad) => (
                    <option key={actividad.id} value={actividad.id}>
                      {actividad.titulo} ({actividad.tipo})
                    </option>
                  ))}
                </select>
              </div>

              {/* Tabla de calificaciones */}
              {selectedActivity && (
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-700">
                      <span>Estudiante</span>
                      <span>RUT</span>
                      <span>Calificación (1.0 - 7.0)</span>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {students.map((student) => (
                      <div key={student.id} className="p-4 grid grid-cols-3 gap-4 items-center">
                        <span className="font-medium text-gray-900">{student.nombre}</span>
                        <span className="text-gray-600">{student.rut}</span>
                        <input
                          type="number"
                          min="1.0"
                          max="7.0"
                          step="0.1"
                          value={grades[selectedActivity]?.[student.id] || ''}
                          onChange={(e) => handleGradeChange(student.id, selectedActivity, parseFloat(e.target.value))}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0.0"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal para nueva actividad */}
        <NewActivityModal
          isOpen={showNewActivityModal}
          onClose={() => setShowNewActivityModal(false)}
          courses={[{ escuela: school.nombre, curso: courseName }]}
          onSave={handleSaveActivity}
        />
      </div>
    </AppShell>
  );
}
