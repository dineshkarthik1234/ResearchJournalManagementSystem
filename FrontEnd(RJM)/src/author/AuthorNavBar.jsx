import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './author.css';

function AuthorNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'author') {
      navigate('/author/login', { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/author/login');
  };

  if (!user || user.role?.toLowerCase() !== 'author') return null;

  return (
    <nav className="navbar author-navbar">
      <div className="navbar-left">
        <Link to="/author/dashboard" className="nav-brand">Author Portal</Link>
        <Link to="/author/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/author/submit-paper" className="nav-link">Submit Paper</Link>
        <Link to="/author/my-submissions" className="nav-link">My Submissions</Link>
      </div>
      <div className="navbar-right">
        <span className="welcome-text">Welcome, {user.username}!</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default AuthorNavBar;
