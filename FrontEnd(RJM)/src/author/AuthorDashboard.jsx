import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../shared/NavBar.jsx';
import './author.css';

function AuthorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAuthorized = useMemo(() => {
    return user && user.role?.toLowerCase() === 'author' && Boolean(user.token);
  }, [user]);

  useEffect(() => {
    if (!isAuthorized) {
      console.warn('AuthorDashboard: Redirecting - invalid or missing user/token');
      navigate('/author/login', { replace: true });
    }
  }, [isAuthorized, navigate]);

  if (!isAuthorized) return null;

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="page-title">Author Dashboard</h1>
        <p className="welcome-msg">Welcome, {user.username}!</p>
        <section className="card">
          <h2>Your Actions</h2>
          <div className="button-group">
            <Link to="/author/submit" className="action-btn submit">Submit a New Paper</Link>
            <Link to="/author/profile" className="action-btn profile">View Your Profile</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthorDashboard;
