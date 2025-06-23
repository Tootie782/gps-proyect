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
import type { Subject, ClassSchedule } from "../../types/student";

interface WeeklyScheduleProps {
  subjects: Subject[];
  onClassClick: (classItem: ClassSchedule, subject: Subject) => void;
}

const DAYS = ["lunes", "martes", "miercoles", "jueves", "viernes"] as const;
const DAY_LABELS = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
};

export function WeeklySchedule({
  subjects,
  onClassClick,
}: WeeklyScheduleProps) {
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

  // Crear un mapa de todas las clases organizadas por día y hora
  const scheduleMap = new Map<
    string,
    { class: ClassSchedule; subject: Subject }
  >();

  subjects.forEach((subject) => {
    subject.horario?.forEach((classItem) => {
      const key = `${classItem.dia}-${classItem.horaInicio}`;
      scheduleMap.set(key, { class: classItem, subject });
    });
  });

  const getClassStatusIcon = (estado: ClassSchedule["estado"]) => {
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

  const getClassTypeConfig = (tipo: ClassSchedule["tipo"]) => {
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
    ];
    const index = subjectName
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      {/* Header compacto */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Horario
          </h2>
        </div>

        {/* Navegación de semanas más compacta */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
          </button>

          <div className="text-center px-2 min-w-[80px] md:min-w-[100px]">
            <div className="text-xs font-medium text-gray-900">
              {currentWeek === 0
                ? "Esta sem."
                : currentWeek === 1
                ? "Próxima"
                : currentWeek === -1
                ? "Anterior"
                : `Sem ${currentWeek > 0 ? "+" : ""}${currentWeek}`}
            </div>
            <div className="text-xs text-gray-500 hidden md:block">{formatWeekRange()}</div>
          </div>

          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
          </button>
        </div>
      </div>      {/* Contenedor de contenido con scroll */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 md:p-3">
        {/* Vista de escritorio - Tabla compacta */}
        <div className="hidden md:block">
          {/* Encabezados de días */}
          <div className="grid grid-cols-6 gap-1 mb-1">
            <div className="p-1 text-xs font-medium text-gray-500">Hora</div>
            {DAYS.map((day, index) => (
              <div
                key={day}
                className="p-1 text-xs font-medium text-gray-900 text-center"
              >
                <div>{DAY_LABELS[day]}</div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {weekDates[index]?.getDate()}/{weekDates[index]?.getMonth() + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Horarios por bloque - más compacto */}
          <div className="space-y-0.5">
            {[
              { time: "08:30-10:00", type: "class" },
              { time: "10:00-10:30", type: "break", label: "Recreo" },
              { time: "10:30-12:00", type: "class" },
              { time: "12:00-13:00", type: "lunch", label: "Almuerzo" },
              { time: "13:00-14:30", type: "class" },
              { time: "14:30-16:00", type: "class" }
            ].map((timeBlock) => {
              const [startTime] = timeBlock.time.split("-");

              // Si es recreo o almuerzo
              if (timeBlock.type === "break" || timeBlock.type === "lunch") {
                return (
                  <div key={timeBlock.time} className="grid grid-cols-6 gap-1">
                    <div className="p-1 text-xs text-gray-600 border-r border-gray-200 font-medium">
                      {timeBlock.time}
                    </div>
                    <div className={`
                      col-span-5 p-1.5 rounded-md text-center text-xs font-medium
                      ${timeBlock.type === "lunch" 
                        ? "bg-orange-50 text-orange-700 border border-orange-200" 
                        : "bg-green-50 text-green-700 border border-green-200"
                      }
                    `}>
                      <div className="flex items-center justify-center gap-1">
                        <span>{timeBlock.type === "lunch" ? "🍽️" : "⏰"}</span>
                        <span>{timeBlock.label}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Para clases normales
              return (
                <div key={timeBlock.time} className="grid grid-cols-6 gap-1">
                  <div className="p-1 text-xs text-gray-600 border-r border-gray-200 font-medium">
                    {timeBlock.time}
                  </div>

                  {DAYS.map((day) => {
                    const classData = scheduleMap.get(`${day}-${startTime}`);

                    if (!classData) {
                      return (
                        <div
                          key={`${day}-${timeBlock.time}`}
                          className="p-0.5 border border-gray-100 rounded min-h-[40px]"
                        />
                      );
                    }

                    const { class: classItem, subject } = classData;
                    const typeConfig = getClassTypeConfig(classItem.tipo);

                    return (
                      <div
                        key={`${day}-${timeBlock.time}`}
                        className={`
                        p-1.5 border-2 rounded-md cursor-pointer transition-colors
                        hover:shadow-sm min-h-[40px] overflow-hidden
                        ${getSubjectColor(subject.nombre)}
                      `}
                        onClick={() => onClassClick(classItem, subject)}
                      >
                        <div className="space-y-0.5">
                          {/* Header con materia y estado */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold truncate">
                              {subject.nombre}
                            </span>
                            {getClassStatusIcon(classItem.estado)}
                          </div>

                          {/* Tag de tipo de clase */}
                          <div
                            className={`
                          inline-flex items-center gap-0.5 px-1 py-0.5 rounded-full text-xs font-medium border
                          ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}
                        `}
                          >
                            <span className="text-xs">{typeConfig.icon}</span>
                            <span className="truncate text-xs">
                              {typeConfig.label}
                            </span>
                          </div>

                          {/* Tema - compacto */}
                          <div className="text-xs font-medium text-gray-700 truncate">
                            {classItem.tema}
                          </div>

                          {/* Aula - compacto */}
                          <div className="flex items-center gap-0.5 text-xs text-gray-600">
                            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                            <span className="truncate">{subject.aula}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>        {/* Vista móvil - Lista compacta por días */}
        <div className="md:hidden space-y-3">
          {DAYS.map((day, dayIndex) => {
            // Obtener clases del día ordenadas por hora
            const dayClasses = subjects
              .flatMap((subject) =>
                subject.horario
                  ?.filter((classItem) => classItem.dia === day)
                  .map((classItem) => ({ class: classItem, subject }))
              )
              .sort((a, b) =>
                a.class.horaInicio.localeCompare(b.class.horaInicio)
              );

            return (
              <div key={day} className="bg-gray-50 rounded-lg p-3">
                {/* Header del día compacto */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {DAY_LABELS[day]}
                  </h3>
                  <span className="text-xs text-gray-600">
                    {weekDates[dayIndex]?.getDate()}/{weekDates[dayIndex]?.getMonth() + 1}
                  </span>
                </div>

                {/* Lista de clases del día */}
                {dayClasses.length > 0 ? (
                  <div className="space-y-2">
                    {dayClasses.map(({ class: classItem, subject }) => {
                      const typeConfig = getClassTypeConfig(classItem.tipo);
                      return (
                        <div
                          key={classItem.id}
                          className={`
                            p-3 rounded-lg border-l-4 cursor-pointer transition-all
                            hover:shadow-sm bg-white
                            ${getSubjectColor(subject.nombre)
                              .replace("bg-", "border-")
                              .replace("-100", "-400")}
                          `}
                          onClick={() => onClassClick(classItem, subject)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              {/* Hora */}
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-3 h-3 text-gray-500 flex-shrink-0" />
                                <span className="text-xs font-medium text-gray-900">
                                  {classItem.horaInicio} - {classItem.horaFin}
                                </span>
                              </div>

                              {/* Materia */}
                              <h4 className="font-medium text-gray-900 mb-1 text-sm truncate">
                                {subject.nombre}
                              </h4>
                              
                              {/* Tema */}
                              <p className="text-xs text-gray-600 mb-2 truncate">
                                {classItem.tema}
                              </p>

                              {/* Tag de tipo y aula en una línea */}
                              <div className="flex items-center gap-2 text-xs">
                                <div
                                  className={`
                                  inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border
                                  ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}
                                `}
                                >
                                  <span>{typeConfig.icon}</span>
                                  <span>{typeConfig.label}</span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-gray-500">
                                  <MapPin className="w-3 h-3 flex-shrink-0" />
                                  <span className="truncate">{subject.aula}</span>
                                </div>
                              </div>
                            </div>

                            {/* Estado */}
                            <div className="ml-2 flex-shrink-0">
                              {getClassStatusIcon(classItem.estado)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Clock className="w-5 h-5 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Sin clases programadas</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
