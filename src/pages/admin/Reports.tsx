import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../components/AppShell';
import { User, BookCopy, ChevronRight, TrendingUp, TrendingDown, CheckCircle, XCircle } from 'lucide-react';

// Mock Data actualizado para estudiantes
const allStudents = [
  { id: 1, name: 'Javiera Carrera', schoolId: 1, courseIds: [1, 2], averageGrade: 6.5, attendancePercentage: 95 },
  { id: 2, name: 'Pedro de Valdivia', schoolId: 1, courseIds: [1], averageGrade: 4.8, attendancePercentage: 80 },
];
const allTeachers = [
  { id: 1, name: 'Carlos Fuentes', schoolId: 1, courseIds: [1] },
  { id: 2, name: 'Gabriela Mistral', schoolId: 1, courseIds: [2] },
];
const mockCourses = [
  { id: 1, name: 'Matemáticas 1°A', schoolId: 1 },
  { id: 2, name: 'Lenguaje 1°A', schoolId: 1 },
];

export function Reports() {
  const { schoolId } = useParams();
  const adminSchoolId = schoolId ? parseInt(schoolId, 10) : 0;

  const students = allStudents.filter(s => s.schoolId === adminSchoolId);
  const teachers = allTeachers.filter(t => t.schoolId === adminSchoolId);
  const courses = mockCourses.filter(c => c.schoolId === adminSchoolId);

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [personType, setPersonType] = useState(''); // 'student' or 'teacher'

  const handleSelectPerson = (person, type) => {
    setSelectedPerson(person);
    setPersonType(type);
  };

  const SummaryCard = ({ person, type }) => {
    if (!person) {
      return (
        <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Selecciona una persona para ver su resumen</p>
        </div>
      );
    }

    const assignedCourses = person.courseIds
      .map(id => courses.find(c => c.id === id)?.name)
      .filter(Boolean);

    return (
      <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <User className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{person.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{type === 'student' ? 'Estudiante' : 'Docente'}</p>
          </div>
        </div>
        
        {/* Resumen de Estudiante */}
        {type === 'student' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Promedio General</h4>
              <p className={`text-2xl font-bold ${person.averageGrade >= 5.0 ? 'text-green-600' : 'text-red-600'}`}>
                {person.averageGrade.toFixed(1)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500">Asistencia</h4>
              <p className={`text-2xl font-bold ${person.attendancePercentage >= 85 ? 'text-green-600' : 'text-yellow-600'}`}>
                {person.attendancePercentage}%
              </p>
            </div>
          </div>
        )}

        {/* Cursos Asignados (común para ambos) */}
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 flex items-center"><BookCopy size={16} className="mr-2"/> Cursos Asignados</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {assignedCourses.length > 0 ? assignedCourses.map(courseName => (
              <li key={courseName}>{courseName}</li>
            )) : <li>No tiene cursos asignados.</li>}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <AppShell role="admin-local">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Centro de Reportes</h1>
          <p className="text-gray-600 mt-1">Consulta los resúmenes de actividad por estudiante y docente.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Listas de personas */}
          <div className="md:col-span-1 space-y-6">
            {/* Lista de Estudiantes */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Estudiantes</h2>
              <ul className="space-y-2">
                {students.map(student => (
                  <li key={student.id} onClick={() => handleSelectPerson(student, 'student')} className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition-colors ${selectedPerson?.id === student.id && personType === 'student' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}>
                    <span>{student.name}</span>
                    <ChevronRight size={16} />
                  </li>
                ))}
              </ul>
            </div>
            {/* Lista de Docentes */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Docentes</h2>
              <ul className="space-y-2">
                {teachers.map(teacher => (
                  <li key={teacher.id} onClick={() => handleSelectPerson(teacher, 'teacher')} className={`flex justify-between items-center p-2 rounded-md cursor-pointer transition-colors ${selectedPerson?.id === teacher.id && personType === 'teacher' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}>
                    <span>{teacher.name}</span>
                    <ChevronRight size={16} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tarjeta de Resumen */}
          <div className="md:col-span-2">
            <SummaryCard person={selectedPerson} type={personType} />
          </div>
        </div>
      </div>
    </AppShell>
  );
} 