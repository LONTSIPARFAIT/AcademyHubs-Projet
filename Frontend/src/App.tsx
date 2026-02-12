import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import CoursesPage from "./pages/course/CoursesPage.tsx";
import PublicLayout from "./components/layout/PublicLayout";
import './App.css';
import CourseDetail from "./pages/course/CourseDetail.tsx";
import PathsPage from "./pages/PathsPage.tsx";
import MentorsPage from "./pages/MentorsPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import DashboardPage from "./pages/DashBoardPage.tsx";
import LessonPlayerPage from "./pages/course/LessonPlayerPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Welcome />} />
          {/* Ajoutez vos autres routes ici */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/paths" element={<PathsPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/watch/:lessonSlug" element={<LessonPlayerPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/register/success" element={<RegisterSuccess />} /> */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404</h1>
              <p className="text-gray-600 dark:text-gray-400">Page non trouvée</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;