import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome.tsx";
import PublicLayout from "./components/layout/PublicLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
