import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { RecoverPassword } from './pages/RecoverPassword';

import { AdminDashboard } from './pages/dashboard/admin/AdminDashboard';
import { SuperAdminDashboard } from './pages/dashboard/superadmin/SuperAdminDashboard';
import { TeacherDashboard } from './pages/dashboard/teacher/TeacherDashboard';
import { TeacherClasses } from './pages/dashboard/teacher/TeacherClasses';
import { TeacherReports } from './pages/dashboard/teacher/TeacherReports';
import { CourseDetail as TeacherCourseDetail } from './pages/dashboard/teacher/CourseDetail';
import { StudentDashboard } from './pages/dashboard/student/StudentDashboard';
import { StudentSubjectsPage } from './pages/dashboard/student/StudentSubjectsPage';

import { Schools } from './components/admin/Schools';
import { Teachers } from './components/admin/Teachers';
import { Students } from './components/admin/Students';
import { RegionalReports } from './components/admin/RegionalReports';

import { MySchool } from './components/admin/MySchool';
import { Courses } from './components/admin/Courses';
import { CourseDetail } from './components/admin/CourseDetail';
import { Subjects } from './components/admin/Subjects';
import { SchoolTeachers } from './components/admin/local/SchoolTeachers';
import { SchoolStudents } from './components/admin/local/SchoolStudents';
import { Reports } from './components/admin/Reports';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecoverPassword />} />        {/* Admin general - redirige a admin local por defecto */}
        <Route path="/admin" element={<AdminDashboard />} />        {/* Admin Regional (SuperAdmin) */}
        <Route path="/admin-regional" element={<SuperAdminDashboard />} />
        <Route path="/admin-regional/schools" element={<Schools />} />
        <Route path="/admin-regional/teachers" element={<Teachers />} />
        <Route path="/admin-regional/students" element={<Students />} />
        <Route path="/admin-regional/reports" element={<RegionalReports />} />
        <Route
          path="/admin-regional/reports/:schoolId"
          element={<Reports />}
        />

        {/* Admin Local (por escuela) */}
        <Route path="/admin-local/:schoolId" element={<AdminDashboard />} />
        <Route path="/admin-local/:schoolId/my-school" element={<MySchool />} />
        <Route path="/admin-local/:schoolId/courses" element={<Courses />} />
        <Route path="/admin-local/:schoolId/courses/:courseId" element={<CourseDetail />} />
        <Route path="/admin-local/:schoolId/subjects" element={<Subjects />} />
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
        />        {/* Teacher */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/classes/:schoolId/:courseId" element={<TeacherCourseDetail />} />
        <Route path="/teacher/reports" element={<TeacherReports />} />

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
