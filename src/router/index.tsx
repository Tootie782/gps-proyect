import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { AdminDashboard } from '../pages/dashboard/admin/AdminDashboard';
import { TeacherDashboard } from '../pages/dashboard/teacher/TeacherDashboard';
import { StudentDashboard } from '../pages/dashboard/student/StudentDashboard';
import { RecoverPassword } from '../pages/RecoverPassword';
import { Schools } from '../pages/admin/Schools';
import { Teachers } from '../pages/admin/Teachers';
import { Students } from '../pages/admin/Students';
import { MySchool } from '../pages/admin/MySchool';
import { Courses } from '../pages/admin/Courses';
import { SchoolTeachers } from '../pages/admin/local/SchoolTeachers';
import { SchoolStudents } from '../pages/admin/local/SchoolStudents';
import { Reports } from '../pages/admin/Reports';
import { RegionalSchoolReport } from '../pages/admin/RegionalSchoolReport';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecoverPassword />} />

        {/* Rutas para Administrador Regional */}
        <Route path="/admin-regional" element={<AdminDashboard />} />
        <Route path="/admin-regional/schools" element={<Schools />} />
        <Route path="/admin-regional/teachers" element={<Teachers />} />
        <Route path="/admin-regional/students" element={<Students />} />
        <Route path="/admin-regional/reports/:schoolId" element={<RegionalSchoolReport />} />

        {/* Rutas para Administrador de Escuela */}
        <Route path="/admin-local/:schoolId" element={<MySchool />} />
        <Route path="/admin-local/:schoolId/courses" element={<Courses />} />
        <Route path="/admin-local/:schoolId/teachers" element={<SchoolTeachers />} />
        <Route path="/admin-local/:schoolId/students" element={<SchoolStudents />} />
        <Route path="/admin-local/:schoolId/reports" element={<Reports />} />
        
        {/* Rutas para otros roles */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />

        {/* Aquí agregaremos las rutas para admin-local más adelante */}
        {/* <Route path="/admin-local" element={<SchoolAdminDashboard />} /> */}

      </Routes>
    </BrowserRouter>
  );
}
