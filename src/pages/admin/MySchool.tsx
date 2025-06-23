import { useState } from 'react';
import { AppShell } from '../../components/AppShell';
import { Edit, MapPin, Phone, Mail, User, Building, GraduationCap, Users } from 'lucide-react';
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
  const [school, setSchool] = useState(mySchoolData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Prepara los datos para el modal, excluyendo campos que no se editan
  const schoolEditData = {
    name: school.name,
    address: school.address,
    phone: school.phone,
    email: school.email,
    director: school.director,
  };

  return (
    <AppShell role='admin-local'>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Mi Escuela</h1>
            <p className="text-gray-600 mt-1">Información y gestión de {school.name}</p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={18} />
            Editar Información
          </button>
        </div>

        {/* School Info Card */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6">{school.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-400" />
              <span className="text-gray-700">{school.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-400" />
              <span className="text-gray-700">{school.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-400" />
              <span className="text-gray-700">{school.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-400" />
              <span className="text-gray-700">Director/a: {school.director}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building size={20} className="text-gray-400" />
              <span className="text-gray-700">Administrador/a: {school.administrator}</span>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-around">
            <div className="text-center">
              <GraduationCap size={32} className="mx-auto text-blue-500 mb-2" />
              <p className="text-2xl font-bold text-gray-800">{school.studentsCount}</p>
              <p className="text-sm text-gray-500">Estudiantes</p>
            </div>
            <div className="text-center">
              <Users size={32} className="mx-auto text-green-500 mb-2" />
              <p className="text-2xl font-bold text-gray-800">{school.teachersCount}</p>
              <p className="text-sm text-gray-500">Docentes</p>
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