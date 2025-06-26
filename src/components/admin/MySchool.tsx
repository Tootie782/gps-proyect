import { useState } from 'react';
import { AppShell } from '../AppShell';
import { Edit, MapPin, Phone, Mail, User, Building, GraduationCap, Users, School } from 'lucide-react';
import { EditSchoolModal } from './EditSchoolModal';

// Mock de la escuela del admin logueado (en un futuro vendría del contexto de autenticación)
const mySchoolData = {
  id: 1,
  name: 'Liceo Nacional A',
  address: 'Av. Principal 123, Santiago',
  phone: '+56 2 2345 6789',
  email: 'contacto@liceoA.cl',
  director: 'María González',
  administrator: 'Ricardo Tapia',
  studentsCount: 450,
  teachersCount: 25
};

export function MySchool() {
  const [school] = useState(mySchoolData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Prepara los datos para el modal, excluyendo campos que no se editan
  const schoolEditData = {
    name: school.name,
    address: school.address,
    phone: school.phone,
    email: school.email,
    director: school.director,
  };

  // Calcular promedio de estudiantes por docente
  const studentsPerTeacher = Math.round(school.studentsCount / school.teachersCount);

  return (
    <AppShell role='admin-local'>
      <div className="h-full flex flex-col">
        {/* Header compacto */}
        <div className="flex-shrink-0">
          <div className="p-4 md:p-6 pb-2 md:pb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <School className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900">Mi Escuela</h1>
                  <p className="text-sm text-gray-600">Gestión de {school.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full md:w-auto"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
            </div>
          </div>
        </div>

        {/* Contenido principal con scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-4 md:px-6 pt-2 pb-6">
            
            {/* Estadísticas compactas - Grid 2x2 en mobile, 4 columnas en desktop */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <div className="text-base md:text-lg font-bold text-purple-600">
                      {school.studentsCount}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Estudiantes</div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <div className="text-base md:text-lg font-bold text-emerald-600">
                      {school.teachersCount}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Docentes</div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Building className="w-4 h-4 text-blue-600" />
                    <div className="text-base md:text-lg font-bold text-blue-600">
                      {studentsPerTeacher}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Est./Docente</div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div className="text-base md:text-lg font-bold text-green-600">
                      Activa
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Estado</div>
                </div>
              </div>
            </div>

            {/* Información detallada de la escuela */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm md:text-base font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Información de la Escuela
                </h2>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{school.name}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Dirección</p>
                        <p className="text-sm text-gray-900">{school.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Teléfono</p>
                        <p className="text-sm text-gray-900">{school.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                        <p className="text-sm text-gray-900">{school.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Director/a</p>
                        <p className="text-sm text-gray-900">{school.director}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Building className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Administrador/a</p>
                        <p className="text-sm text-gray-900">{school.administrator}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditSchoolModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        schoolData={schoolEditData}
      />
    </AppShell>
  );
}