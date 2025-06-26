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
    const section = document.querySelector(`.section:nth-child(${sectionIndex + 1})`);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">EduConecta Rural</span>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Acceder al Prototipo
          </button>
        </div>
      </nav>

      {/* Section Indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-emerald-400 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="section min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8 inline-flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-400/30">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300 text-sm font-medium">Zonas Rurales del Sur de Chile</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            EduConecta Rural
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transformando la educación en zonas rurales con tecnología que funciona 
            <span className="text-emerald-400 font-semibold"> sin conexión a internet</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection(1)}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Conocer el Problema
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Ver Prototipo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto text-white/60" />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section min-h-screen flex items-center py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-400/30">
                <WifiOff className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Desafío Educativo</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-6">
                El <span className="text-red-400">Problema</span> que Enfrentamos
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Las escuelas rurales del sur de Chile enfrentan desafíos únicos que limitan 
                el acceso a una educación de calidad y el monitoreo efectivo del progreso académico.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: WifiOff, title: "Conectividad Limitada", desc: "Acceso intermitente o nulo a internet" },
                  { icon: Monitor, title: "Escasas Herramientas Digitales", desc: "Falta de sistemas de gestión educativa" },
                  { icon: BarChart3, title: "Monitoreo Deficiente", desc: "Dificultad para seguir el progreso en tiempo real" },
                  { icon: Users, title: "Formación TIC Básica", desc: "Docentes con conocimientos tecnológicos limitados" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-center">Impacto en la Educación</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                    <span>Seguimiento del progreso</span>
                    <span className="text-red-400 font-bold">Deficiente</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg">
                    <span>Reportes para familias</span>
                    <span className="text-orange-400 font-bold">Limitados</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                    <span>Gestión de asistencia</span>
                    <span className="text-yellow-400 font-bold">Manual</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-lg">
                    <span>Sincronización de datos</span>
                    <span className="text-red-400 font-bold">Inexistente</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="section min-h-screen flex items-center py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-400/30 mb-8">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">Nuestra Propuesta</span>
            </div>

            <h2 className="text-5xl font-bold mb-6">
              La <span className="text-emerald-400">Solución</span> Innovadora
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Un sistema modular diseñado específicamente para superar las limitaciones
              de conectividad y complejidad tecnológica en zonas rurales.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
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
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/10 h-full">
                  <div className={`w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`w-8 h-8 text-emerald-400`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-3xl p-8 border border-emerald-400/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Tecnología que se Adapta</h3>
                <p className="text-gray-300 mb-6">
                  EduConecta Rural está construido con tecnologías modernas pero optimizado
                  para funcionar en entornos con limitaciones técnicas.
                </p>
                <div className="space-y-3">
                  {[
                    "Sincronización inteligente de datos",
                    "Almacenamiento local robusto",
                    "Interfaz responsiva multiplataforma",
                    "Reportes automáticos y exportables"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-500/20 p-4 rounded-xl text-center">
                    <Wifi className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <span className="text-sm font-medium">Online</span>
                  </div>
                  <div className="bg-blue-500/20 p-4 rounded-xl text-center">
                    <WifiOff className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <span className="text-sm font-medium">Offline</span>
                  </div>
                  <div className="col-span-2 bg-purple-500/20 p-4 rounded-xl text-center">
                    <ArrowRight className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <span className="text-sm font-medium">Sincronización Automática</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section min-h-screen flex items-center py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-400/30 mb-8">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Funcionalidades Desarrolladas</span>
            </div>

            <h2 className="text-5xl font-bold mb-6">
              <span className="text-blue-400">Funcionalidades</span> Completas
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Un ecosistema completo de herramientas educativas diseñadas para cada tipo de usuario
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Admin Features */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-emerald-400 mb-8">Para Administradores</h3>
              <div className="space-y-4">
                {[
                  { icon: Users, title: "Gestión de Escuelas", desc: "Registro y administración de instituciones educativas" },
                  { icon: GraduationCap, title: "Gestión de Docentes", desc: "Registro, asignación y administración de profesores" },
                  { icon: BookOpen, title: "Gestión de Cursos", desc: "Creación y organización de cursos y materias" },
                  { icon: FileText, title: "Reportes Regionales", desc: "Informes consolidados por región y escuela" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-400/20">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teacher Features */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-blue-400 mb-8">Para Docentes</h3>
              <div className="space-y-4">
                {[
                  { icon: UserCheck, title: "Registro de Asistencia", desc: "Control diario de asistencia de estudiantes" },
                  { icon: Calendar, title: "Gestión de Actividades", desc: "Creación y seguimiento de actividades escolares" },
                  { icon: TrendingUp, title: "Seguimiento de Progreso", desc: "Monitoreo del avance académico individual" },
                  { icon: FileText, title: "Reportes de Curso", desc: "Informes detallados por curso y estudiante" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-blue-500/10 rounded-xl border border-blue-400/20">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{feature.title}</h4>
                      <p className="text-gray-400">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Student Features */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-purple-400/20">
            <h3 className="text-3xl font-bold text-purple-400 mb-8 text-center">Para Estudiantes y Familias</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, title: "Información Académica", desc: "Acceso a calificaciones y progreso" },
                { icon: Calendar, title: "Actividades y Tareas", desc: "Visualización de actividades pendientes" },
                { icon: TrendingUp, title: "Recomendaciones", desc: "Sugerencias personalizadas de mejora" }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-purple-500/10 rounded-xl">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section min-h-screen flex items-center py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-emerald-400/30 mb-8">
              <ArrowRight className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">Prototipo Navegable</span>
            </div>

            <h2 className="text-5xl font-bold mb-6">
              Explora el <span className="text-emerald-400">Prototipo</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Descubre cómo EduConecta Rural transforma la gestión educativa.
              Navega por todas las funcionalidades desarrolladas en nuestro MVP.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
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
                <div className={`absolute inset-0 bg-gradient-to-r from-${role.color}-500/20 to-${role.color}-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/10 h-full">
                  <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
                  <p className="text-gray-400 mb-6">{role.desc}</p>
                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className={`w-4 h-4 text-${role.color}-400 flex-shrink-0`} />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-3xl border border-white/10 mb-8">
              <h3 className="text-3xl font-bold mb-4">¿Listo para Explorar?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Accede al prototipo navegable y experimenta de primera mano cómo EduConecta Rural
                puede transformar la educación en zonas rurales.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/login')}
                  className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
                >
                  <span>Acceder al Prototipo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => scrollToSection(0)}
                  className="px-8 py-4 border-2 border-white/30 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300"
                >
                  Volver al Inicio
                </button>
              </div>
            </div>

            <div className="text-center text-gray-400">
              <p className="mb-2">Desarrollado por:</p>
              <p className="font-semibold">Maximiliano Cortés • Germán Jara • Carlo Negroni</p>
              <p className="text-sm mt-2">Gestión de Proyectos de Software ICC738</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">EduConecta Rural</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 EduConecta Rural - Transformando la educación en zonas rurales de Chile
          </p>
        </div>
      </footer>
    </div>
  );
}
