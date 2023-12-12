import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import SinglePost from "./pages/singlePost.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const ProtectedRoute = ({ children }) => {
  const { authInfo } = useAuth();

  return authInfo ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <AllPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:slug"
            element={
              <ProtectedRoute>
                <SinglePost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
