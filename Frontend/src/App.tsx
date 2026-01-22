import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import CoursesPage from "./pages/CoursesPage.tsx";
import PublicLayout from "./components/layout/PublicLayout";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Welcome />} />
          {/* Ajoutez vos autres routes ici */}
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/paths" element={<div className="p-8">Page Parcours - À développer</div>} />
          <Route path="/mentors" element={<div className="p-8">Page Mentors - À développer</div>} />
          <Route path="/about" element={<div className="p-8">Page À propos - À développer</div>} />
          <Route path="/contact" element={<div className="p-8">Page Contact - À développer</div>} />
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