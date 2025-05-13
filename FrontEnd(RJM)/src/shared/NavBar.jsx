import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './NavBar.css';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const role = user?.role?.toLowerCase();

  const renderRoleLinks = () => {
    switch (role) {
      case 'admin':
        return (
          <>
            <Link to="/admin/dashboard" aria-label="Admin Dashboard">Admin Dashboard</Link>
            <Link to="/admin/users" aria-label="Manage Users">Manage Users</Link>
          </>
        );
      case 'author':
        return (
          <>
            <Link to="/author/dashboard" aria-label="Author Dashboard">Author Dashboard</Link>
            <Link to="/author/submit" aria-label="Submit Paper">Submit Paper</Link>
            <Link to="/author/profile" aria-label="Profile">Profile</Link>
          </>
        );
      case 'editor':
        return (
          <Link to="/editor/dashboard" aria-label="Editor Dashboard">Editor Dashboard</Link>
        );
      case 'reviewer':
        return (
          <Link to="/reviewer/dashboard" aria-label="Reviewer Dashboard">Reviewer Dashboard</Link>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/" aria-label="Home">Home</Link>
          {user ? renderRoleLinks() : (
            <>
              <Link to="/register" aria-label="Sign Up">Sign Up</Link>
              <Link to="/login" aria-label="Login">Login</Link>
            </>
          )}
        </div>

        <div className="user-info">
          {user ? (
            <>
              <span>
                Welcome, <strong>{user.username}</strong> ({user.role})
              </span>
              <button onClick={handleLogout} aria-label="Logout">
                Logout
              </button>
            </>
          ) : (
            <span>Not logged in</span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
