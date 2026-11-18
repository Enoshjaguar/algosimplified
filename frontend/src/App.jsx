import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages without sidebar */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Pages with sidebar */}
       <Route
  path="/"
  element={
    <ProtectedRoute>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Dashboard />
        </main>
      </div>
    </ProtectedRoute>
  }
/>

        <Route
  path="/topics"
  element={
    <ProtectedRoute>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Topics />
        </main>
      </div>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;