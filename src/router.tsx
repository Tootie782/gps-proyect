import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { RecoverPassword } from './pages/RecoverPassword';

import { AdminDashboard } from './pages/dashboard/admin/AdminDashboard';
import { TeacherDashboard } from './pages/dashboard/teacher/TeacherDashboard';
import { StudentDashboard } from './pages/dashboard/student/StudentDashboard';
import { StudentSubjectsPage } from './pages/dashboard/student/StudentSubjectsPage';

import { Schools } from './pages/admin/Schools';
import { Teachers } from './pages/admin/Teachers';
import { Students } from './pages/admin/Students';
import { RegionalSchoolReport } from './pages/admin/RegionalSchoolReport';

import { MySchool } from './pages/admin/MySchool';
import { Courses } from './pages/admin/Courses';
import { SchoolTeachers } from './pages/admin/local/SchoolTeachers';
import { SchoolStudents } from './pages/admin/local/SchoolStudents';
import { Reports } from './pages/admin/Reports';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecoverPassword />} />

        {/* Admin general */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Admin Regional */}
        <Route path="/admin-regional" element={<AdminDashboard />} />
        <Route path="/admin-regional/schools" element={<Schools />} />
        <Route path="/admin-regional/teachers" element={<Teachers />} />
        <Route path="/admin-regional/students" element={<Students />} />
        <Route
          path="/admin-regional/reports/:schoolId"
          element={<RegionalSchoolReport />}
        />

        {/* Admin Local (por escuela) */}
        <Route path="/admin-local/:schoolId" element={<MySchool />} />
        <Route path="/admin-local/:schoolId/courses" element={<Courses />} />
        <Route
          path="/admin-local/:schoolId/teachers"
          element={<SchoolTeachers />}
        />
        <Route
          path="/admin-local/:schoolId/students"
          element={<SchoolStudents />}
        />
        <Route
          path="/admin-local/:schoolId/reports"
          element={<Reports />}
        />

        {/* Teacher */}
        <Route path="/teacher" element={<TeacherDashboard />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route
          path="/student/subjects"
          element={<StudentSubjectsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
