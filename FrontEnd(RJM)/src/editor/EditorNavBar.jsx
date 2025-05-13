import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function EditorNavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/editor/login');
  };

  if (!user || user.role.toLowerCase() !== 'editor') {
    navigate('/editor/login');
    return null;
  }

  return (
    <nav className="navbar" style={styles.navbar}>
      <div style={styles.left}>
        <Link to="/editor/dashboard" style={styles.brand}>Editor Portal</Link>
        <Link to="/editor/dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/editor/assigned-papers" style={styles.link}>Assigned Papers</Link>
        <Link to="/editor/review-queue" style={styles.link}>Review Queue</Link>
      </div>
      <div style={styles.right}>
        <span style={styles.welcome}>Welcome, {user.username}!</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fd7e14',
    padding: '0.75rem 1.5rem',
    color: '#fff',
    fontWeight: 'bold',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  brand: {
    fontSize: '1.3rem',
    color: '#fff',
    textDecoration: 'none',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  welcome: {
    marginRight: '0.5rem',
  },
  logout: {
    backgroundColor: '#fff',
    color: '#fd7e14',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EditorNavBar;
