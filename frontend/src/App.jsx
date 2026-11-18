
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ComingSoon from "./components/ComingSoon";
import SystemDesign from "./pages/SystemDesign";
import SystemDesignDetails from "./pages/SystemDesignDetails";
import Profile from "./pages/Profile";

function App() {
  const renderProtectedPage = (page) => (
    <ProtectedRoute>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          {page}
        </main>
      </div>
    </ProtectedRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Pages without sidebar */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Pages with sidebar */}
        <Route
          path="/"
          element={renderProtectedPage(<Dashboard />)}
        />

        <Route
          path="/topics"
          element={renderProtectedPage(<Topics />)}
        />
        <Route
  path="/profile"
  element={renderProtectedPage(<Profile />)}
/>

        <Route
  path="/system-design"
  element={renderProtectedPage(<SystemDesign />)}
/>
    <Route
  path="/system-design/:slug"
  element={renderProtectedPage(<SystemDesignDetails />)}
/>    

        <Route
          path="/progress"
          element={renderProtectedPage(
            <ComingSoon
              title="My Progress"
              description="Track your coding journey, monitor your achievements, and see how far you've come. Coming soon!"
            />
          )}
        />

        <Route
          path="/leaderboard"
          element={renderProtectedPage(
            <ComingSoon
              title="Leaderboard"
              description="Compete with fellow learners, earn points, and climb the AlgoSimplified rankings. Coming soon!"
            />
          )}
        />

        <Route
          path="/settings"
          element={renderProtectedPage(
            <ComingSoon
              title="Settings"
              description="Personalize your learning experience and manage your account preferences. Coming soon!"
            />
          )}
        />

        {/* Fallback for unknown routes */}
        <Route
          path="*"
          element={renderProtectedPage(
            <ComingSoon
              title="Page Not Found"
              description="The page you're looking for doesn't exist yet."
            />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
