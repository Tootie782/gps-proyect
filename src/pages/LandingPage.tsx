import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Wifi, 
  WifiOff, 
  Users, 
  BookOpen, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Monitor,
  ArrowRight,
  CheckCircle,
  MapPin,
  GraduationCap,
  FileText,
  UserCheck,
  Calendar,
  TrendingUp
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const element = section as HTMLElement;
        if (scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('.section');
    if (sections[sectionIndex]) {
      const element = sections[sectionIndex] as HTMLElement;
      const offsetTop = element.offsetTop - 80; // Account for fixed nav

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });

      setCurrentSection(sectionIndex);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">EduConecta Rural</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Acceder al Prototipo
          </button>
        </div>
      </nav>

      {/* Section Indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-4">
        {[
          { index: 0, label: 'Inicio' },
          { index: 1, label: 'Problema' },
          { index: 2, label: 'Solución' },
          { index: 3, label: 'Funcionalidades' },
          { index: 4, label: 'Prototipo' }
        ].map((section) => (
          <div key={section.index} className="relative group">
            <button
              onClick={() => scrollToSection(section.index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                currentSection === section.index
                  ? 'bg-emerald-600 border-emerald-600 scale-125 shadow-lg'
                  : 'bg-white border-gray-400 hover:border-emerald-500 hover:bg-emerald-50'
              }`}
            />
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                {section.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="section h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/80 to-transparent z-10" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/40 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/40 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6 inline-flex items-center space-x-2 bg-emerald-100 px-4 py-2 rounded-full border border-emerald-300">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span className="text-emerald-800 text-sm font-medium">Zonas Rurales del Sur de Chile</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gray-900 leading-tight">
            EduConecta Rural
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transformando la educación en zonas rurales con tecnología que funciona
            <span className="text-emerald-700 font-semibold"> sin conexión a internet</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => scrollToSection(1)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-semibold text-base hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Conocer el Problema
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-base hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Ver Prototipo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-gray-400" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section h-screen flex items-center py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full border border-red-300">
                <WifiOff className="w-4 h-4 text-red-700" />
                <span className="text-red-800 text-sm font-medium">Desafío Educativo</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                El <span className="text-red-600">Problema</span> que Enfrentamos
              </h2>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Las escuelas rurales del sur de Chile enfrentan desafíos únicos que limitan
                el acceso a una educación de calidad y el monitoreo efectivo del progreso académico.
              </p>

              <div className="space-y-4">
                {[
                  { icon: WifiOff, title: "Conectividad Limitada", desc: "Acceso intermitente o nulo a internet" },
                  { icon: Monitor, title: "Escasas Herramientas Digitales", desc: "Falta de sistemas de gestión educativa" },
                  { icon: BarChart3, title: "Monitoreo Deficiente", desc: "Dificultad para seguir el progreso en tiempo real" },
                  { icon: Users, title: "Formación TIC Básica", desc: "Docentes con conocimientos tecnológicos limitados" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-1 text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-700">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/50 to-orange-100/50 rounded-2xl blur-lg" />
              <div className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900">Impacto en la Educación</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-100">
                    <span className="text-sm text-gray-700">Seguimiento del progreso</span>
                    <span className="text-red-600 font-bold text-sm">Deficiente</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg border border-orange-100">
                    <span className="text-sm text-gray-700">Reportes para familias</span>
                    <span className="text-orange-600 font-bold text-sm">Limitados</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                    <span className="text-sm text-gray-700">Gestión de asistencia</span>
                    <span className="text-yellow-600 font-bold text-sm">Manual</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-100">
                    <span className="text-sm text-gray-700">Sincronización de datos</span>
                    <span className="text-red-600 font-bold text-sm">Inexistente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section h-screen flex items-center py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 mb-6">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-medium">Nuestra Propuesta</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              La <span className="text-emerald-600">Solución</span> Innovadora
            </h2>

            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Un sistema modular diseñado específicamente para superar las limitaciones
              de conectividad y complejidad tecnológica en zonas rurales.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: WifiOff,
                title: "Funcionalidad Offline",
                desc: "Trabaja sin conexión a internet y sincroniza automáticamente cuando hay conectividad",
                color: "emerald"
              },
              {
                icon: Smartphone,
                title: "Interfaz Intuitiva",
                desc: "Diseñada para docentes con formación básica en TIC, simple y accesible",
                color: "blue"
              },
              {
                icon: Shield,
                title: "Datos Seguros",
                desc: "Protección de información sensible con cifrado y control de acceso por roles",
                color: "purple"
              }
            ].map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-blue-100/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-lg h-full">
                  <div className={`w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 border border-emerald-200`}>
                    <feature.icon className={`w-6 h-6 text-emerald-600`} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Tecnología que se Adapta</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  EduConecta Rural está construido con tecnologías modernas pero optimizado
                  para funcionar en entornos con limitaciones técnicas.
                </p>
                <div className="space-y-2">
                  {[
                    "Sincronización inteligente de datos",
                    "Almacenamiento local robusto",
                    "Interfaz responsiva multiplataforma",
                    "Reportes automáticos y exportables"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 p-3 rounded-lg text-center border border-emerald-200">
                    <Wifi className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <span className="text-xs font-medium text-gray-700">Online</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-200">
                    <WifiOff className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs font-medium text-gray-700">Offline</span>
                  </div>
                  <div className="col-span-2 bg-purple-50 p-3 rounded-lg text-center border border-purple-200">
                    <ArrowRight className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <span className="text-xs font-medium text-gray-700">Sincronización Automática</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section h-screen flex items-start justify-center pt-24 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200 mb-4">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Funcionalidades Desarrolladas</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-gray-900">
              <span className="text-blue-600">Funcionalidades</span> Completas
            </h2>

            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Un ecosistema completo de herramientas educativas diseñadas para cada tipo de usuario
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Admin Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-emerald-600 mb-3">Para Administradores</h3>
              <div className="space-y-2">
                {[
                  { icon: Users, title: "Gestión de Escuelas", desc: "Registro y administración de instituciones educativas" },
                  { icon: GraduationCap, title: "Gestión de Docentes", desc: "Registro, asignación y administración de profesores" },
                  { icon: BookOpen, title: "Gestión de Cursos", desc: "Creación y organización de cursos y materias" },
                  { icon: FileText, title: "Reportes Regionales", desc: "Informes consolidados por región y escuela" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs mb-1 text-gray-900">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-blue-600 mb-3">Para Docentes</h3>
              <div className="space-y-2">
                {[
                  { icon: UserCheck, title: "Registro de Asistencia", desc: "Control diario de asistencia de estudiantes" },
                  { icon: Calendar, title: "Gestión de Actividades", desc: "Creación y seguimiento de actividades escolares" },
                  { icon: TrendingUp, title: "Seguimiento de Progreso", desc: "Monitoreo del avance académico individual" },
                  { icon: FileText, title: "Reportes de Curso", desc: "Informes detallados por curso y estudiante" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-3 h-3 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs mb-1 text-gray-900">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Features */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <h3 className="text-lg font-bold text-purple-600 mb-4 text-center">Para Estudiantes y Familias</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { icon: BookOpen, title: "Información Académica", desc: "Acceso a calificaciones y progreso" },
                { icon: Calendar, title: "Actividades y Tareas", desc: "Visualización de actividades pendientes" },
                { icon: TrendingUp, title: "Recomendaciones", desc: "Sugerencias personalizadas de mejora" }
              ].map((feature, index) => (
                <div key={index} className="text-center p-3 bg-white rounded-lg border border-purple-100">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <feature.icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-xs mb-1 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 text-xs">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section h-screen flex items-center py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-blue-50/50" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-blue-100 px-4 py-2 rounded-full border border-emerald-300 mb-6">
              <ArrowRight className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 text-sm font-medium">Prototipo Navegable</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Explora el <span className="text-emerald-600">Prototipo</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Descubre cómo EduConecta Rural transforma la gestión educativa.
              Navega por todas las funcionalidades desarrolladas en nuestro MVP.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: "Administrador Regional",
                desc: "Gestión completa del sistema a nivel ministerial",
                features: ["Registro de escuelas", "Reportes regionales", "Gestión de usuarios"],
                color: "emerald"
              },
              {
                title: "Administrador Local",
                desc: "Administración específica por escuela",
                features: ["Gestión de cursos", "Asignación de docentes", "Reportes locales"],
                color: "blue"
              },
              {
                title: "Docente",
                desc: "Herramientas pedagógicas completas",
                features: ["Registro de asistencia", "Gestión de actividades", "Seguimiento académico"],
                color: "purple"
              }
            ].map((role, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-${role.color}-100/50 to-${role.color}-200/50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`} />
                <div className="relative bg-white p-6 rounded-2xl border border-gray-200 shadow-lg h-full">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{role.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{role.desc}</p>
                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className={`w-3 h-3 text-${role.color}-600 flex-shrink-0`} />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg mb-6">
              <h3 className="text-xl font-bold mb-3 text-gray-900">¿Listo para Explorar?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm">
                Accede al prototipo navegable y experimenta de primera mano cómo EduConecta Rural
                puede transformar la educación en zonas rurales.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-bold text-base hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Acceder al Prototipo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection(0)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-base hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>

            <div className="text-center text-gray-600">
              <p className="mb-1 text-sm">Desarrollado por:</p>
              <p className="font-semibold text-sm">Maximiliano Cortés • Germán Jara • Carlo Negroni</p>
              <p className="text-xs mt-1">Gestión de Proyectos de Software ICC738</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">EduConecta Rural</span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2025 EduConecta Rural - Transformando la educación en zonas rurales de Chile
          </p>
        </div>
      </footer>
    </div>
  );
}
