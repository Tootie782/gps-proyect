import { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { SchedulePicker } from './SchedulePicker';
import { BookCopy, User, Clock, GraduationCap, Calendar } from 'lucide-react';

interface Teacher {
  id: number;
  name: string;
  schoolId: number;
}

interface Course {
  id: number;
  name: string;
  schoolId: number;
}

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
}

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subjectData: {
    name: string;
    courseId: number;
    teacherId: number | null;
    hoursPerWeek: number;
    schedule: TimeSlot[];
  }) => void;
  teachers: Teacher[];
  courses: Course[];
}

export function AddSubjectModal({ isOpen, onClose, onAdd, teachers, courses }: AddSubjectModalProps) {
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState<number | ''>('');
  const [teacherId, setTeacherId] = useState<number | ''>('');
  const [hoursPerWeek, setHoursPerWeek] = useState<number | ''>(1);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);
  const [step, setStep] = useState<'basic' | 'schedule'>('basic');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || courseId === '' || hoursPerWeek === '') {
      return;
    }

    if (step === 'basic') {
      // Ir al paso de selección de horarios
      setStep('schedule');
      return;
    }

    // Validar que se hayan seleccionado suficientes horas
    if (selectedTimeSlots.length !== hoursPerWeek) {
      alert(`Debes seleccionar exactamente ${hoursPerWeek} horas de clase`);
      return;
    }

    onAdd({
      name: name.trim(),
      courseId: courseId as number,
      teacherId: teacherId === '' ? null : (teacherId as number),
      hoursPerWeek: hoursPerWeek as number,
      schedule: selectedTimeSlots,
    });

    // Reset form
    setName('');
    setCourseId('');
    setTeacherId('');
    setHoursPerWeek(1);
    setSelectedTimeSlots([]);
    setStep('basic');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setCourseId('');
    setTeacherId('');
    setHoursPerWeek(1);
    setSelectedTimeSlots([]);
    setStep('basic');
    onClose();
  };

  const handleBackToBasic = () => {
    setStep('basic');
  };  return (
    <BaseModal 
      open={isOpen} 
      onClose={handleClose} 
      title={step === 'basic' ? "Agregar Nueva Materia" : "Seleccionar Horarios"}
      size={step === 'basic' ? 'lg' : '4xl'}
    >
      {step === 'basic' ? (        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre de la materia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <BookCopy className="inline w-4 h-4 mr-2" />
              Nombre de la Materia *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Matemáticas, Historia, Ciencias..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              required
            />
          </div>          {/* Curso */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <GraduationCap className="inline w-4 h-4 mr-2" />
              Curso *
            </label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value === '' ? '' : parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              required
            >
              <option value="">Seleccionar curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Grid layout para profesor y horas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profesor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline w-4 h-4 mr-2" />
                Profesor Asignado
              </label>
              <select
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              >
                <option value="">Sin asignar</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Horas por semana */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline w-4 h-4 mr-2" />
                Horas por Semana *
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                required
              />
            </div>
          </div>          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Calendar className="inline w-4 h-4 mr-2" />
              Siguiente: Horarios
            </button>
          </div>
        </form>      ) : (
        <div className="space-y-6">
          {/* Información del curso seleccionado */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Información de la Materia</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Materia:</span>
                <p className="text-blue-800">{name}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Curso:</span>
                <p className="text-blue-800">{courses.find(c => c.id === courseId)?.name}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Horas requeridas:</span>
                <p className="text-blue-800">{hoursPerWeek} horas por semana</p>
              </div>
            </div>
          </div>

          {/* Selector de horarios */}
          <SchedulePicker
            teacherId={teacherId === '' ? null : (teacherId as number)}
            courseId={courseId as number}
            selectedSlots={selectedTimeSlots}
            onSlotsChange={setSelectedTimeSlots}
            hoursPerWeek={hoursPerWeek as number}
          />

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBackToBasic}
              className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              ← Volver a Información Básica
            </button>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                disabled={selectedTimeSlots.length !== hoursPerWeek}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Crear Materia ({selectedTimeSlots.length}/{hoursPerWeek} horas seleccionadas)
              </button>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
