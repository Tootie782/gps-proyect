import { useState, useCallback } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { BaseModal } from '../BaseModal';

interface Course {
  id: number;
  name: string;
  teacherId: number | null;
  studentIds: number[];
  schoolId: number;
  level: string;
  section: string;
  subject: string;
}

interface ScheduleSlot {
  id: string;
  courseId: number;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room?: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courseId: number, schedules: ScheduleSlot[]) => void;
  course: Course;
  schedules: ScheduleSlot[];
}

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const TIME_SLOTS = [
  '08:00', '08:45', '09:30', '10:15', '11:00', '11:45', 
  '12:30', '13:15', '14:00', '14:45', '15:30', '16:15', '17:00'
];

export function ScheduleModal({ isOpen, onClose, onSave, course, schedules }: ScheduleModalProps) {
  const [localSchedules, setLocalSchedules] = useState<ScheduleSlot[]>(schedules);
  const [draggedItem, setDraggedItem] = useState<ScheduleSlot | null>(null);

  const handleAddSchedule = () => {
    const newSchedule: ScheduleSlot = {
      id: `${Date.now()}-${Math.random()}`,
      courseId: course.id,
      day: 'Lunes',
      startTime: '08:00',
      endTime: '08:45',
      subject: course.subject,
      room: '',
    };
    setLocalSchedules(prev => [...prev, newSchedule]);
  };

  const handleUpdateSchedule = (id: string, updates: Partial<ScheduleSlot>) => {
    setLocalSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id ? { ...schedule, ...updates } : schedule
      )
    );
  };

  const handleDeleteSchedule = (id: string) => {
    setLocalSchedules(prev => prev.filter(schedule => schedule.id !== id));
  };

  const handleSave = () => {
    onSave(course.id, localSchedules);
    onClose();
  };

  const handleDragStart = useCallback((e: React.DragEvent, schedule: ScheduleSlot) => {
    setDraggedItem(schedule);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetDay: string, targetTime: string) => {
    e.preventDefault();
    if (draggedItem) {
      handleUpdateSchedule(draggedItem.id, {
        day: targetDay,
        startTime: targetTime,
        endTime: getEndTime(targetTime),
      });
      setDraggedItem(null);
    }
  }, [draggedItem]);

  const getEndTime = (startTime: string) => {
    const startIndex = TIME_SLOTS.indexOf(startTime);
    return startIndex < TIME_SLOTS.length - 1 ? TIME_SLOTS[startIndex + 1] : startTime;
  };

  const getScheduleAtTime = (day: string, time: string) => {
    return localSchedules.find(s => s.day === day && s.startTime === time);
  };
  return (
    <BaseModal open={isOpen} onClose={onClose} title={`Horario - ${course.name}`} size="xl">
      <div className="space-y-6">
        {/* Course Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{course.level} - {course.section}</span>
            <span>•</span>
            <span>{course.subject}</span>
          </div>
        </div>

        {/* Add Schedule Button */}
        <button
          onClick={handleAddSchedule}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Bloque de Horario
        </button>

        {/* Schedule Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid grid-cols-6 gap-1 mb-2">
              <div className="p-2 text-xs font-medium text-gray-500 text-center">Hora</div>
              {DAYS.map(day => (
                <div key={day} className="p-2 text-xs font-medium text-gray-700 text-center bg-gray-100 rounded">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="space-y-1">
              {TIME_SLOTS.map(time => (
                <div key={time} className="grid grid-cols-6 gap-1">
                  <div className="p-2 text-xs text-gray-500 text-center border-r border-gray-200">
                    {time}
                  </div>
                  {DAYS.map(day => {
                    const schedule = getScheduleAtTime(day, time);
                    return (
                      <div
                        key={`${day}-${time}`}
                        className="h-12 border border-gray-200 rounded relative"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, day, time)}
                      >
                        {schedule && (
                          <div
                            draggable
                            onDragStart={(e) => handleDragStart(e, schedule)}
                            className="absolute inset-0 bg-blue-100 border border-blue-300 rounded p-1 cursor-move hover:bg-blue-200 transition-colors group"
                          >
                            <div className="flex items-center justify-between h-full">
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-blue-800 truncate">
                                  {schedule.subject}
                                </div>
                                {schedule.room && (
                                  <div className="text-xs text-blue-600 truncate">
                                    {schedule.room}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <GripVertical className="w-3 h-3 text-blue-600" />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSchedule(schedule.id);
                                  }}
                                  className="p-0.5 text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
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

        {/* Schedule List (for editing details) */}
        {localSchedules.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Detalles de Horarios</h4>
            {localSchedules.map(schedule => (
              <div key={schedule.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Día
                    </label>
                    <select
                      value={schedule.day}
                      onChange={(e) => handleUpdateSchedule(schedule.id, { day: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {DAYS.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Hora Inicio
                    </label>
                    <select
                      value={schedule.startTime}
                      onChange={(e) => handleUpdateSchedule(schedule.id, { 
                        startTime: e.target.value,
                        endTime: getEndTime(e.target.value)
                      })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {TIME_SLOTS.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Aula
                    </label>
                    <input
                      type="text"
                      value={schedule.room || ''}
                      onChange={(e) => handleUpdateSchedule(schedule.id, { room: e.target.value })}
                      placeholder="Ej: Aula 101"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Guardar Horarios
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
