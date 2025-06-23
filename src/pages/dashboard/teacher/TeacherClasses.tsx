import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/AppShell';
import { useTeachers } from '../../../hooks/useTeachers';
import { School, Clock, Users, Calendar, Plus } from 'lucide-react';
import { WeeklySchedule } from '../../../components/student/WeeklySchedule';
import { ClassDetailModal } from '../../../components/teacher/ClassDetailModal';
import { SubjectDetailModal } from '../../../components/teacher/SubjectDetailModal';
import { NewActivityModal } from '../../../components/teacher/NewActivityModal';
import type { Subject, ClassSchedule } from '../../../types/student';

export function TeacherClasses() {
  const navigate = useNavigate();
  const { loading, getTeacherById } = useTeachers();
  const [selectedTeacher] = useState<string>('1');
  const [selectedSchool, setSelectedSchool] = useState<number | 'all'>('all');
  
  // Estado para modales
  const [selectedClass, setSelectedClass] = useState<{
    classItem: ClassSchedule;
    subject: Subject;
  } | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  
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

  // Convertir el horario del profesor al formato que espera WeeklySchedule
  const convertToSubjectFormat = (): Subject[] => {
    const schoolsMap = new Map<string, Subject>();

    teacher.horarioSemanal.forEach(clase => {
      const schoolData = teacher.escuelas.find(esc => esc.nombre === clase.escuela);
      const schoolId = schoolData?.id || 0;

      if (selectedSchool !== 'all' && schoolId !== selectedSchool) {
        return;
      }

      const key = `${clase.escuela}-${clase.curso}`;

      if (!schoolsMap.has(key)) {
        schoolsMap.set(key, {
          nombre: `${teacher.materia}`,
          promedio: 6.0,
          asistencia: 88,
          profesor: teacher.name,
          aula: clase.aula,
          descripcion: `${clase.curso} • ${clase.escuela}`,
          horario: [],
          actividades: []
        });
      }

      const subject = schoolsMap.get(key)!;
      
      // Mapear el día correctamente
      const dayMap: { [key: string]: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' } = {
        'lunes': 'lunes',
        'martes': 'martes',
        'miércoles': 'miercoles',
        'miercoles': 'miercoles',
        'jueves': 'jueves',
        'viernes': 'viernes'
      };
      
      subject.horario.push({
        id: clase.id,
        dia: dayMap[clase.dia.toLowerCase()] || 'lunes',
        horaInicio: clase.horaInicio,
        horaFin: clase.horaFin,
        tema: clase.tema,
        descripcion: `${clase.curso} • ${clase.escuela}`,
        tipo: 'clase',
        estado: clase.estado === 'programada' ? 'programada' : 'completada'
      });

      // Actualizar el aula si es diferente
      if (clase.aula && clase.aula !== subject.aula) {
        subject.aula = clase.aula;
      }
    });

    return Array.from(schoolsMap.values());
  };

  const subjects = convertToSubjectFormat();
  // Handler para cuando se hace click en una clase del horario
  const handleClassClick = (classItem: ClassSchedule, subject: Subject) => {
    setSelectedClass({ classItem, subject });
  };

  // Handler para crear nueva actividad
  const handleNewActivity = () => {
    setShowNewActivityModal(true);
  };
  // Handler para ver detalles de materia/curso
  const handleSubjectClick = (subject: Subject) => {
    // Extraer datos del curso y escuela desde la descripción del subject
    const [curso, escuela] = subject.descripcion.split(' • ');
    
    // Encontrar la escuela por nombre
    const schoolData = teacher?.escuelas.find(esc => esc.nombre === escuela);
    
    if (schoolData && curso) {
      // Navegar al detalle del curso
      navigate(`/teacher/classes/${schoolData.id}/${encodeURIComponent(curso)}`);
    } else {
      // Fallback: abrir modal si no se puede navegar
      setSelectedSubject(subject);
    }
  };

  // Handler para guardar actividad
  const handleSaveActivity = (activityData: any) => {
    console.log('Nueva actividad:', activityData);
    setShowNewActivityModal(false);
  };

  // Handler para guardar cambios en clase
  const handleSaveClass = (updatedClass: any) => {
    console.log('Clase actualizada:', updatedClass);
    setSelectedClass(null);
  };

  // Obtener lista de cursos para el modal de nueva actividad
  const getCoursesList = () => {
    const courses: Array<{ escuela: string; curso: string }> = [];
    teacher.escuelas.forEach(escuela => {
      escuela.cursos.forEach(curso => {
        courses.push({ escuela: escuela.nombre, curso });
      });
    });
    return courses;
  };

  return (
    <AppShell role='teacher'>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mis Clases</h1>
                <p className="text-gray-600">Gestión de clases por escuela - {teacher.materia}</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                >
                  <option value="all">Todas las escuelas</option>
                  {teacher.escuelas.map((escuela) => (
                    <option key={escuela.id} value={escuela.id}>
                      {escuela.nombre}
                    </option>
                  ))}
                </select>
                <button 
                  onClick={handleNewActivity}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Clase
                </button>
              </div>
            </div>

            {/* Estadísticas por escuela */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {teacher.escuelas.map((escuela) => {
                if (selectedSchool !== 'all' && escuela.id !== selectedSchool) return null;
                
                const escuelaClasses = teacher.horarioSemanal.filter(clase => clase.escuela === escuela.nombre);
                const cursosSet = new Set(escuelaClasses.map(clase => clase.curso));
                
                return (
                  <div key={escuela.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <School className="w-4 h-4 text-blue-600" />
                      <h3 className="font-medium text-gray-900">{escuela.nombre}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-purple-600" />
                          <span className="text-gray-600">{cursosSet.size} cursos</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-green-600" />
                          <span className="text-gray-600">{escuelaClasses.length} clases/sem</span>
                        </div>
                      </div>
                    </div>                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Cursos (click para ver detalle):</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.from(cursosSet).map((curso) => {
                          // Encontrar la materia correspondiente para este curso
                          const courseSubject = subjects.find(s => s.descripcion.includes(curso) && s.descripcion.includes(escuela.nombre));
                          
                          return (
                            <button
                              key={curso}
                              onClick={() => courseSubject && handleSubjectClick(courseSubject)}
                              className="text-xs bg-blue-100 text-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-200 hover:text-blue-900 transition-all duration-200 cursor-pointer border border-blue-200 hover:border-blue-300 font-medium"
                              title={`Ver detalle del curso ${curso}`}
                            >
                              {curso} →
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contenido principal - Horario semanal */}
        <div className="flex-1 min-h-0 p-4 md:p-6">
          {subjects.length > 0 ? (
            <WeeklySchedule 
              subjects={subjects}
              onClassClick={handleClassClick}
            />          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center h-full flex items-center justify-center">
              <div>
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay clases programadas</h3>
                <p className="text-gray-500 mb-4">
                  {selectedSchool === 'all' 
                    ? 'No tienes clases programadas esta semana'
                    : 'No tienes clases programadas en esta escuela'
                  }
                </p>
                <button 
                  onClick={handleNewActivity}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Programar Clase
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modales */}
        {selectedClass && (
          <ClassDetailModal
            isOpen={true}
            onClose={() => setSelectedClass(null)}
            classItem={selectedClass.classItem}
            subject={selectedClass.subject}
            onSave={handleSaveClass}
          />
        )}

        {selectedSubject && teacher && (
          <SubjectDetailModal
            isOpen={true}
            onClose={() => setSelectedSubject(null)}
            subject={selectedSubject}
            teacher={teacher}
            onAddActivity={() => {
              setSelectedSubject(null);
              setShowNewActivityModal(true);
            }}
            onEditClass={(classId) => {
              console.log('Editar clase:', classId);
            }}
          />
        )}

        <NewActivityModal
          isOpen={showNewActivityModal}
          onClose={() => setShowNewActivityModal(false)}
          courses={getCoursesList()}
          onSave={handleSaveActivity}
        />
      </div>
    </AppShell>
  );
}
