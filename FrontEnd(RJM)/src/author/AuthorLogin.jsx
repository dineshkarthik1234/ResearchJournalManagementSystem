import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';
import NavBar from '../shared/NavBar.jsx';
import { ClipLoader } from 'react-spinners';
import './author.css';

function AuthorLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Invalid username or password');
      }

      const data = await response.json();
      console.log('AuthorLogin: API response:', data);

      const normalizedRole = data.role?.toLowerCase();
      if (normalizedRole !== 'author') {
        throw new Error('Access denied: Not an Author');
      }

      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: 'Author',
        token: data.token,
      };

      login(user);
      navigate('/author/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1 className="page-title">Author Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
          </button>
        </form>
        <p className="redirect-msg">
          Don't have an account?{' '}
          <Link to="/register" className="link">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default AuthorLogin;
