import { useState } from "react";
import {
  Clock,
  MapPin,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SchedulePeriod {
  time: string;
  subject: string;
  teacher: string;
  room: string;
  estado?: 'programada' | 'completada' | 'en_curso' | 'cancelada';
  tipo?: 'regular' | 'evaluacion' | 'laboratorio' | 'reforzamiento';
}

interface ScheduleDay {
  day: string;
  periods: SchedulePeriod[];
}

interface CourseScheduleProps {
  schedule: ScheduleDay[];
  courseName: string;
  isPreview?: boolean;
  previewMessage?: string;
  onPeriodClick?: (period: SchedulePeriod, day: string) => void;
}

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export function CourseSchedule({ 
  schedule, 
  courseName, 
  isPreview = false,
  previewMessage,
  onPeriodClick 
}: CourseScheduleProps) {
  const [currentWeek, setCurrentWeek] = useState(0);

  // Función para obtener las fechas de la semana actual
  const getWeekDates = (weekOffset: number) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = domingo, 1 = lunes, etc.
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Calcular offset para llegar al lunes

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset + weekOffset * 7);

    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentWeek);

  const formatWeekRange = () => {
    const start = weekDates[0];
    const end = weekDates[4];
    return `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${
      end.getMonth() + 1
    }`;
  };

  const getClassStatusIcon = (estado: SchedulePeriod["estado"]) => {
    switch (estado) {
      case "completada":
        return <CheckCircle className="w-3 h-3 text-green-600" />;
      case "en_curso":
        return <Play className="w-3 h-3 text-blue-600" />;
      case "cancelada":
        return <AlertCircle className="w-3 h-3 text-red-600" />;
      default:
        return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const getClassTypeConfig = (tipo: SchedulePeriod["tipo"]) => {
    switch (tipo) {
      case "evaluacion":
        return {
          label: "Evaluación",
          bgColor: "bg-red-100",
          textColor: "text-red-800",
          borderColor: "border-red-300",
          icon: "📝",
        };
      case "laboratorio":
        return {
          label: "Laboratorio",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          borderColor: "border-blue-300",
          icon: "🔬",
        };
      case "reforzamiento":
        return {
          label: "Reforzamiento",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-300",
          icon: "💪",
        };
      default:
        return {
          label: "Clase",
          bgColor: "bg-gray-100",
          textColor: "text-gray-800",
          borderColor: "border-gray-300",
          icon: "📖",
        };
    }
  };

  const getSubjectColor = (subjectName: string) => {
    const colors = [
      "bg-emerald-100 border-emerald-300",
      "bg-blue-100 border-blue-300",
      "bg-purple-100 border-purple-300",
      "bg-orange-100 border-orange-300",
      "bg-pink-100 border-pink-300",
      "bg-cyan-100 border-cyan-300",
    ];
    const index = subjectName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 h-full flex flex-col ${isPreview ? 'opacity-90' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
          <div>
            <h2 className="text-base md:text-lg font-semibold text-gray-900">
              {isPreview ? 'Preview Horario' : 'Horario'} - {courseName}
            </h2>
            {isPreview && previewMessage && (
              <p className="text-xs text-orange-600 font-medium">{previewMessage}</p>
            )}
          </div>
        </div>

        {/* Navegación de semanas */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            aria-label="Semana anterior"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="text-xs md:text-sm font-medium text-gray-700 min-w-0 px-2">
            {formatWeekRange()}
          </span>
          
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            aria-label="Semana siguiente"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Preview Warning */}
      {isPreview && (
        <div className="px-4 py-2 bg-orange-50 border-b border-orange-200">
          <p className="text-xs text-orange-700 text-center">
            ⚠️ Este horario podría estar sujeto a cambios
          </p>
        </div>
      )}

      {/* Schedule Grid */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Days Header */}
          <div className="grid grid-cols-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 border-r border-gray-200">
              Hora
            </div>
            {DAYS.map((day, index) => (
              <div key={day} className="p-2 md:p-3 text-xs md:text-sm font-medium text-gray-700 text-center border-r border-gray-200 last:border-r-0">
                <div className="flex flex-col items-center gap-1">
                  <span className="hidden md:block">{day}</span>
                  <span className="md:hidden">{day.slice(0, 3)}</span>
                  <span className="text-xs text-gray-500">
                    {weekDates[index]?.getDate()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Content */}
          <div className="grid grid-cols-6 auto-rows-fr">
            {/* Time slots */}
            {Array.from(new Set(
              schedule.flatMap(day => day.periods.map(p => p.time))
            )).sort().map((time) => (
              <div key={time} className="contents">
                {/* Time column */}
                <div className="p-2 md:p-3 text-xs font-medium text-gray-600 border-r border-b border-gray-200 bg-gray-50 flex items-center justify-center">
                  {time}
                </div>
                
                {/* Periods for each day */}
                {DAYS.map((dayName) => {
                  const daySchedule = schedule.find(d => d.day === dayName);
                  const period = daySchedule?.periods.find(p => p.time === time);
                  
                  return (
                    <div
                      key={`${dayName}-${time}`}
                      className={`p-1 md:p-2 border-r border-b border-gray-200 last:border-r-0 min-h-[60px] md:min-h-[80px] ${
                        period ? 'cursor-pointer hover:bg-gray-50' : ''
                      }`}
                      onClick={() => period && onPeriodClick?.(period, dayName)}
                    >
                      {period && (
                        <div className={`h-full rounded border-l-4 p-2 transition-all ${getSubjectColor(period.subject)}`}>
                          <div className="flex items-start justify-between mb-1">
                            <span className="text-xs font-medium text-gray-900 leading-tight">
                              {period.subject}
                            </span>
                            {getClassStatusIcon(period.estado)}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{period.room}</span>
                            </div>
                            
                            <div className="text-xs text-gray-600 truncate">
                              {period.teacher}
                            </div>
                          </div>
                          
                          {period.tipo && period.tipo !== 'regular' && (
                            <div className="mt-1">
                              <span className={`text-xs px-1 py-0.5 rounded ${getClassTypeConfig(period.tipo).bgColor} ${getClassTypeConfig(period.tipo).textColor}`}>
                                {getClassTypeConfig(period.tipo).icon} {getClassTypeConfig(period.tipo).label}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
