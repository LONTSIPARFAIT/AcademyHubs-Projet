// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import PublicLayout from "./components/layout/PublicLayout";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Welcome />} />
          {/* Ajoutez vos autres routes publiques ici */}
          <Route path="/courses" element={<div>Cours Page</div>} />
          <Route path="/paths" element={<div>Parcours Page</div>} />
          <Route path="/mentors" element={<div>Mentors Page</div>} />
          <Route path="/about" element={<div>À propos Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;