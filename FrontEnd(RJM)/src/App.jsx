import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

// Shared Components
import Home from './Home.jsx';
import Register from './Register.jsx';

// Admin Components
import AdminLogin from './admin/AdminLogin.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';

// Author Components
import AuthorLogin from './author/AuthorLogin.jsx';
import AuthorDashboard from './author/AuthorDashboard.jsx';
import AuthorSubmit from './author/AuthorSubmit.jsx';

// Editor Components
import EditorLogin from './editor/EditorLogin.jsx';
import EditorDashboard from './editor/EditorDashboard.jsx';

// Reviewer Components
import ReviewerLogin from './reviewer/ReviewerLogin.jsx';
import ReviewerDashboard from './reviewer/ReviewerDashboard.jsx';
import SubmitReview from './reviewer/SubmitReview.jsx';

// Shared Components
import NavBar from './shared/NavBar.jsx';
import PrivateRoute from './shared/PrivateRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/author/login" element={<AuthorLogin />} />
          <Route path="/editor/login" element={<EditorLogin />} />
          <Route path="/reviewer/login" element={<ReviewerLogin />} />
          {/* Redirect /login to a default login page */}
          <Route path="/login" element={<Navigate to="/author/login" replace />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute role="Admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/dashboard"
            element={
              <PrivateRoute role="Author">
                <AuthorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/author/submit"
            element={
              <PrivateRoute role="Author">
                <AuthorSubmit />
              </PrivateRoute>
            }
          />
          <Route
            path="/editor/dashboard"
            element={
              <PrivateRoute role="Editor">
                <EditorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviewer/dashboard"
            element={
              <PrivateRoute role="Reviewer">
                <ReviewerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/reviewer/submit-review/:id"
            element={
              <PrivateRoute role="Reviewer">
                <SubmitReview />
              </PrivateRoute>
            }
          />

          {/* Fallback Route for Undefined Paths */}
          <Route path="*" element={<div className="text-center mt-10">404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;