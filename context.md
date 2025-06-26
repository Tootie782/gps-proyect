este es el caso practico en el que tenemos que desarrollar interfaz:
Caso Práctico de Evaluación – Gestión de Proyectos de
Software ICC738
1. Instrucciones:
- El	trabajo	debe	ser	desarrollado	de	3 integrantes
- Lea	atentamente	el	caso	presentado	más	abajo
- Debe	detallar	los	requerimientos	funcionales	y	los	no	funcionales
- A	partir	de	casos	de	uso,	estimar	y	planificar	(cronograma)	las	tareas	del	
proyecto	a	desarrollar
- Generar	maquetas	navegables	(sin	desarrollo	de	software)
- Piense	en	llegar	a	un	MVP	- TRL3
- Presentar	el	proyecto	en	no	más	de	5	minutos	en	clase
- Haga	las	suposiciones	que	estime	convenientes,	pero	deben	documentarse	en	el	
informe.
2. Proyecto: Caso EduConecta Rural
En	zonas	rurales	del	sur	de	Chile,	muchas	escuelas	presentan	baja	conectividad,	escaso	
acceso	a	herramientas	digitales	y	dificultades	para	monitorear	el	progreso	académico	de	
sus	 estudiantes	 en	 tiempo	 real.	 La	 Dirección	 de	 Educación	 Regional	 ha	 solicitado	 el	
desarrollo	de	un	sistema	modular	que	permita:
- Registrar	y	monitorear	el	progreso	académico	de	estudiantes	de	distintas	escuelas.
- Gestionar	asistencia,	participación	y	actividades	escolares.
- Incluir	conectividad	offline	con	sincronización	automática	cuando	haya	internet.
- Facilitar	reportes	para	docentes,	familias	y	el	ministerio.
- Usar	herramientas	simples	y	económicas	que	puedan	ser	operadas	por	docentes	con	
formación	básica	en	TIC.
Cliente: Dirección	de	Educación	Rural	– Ministerio	de	Educación.
Alcance	del	software:
- Registro	de	escuelas	y	sus	docentes.
- Fichas	de	estudiantes	(datos	personales,	rendimiento,	asistencia,	etc.).
- Carga	de	actividades	por	docente.
- Reportes	de	avance	por	curso,	escuela	y	región.
- Sincronización	offline/online.
- Módulo	de	visualización	para	familias	(web	o	móvil).
- Administración	de	usuarios.
3. Criterios a Evaluar según power point, ultima lámina (criterio y ejemplos de
casos)

y estos son los casos de uso:
Registrar escuela

Registrar docente

Registrar estudiante

Registrar apoderado

Registrar curso

Asignar docente/estudiante a curso

Gestionar perfil de usuario (CRUD)

Editar ficha de estudiante

Registrar actividad

Registrar asistencia

Ver progreso estudiante

Generar reporte curso

Visualizar información del estudiante

Sincronizar datos (actualización en tiempo real)

Iniciar sesión

Asignar roles y permisos

Recuperar contraseña

Exportar reporte


# EduConecta Rural – **Guía mínima para el agente**  
_Solo lo esencial para crear la interfaz en Vue 3 + Vite sin backend._

---

## 1 · Objetivo
Construir un **prototipo navegable** (MVP‑TRL 3) que permita demostrar los casos de uso clave con **datos mock** generados localmente. Todo debe ser **responsivo**, **accesible**, ligero y coherente.

## 2 · Stack & Convenciones
| Aspecto | Elección |
|---------|----------|
| Framework | React – Composition API |
| Bundler | Vite |
| Estilos | TailwindCSS (`@tailwindcss/vite`) |
| Estado ligero | `reactive()` / `ref()` en composables (sin Pinia) |
| Iconos | Lucide (svg) |
| Lint | ESLint + TypeScript |

> **Sin backend** → Todo se alimenta desde archivos JSON en `/src/mocks` o factories TS.

## 3 · Estructura de Carpetas (mínima)

```
src/
 ├─ assets/          # logos, imágenes
 ├─ components/      # UI genéricos (Button, BaseModal…)
 ├─ composables/     # useStudents(), useSchools() – devuelven mock data
 ├─ mocks/           # *.json o factories *.ts
 ├─ pages/           # Home.vue, Students.vue, Reports.vue…
 ├─ router/          # index.ts
 └─ styles/          # tailwind.css
```

## 4 · Mock Data
- Guarda cada entidad en un JSON (`students.json`, `schools.json`, etc.).  
- Carga con `import students from "@/mocks/students.json";` dentro de un composable.  
- Simula latencia con `await new Promise(r => setTimeout(r, 300));`

### Ejemplo (`/src/composables/useStudents.ts`)
```ts
import { ref } from "vue";
import students from "@/mocks/students.json";

export function useStudents() {
  const list = ref<typeof students>([]);
  async function fetchAll() {
    await new Promise(r => setTimeout(r, 300));
    list.value = students;
  }
  return { list, fetchAll };
}
```

## 5 · Tokens de Diseño
```js
// tailwind.config.js (extracto)
extend: {
  colors: {
    primary: { DEFAULT: "#2D6A4F", dark: "#1B4332" },
    accent:  { DEFAULT: "#FFC300" },
    neutral: { 50: "#F9FAFB", 900: "#111827" },
  },
  fontFamily: { sans: ["Inter", "sans-serif"] },
}
```

## 6 · Componentes Clave
| Componente | Propósito rápido |
|------------|------------------|
| `BaseButton` | Variantes `primary`, `secondary`, `danger` |
| `BaseModal`  | Se muestra vía v-if + `<teleport to="body">` |
| `DataTable`  | Tabla simple con slots para celdas |
| `StatCard`   | Métrica + icono |

### Patrón Modal mínimo
```vue
<!-- BaseModal.vue -->
<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 bg-black/40 grid place-items-center">
      <div class="bg-neutral-50 w-full max-w-md rounded-xl p-6">
        <slot />
        <button class="mt-4 btn" @click="$emit('close')">Cerrar</button>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
defineProps<{ open: boolean }>();
defineEmits<{ close: [] }>();
</script>
```

### Uso rápido
```vue
<BaseButton @click="show=true">Ver Estudiante</BaseButton>
<BaseModal :open="show" @close="show=false">
  <!-- Renderiza datos falsos -->
  <h2 class="text-xl font-medium">{{ student.name }}</h2>
  <p>Progreso: {{ student.progress }}%</p>
</BaseModal>
```

## 7 · Reglas de Contribución
1. **Un archivo → un componente**.  
2. No usar `!important`.  
3. LCP ≤ 2.5 s, bundle inicial ≤ 150 KB.  
4. Todo texto en español neutro.  
5. Accesibilidad WCAG AA (etiquetas, roles, foco visible).

---

> **Recordatorio interno**: el agente debe generar los mocks y manipularlos en front‑end; no habrá endpoints reales.
