import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Phone, Mail, User, Building } from 'lucide-react';
import { AppShell } from '../../components/AppShell';
import { AddSchoolModal } from './AddSchoolModal';

interface School {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  director: string;
  administrator: string;
  studentsCount: number;
  teachersCount: number;
}

const mockSchools: School[] = [
  {
    id: 1,
    name: 'Liceo Nacional A',
    address: 'Av. Principal 123, Santiago',
    phone: '+56 2 2345 6789',
    email: 'contacto@liceoA.cl',
    director: 'María González',
    administrator: 'Ricardo Tapia',
    studentsCount: 450,
    teachersCount: 25
  },
  {
    id: 2,
    name: 'Colegio San Francisco',
    address: 'Calle San Francisco 456, Valparaíso',
    phone: '+56 32 1234 5678',
    email: 'info@sanfrancisco.cl',
    director: 'Carlos Rodríguez',
    administrator: 'María González',
    studentsCount: 320,
    teachersCount: 18
  },
  {
    id: 3,
    name: 'Instituto Tecnológico',
    address: 'Ruta 5 Norte Km 15, Concepción',
    phone: '+56 41 9876 5432',
    email: 'admin@institutotec.cl',
    director: 'Ana Silva',
    administrator: 'Ricardo Tapia',
    studentsCount: 280,
    teachersCount: 22
  }
];

export function Schools() {
  const [schools, setSchools] = useState<School[]>(mockSchools);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSchool = (newSchool: Omit<School, 'id'>) => {
    const schoolWithId = {
      ...newSchool,
      id: Math.max(...schools.map(s => s.id)) + 1
    };
    setSchools([...schools, schoolWithId]);
    setIsModalOpen(false);
  };

  const handleDeleteSchool = (id: number) => {
    setSchools(schools.filter(school => school.id !== id));
  };

  return (
    <AppShell role="admin-regional">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Gestión de Escuelas</h1>
            <p className="text-gray-600 mt-1">Administra las escuelas registradas en el sistema</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Agregar Escuela
          </button>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{school.name}</h3>
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteSchool(school.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{school.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{school.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{school.email}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <User size={16} />
                  <span>Director: {school.director}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Building size={16} />
                  <span>Admin: {school.administrator}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600 font-medium">{school.studentsCount} estudiantes</span>
                  <span className="text-green-600 font-medium">{school.teachersCount} docentes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {schools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <School size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No hay escuelas registradas</h3>
            <p className="text-gray-500 mb-4">Comienza agregando la primera escuela al sistema</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
            >
              <Plus size={20} />
              Agregar Primera Escuela
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AddSchoolModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSchool}
      />
    </AppShell>
  );
} 