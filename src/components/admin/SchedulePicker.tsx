import { useState } from "react";
import {
  MapPin,
  User,
  Users,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
  room?: string;
}

interface ScheduleConflict {
  type: 'teacher' | 'student';
  subject: string;
  room?: string;
  teacher?: string;
}

interface ScheduleSlotData {
  isAvailable: boolean;
  conflicts: ScheduleConflict[];
  isSelected: boolean;
}

interface SchedulePickerProps {
  teacherId: number | null;
  courseId: number;
  selectedSlots: TimeSlot[];
  onSlotsChange: (slots: TimeSlot[]) => void;
  hoursPerWeek: number;
}

const DAYS = ["lunes", "martes", "miercoles", "jueves", "viernes"] as const;
const DAY_LABELS = {
  lunes: "Lunes",
  martes: "Martes", 
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
};

// Horarios estándar en bloques de 45 minutos
const TIME_BLOCKS = [
  { start: "08:30", end: "09:15", label: "1° Hora" },
  { start: "09:15", end: "10:00", label: "2° Hora" },
  { start: "10:00", end: "10:30", label: "Recreo", isBreak: true },
  { start: "10:30", end: "11:15", label: "3° Hora" },
  { start: "11:15", end: "12:00", label: "4° Hora" },
  { start: "12:00", end: "13:00", label: "Almuerzo", isBreak: true },
  { start: "13:00", end: "13:45", label: "5° Hora" },
  { start: "13:45", end: "14:30", label: "6° Hora" },
  { start: "14:30", end: "15:15", label: "7° Hora" },
  { start: "15:15", end: "16:00", label: "8° Hora" },
];

interface TeacherScheduleSlot {
  start: string;
  end: string;
  subject: string;
  room: string;
}

interface CourseScheduleSlot {
  start: string;
  end: string;
  subject: string;
  teacher: string;
  room: string;
}

type DaySchedule = {
  [key in typeof DAYS[number]]?: TeacherScheduleSlot[] | CourseScheduleSlot[];
};

// Mock data - en producción vendría de la API
const mockTeacherSchedule: Record<number, DaySchedule> = {
  1: { // teacherId
    lunes: [
      { start: "08:30", end: "09:15", subject: "Matemáticas 2°A", room: "Aula 201" },
      { start: "10:30", end: "11:15", subject: "Matemáticas 1°B", room: "Aula 101" },
    ],
    martes: [
      { start: "09:15", end: "10:00", subject: "Matemáticas 3°A", room: "Aula 301" },
      { start: "13:00", end: "13:45", subject: "Matemáticas 2°A", room: "Aula 201" },
    ],
    miercoles: [
      { start: "08:30", end: "09:15", subject: "Matemáticas 1°B", room: "Aula 101" },
      { start: "14:30", end: "15:15", subject: "Matemáticas 3°A", room: "Aula 301" },
    ],
  }
};

const mockCourseSchedule: Record<number, DaySchedule> = {
  1: { // courseId 
    lunes: [
      { start: "09:15", end: "10:00", subject: "Lenguaje", teacher: "Prof. López", room: "Aula 102" },
      { start: "11:15", end: "12:00", subject: "Historia", teacher: "Prof. Martínez", room: "Aula 103" },
    ],
    martes: [
      { start: "08:30", end: "09:15", subject: "Ciencias", teacher: "Prof. Silva", room: "Lab 1" },
      { start: "10:30", end: "11:15", subject: "Lenguaje", teacher: "Prof. López", room: "Aula 102" },
    ],
    miercoles: [
      { start: "09:15", end: "10:00", subject: "Historia", teacher: "Prof. Martínez", room: "Aula 103" },
      { start: "13:00", end: "13:45", subject: "Ciencias", teacher: "Prof. Silva", room: "Lab 1" },
    ],
  }
};

