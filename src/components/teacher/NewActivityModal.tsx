import { useState } from 'react';
import { BaseModal } from '../BaseModal';
import { Save, X } from 'lucide-react';

interface NewActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Array<{ escuela: string; curso: string }>;
  onSave?: (activityData: {
    titulo: string;
    descripcion: string;
    tipo: 'evaluacion' | 'proyecto' | 'tarea';
    fechaVencimiento: string;
    escuela: string;
    curso: string;
  }) => void;
}

export function NewActivityModal({
  isOpen,
  onClose,
  courses,
  onSave
}: NewActivityModalProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'tarea' as 'evaluacion' | 'proyecto' | 'tarea',
    fechaVencimiento: '',
    escuela: '',
    curso: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }
    if (!formData.fechaVencimiento) {
      newErrors.fechaVencimiento = 'La fecha de vencimiento es requerida';
    }
    if (!formData.escuela) {
      newErrors.escuela = 'Debe seleccionar una escuela';
    }
    if (!formData.curso) {
      newErrors.curso = 'Debe seleccionar un curso';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (onSave) {
        onSave(formData);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      tipo: 'tarea',
      fechaVencimiento: '',
      escuela: '',
      curso: ''
    });
    setErrors({});
    onClose();
  };

  const uniqueSchools = Array.from(new Set(courses.map(c => c.escuela)));
  const availableCourses = courses.filter(c => c.escuela === formData.escuela);

  return (
    <BaseModal open={isOpen} onClose={handleClose} title="Nueva Actividad" size="lg">
      <div className="space-y-6">
        {/* Tipo de actividad */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de actividad
          </label>
          <div className="flex gap-3">
            {[
              { value: 'tarea', label: 'Tarea', icon: '📝', color: 'blue' },
              { value: 'evaluacion', label: 'Evaluación', icon: '📊', color: 'red' },
              { value: 'proyecto', label: 'Proyecto', icon: '🎯', color: 'purple' }
            ].map(tipo => (
              <button
                key={tipo.value}
                onClick={() => setFormData(prev => ({ ...prev, tipo: tipo.value as any }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                  formData.tipo === tipo.value
                    ? `border-${tipo.color}-500 bg-${tipo.color}-50 text-${tipo.color}-700`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{tipo.icon}</span>
                <span className="text-sm font-medium">{tipo.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título
          </label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.titulo ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Ej: Tarea de Matemáticas - Capítulo 5"
          />
          {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.descripcion ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe los objetivos y requisitos de la actividad"
          />
          {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
        </div>

        {/* Escuela y Curso */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Escuela
            </label>
            <select
              value={formData.escuela}
              onChange={(e) => setFormData(prev => ({ ...prev, escuela: e.target.value, curso: '' }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.escuela ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Seleccionar escuela</option>
              {uniqueSchools.map(school => (
                <option key={school} value={school}>{school}</option>
              ))}
            </select>
            {errors.escuela && <p className="text-red-500 text-sm mt-1">{errors.escuela}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Curso
            </label>
            <select
              value={formData.curso}
              onChange={(e) => setFormData(prev => ({ ...prev, curso: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.curso ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={!formData.escuela}
            >
              <option value="">Seleccionar curso</option>
              {availableCourses.map((course, index) => (
                <option key={index} value={course.curso}>{course.curso}</option>
              ))}
            </select>
            {errors.curso && <p className="text-red-500 text-sm mt-1">{errors.curso}</p>}
          </div>
        </div>

        {/* Fecha de vencimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de vencimiento
          </label>
          <input
            type="date"
            value={formData.fechaVencimiento}
            onChange={(e) => setFormData(prev => ({ ...prev, fechaVencimiento: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.fechaVencimiento ? 'border-red-300' : 'border-gray-300'
            }`}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.fechaVencimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaVencimiento}</p>}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Crear Actividad
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
