import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/dashboard/admin/AdminDashboard';
import { TeacherDashboard } from './pages/dashboard/teacher/TeacherDashboard';
import { StudentDashboard } from './pages/dashboard/student/StudentDashboard';
import { StudentSubjectsPage } from './pages/dashboard/student/StudentSubjectsPage';
import { RecoverPassword } from './pages/RecoverPassword';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecoverPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/subjects" element={<StudentSubjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