export function SchedulePicker({ 
  teacherId, 
  courseId, 
  selectedSlots, 
  onSlotsChange, 
  hoursPerWeek 
}: SchedulePickerProps) {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Obtener horarios existentes
  const teacherSchedule = teacherId ? mockTeacherSchedule[teacherId] || {} : {};
  const courseSchedule = mockCourseSchedule[courseId] || {};
  // Función para verificar disponibilidad de un slot
  const getSlotData = (day: string, startTime: string, endTime: string): ScheduleSlotData => {
    const conflicts: ScheduleConflict[] = [];
    
    // Verificar conflictos con el profesor
    if (teacherId && teacherSchedule[day as keyof DaySchedule]) {
      const daySlots = teacherSchedule[day as keyof DaySchedule] as TeacherScheduleSlot[];
      const teacherConflict = daySlots.find((slot: TeacherScheduleSlot) => 
        slot.start === startTime || 
        (slot.start < startTime && slot.end > startTime) ||
        (slot.start < endTime && slot.end > endTime)
      );
      
      if (teacherConflict) {
        conflicts.push({
          type: 'teacher',
          subject: teacherConflict.subject,
          room: teacherConflict.room
        });
      }
    }

    // Verificar conflictos con el curso
    if (courseSchedule[day as keyof DaySchedule]) {
      const daySlots = courseSchedule[day as keyof DaySchedule] as CourseScheduleSlot[];
      const courseConflict = daySlots.find((slot: CourseScheduleSlot) =>
        slot.start === startTime ||
        (slot.start < startTime && slot.end > startTime) ||
        (slot.start < endTime && slot.end > endTime)
      );
      
      if (courseConflict) {
        conflicts.push({
          type: 'student',
          subject: courseConflict.subject,
          teacher: courseConflict.teacher,
          room: courseConflict.room
        });
      }
    }

    // Verificar si ya está seleccionado
    const isSelected = selectedSlots.some(slot => 
      slot.day === day && slot.startTime === startTime && slot.endTime === endTime
    );

    return {
      isAvailable: conflicts.length === 0,
      conflicts,
      isSelected
    };
  };

  const handleSlotClick = (day: string, startTime: string, endTime: string) => {
    const slotData = getSlotData(day, startTime, endTime);
    
    // No permitir seleccionar slots con conflictos
    if (!slotData.isAvailable) return;

    if (slotData.isSelected) {
      // Remover slot
      onSlotsChange(selectedSlots.filter(slot => 
        !(slot.day === day && slot.startTime === startTime && slot.endTime === endTime)
      ));
    } else {
      // Verificar límite de horas
      if (selectedSlots.length >= hoursPerWeek) {
        alert(`No puedes seleccionar más de ${hoursPerWeek} horas por semana`);
        return;
      }
      
      // Agregar slot
      onSlotsChange([...selectedSlots, { day, startTime, endTime }]);
    }
  };

  const getSlotClassName = (slotData: ScheduleSlotData) => {
    if (slotData.isSelected) {
      return "bg-blue-100 border-blue-500 border-2 cursor-pointer hover:bg-blue-200";
    }
    
    if (!slotData.isAvailable) {
      return "bg-red-50 border-red-300 border-2 cursor-not-allowed opacity-60";
    }
    
    return "bg-gray-50 border-gray-200 border-2 cursor-pointer hover:bg-green-50 hover:border-green-300";
  };

  const formatWeekRange = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + currentWeek * 7);

    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }

    const start = weekDates[0];
    const end = weekDates[4];
    return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Seleccionar Horarios</h3>
          <p className="text-sm text-gray-600">
            Selecciona {hoursPerWeek} horas por semana ({selectedSlots.length}/{hoursPerWeek} seleccionadas)
          </p>
        </div>

        {/* Navegación de semanas */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center px-3">
            <div className="text-sm font-medium text-gray-900">
              {currentWeek === 0 ? "Esta semana" : currentWeek === 1 ? "Próxima" : `Semana ${currentWeek > 0 ? "+" : ""}${currentWeek}`}
            </div>
            <div className="text-xs text-gray-500">{formatWeekRange()}</div>
          </div>

          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 border-b border-gray-200 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-50 border-2 border-gray-200 rounded"></div>
          <span>Disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 border-2 border-blue-500 rounded"></div>
          <span>Seleccionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-50 border-2 border-red-300 rounded opacity-60"></div>
          <span>No disponible</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-3 h-3 text-orange-600" />
          <span>Conflicto profesor</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3 text-purple-600" />
          <span>Conflicto curso</span>
        </div>
      </div>

      {/* Grid de horarios */}
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Encabezados */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="p-2 text-sm font-medium text-gray-500">Horario</div>
            {DAYS.map((day) => (
              <div key={day} className="p-2 text-sm font-medium text-gray-900 text-center">
                {DAY_LABELS[day]}
              </div>
            ))}
          </div>

          {/* Filas de horarios */}
          <div className="space-y-1">
            {TIME_BLOCKS.map((timeBlock) => {
              // Si es recreo o almuerzo
              if (timeBlock.isBreak) {
                return (
                  <div key={timeBlock.start} className="grid grid-cols-6 gap-2">
                    <div className="p-2 text-sm text-gray-600 border-r border-gray-200">
                      {timeBlock.start}-{timeBlock.end}
                    </div>
                    <div className="col-span-5 p-2 bg-orange-50 text-orange-700 text-center text-sm font-medium rounded border border-orange-200">
                      {timeBlock.label}
                    </div>
                  </div>
                );
              }

              return (
                <div key={timeBlock.start} className="grid grid-cols-6 gap-2">
                  <div className="p-2 text-sm text-gray-600 border-r border-gray-200">
                    {timeBlock.start}-{timeBlock.end}
                    <div className="text-xs text-gray-500">{timeBlock.label}</div>
                  </div>

                  {DAYS.map((day) => {
                    const slotData = getSlotData(day, timeBlock.start, timeBlock.end);

                    return (
                      <div
                        key={`${day}-${timeBlock.start}`}
                        className={`
                          p-2 rounded-lg min-h-[60px] transition-all relative
                          ${getSlotClassName(slotData)}
                        `}
                        onClick={() => handleSlotClick(day, timeBlock.start, timeBlock.end)}
                      >
                        {/* Indicador de selección */}
                        {slotData.isSelected && (
                          <div className="absolute top-1 right-1">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                          </div>
                        )}

                        {/* Conflictos */}
                        {slotData.conflicts.map((conflict, index) => (
                          <div key={index} className="mb-1">
                            <div className="flex items-center gap-1 mb-1">
                              {conflict.type === 'teacher' ? (
                                <User className="w-3 h-3 text-orange-600" />
                              ) : (
                                <Users className="w-3 h-3 text-purple-600" />
                              )}
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                            </div>
                            <div className="text-xs font-medium text-gray-900 truncate">
                              {conflict.subject}
                            </div>
                            {conflict.teacher && (
                              <div className="text-xs text-gray-600 truncate">
                                {conflict.teacher}
                              </div>
                            )}
                            {conflict.room && (
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <MapPin className="w-2 h-2" />
                                <span className="truncate">{conflict.room}</span>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Slot disponible */}
                        {slotData.isAvailable && !slotData.isSelected && (
                          <div className="flex items-center justify-center h-full">
                            <Plus className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resumen de selección */}
      {selectedSlots.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Horarios seleccionados ({selectedSlots.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {selectedSlots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
              >                <div className="text-sm">
                  <div className="font-medium">{DAY_LABELS[slot.day as keyof typeof DAY_LABELS]}</div>
                  <div className="text-gray-600">{slot.startTime} - {slot.endTime}</div>
                </div>
                <button
                  onClick={() => handleSlotClick(slot.day, slot.startTime, slot.endTime)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
