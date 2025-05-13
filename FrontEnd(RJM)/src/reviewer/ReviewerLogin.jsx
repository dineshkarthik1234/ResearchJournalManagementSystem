import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';

import NavBar from '../shared/NavBar.jsx';
import { ClipLoader } from 'react-spinners';
import './reviewer.css';

function ReviewerLogin() {
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
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed.');
        } else {
          const message = await response.text();
          throw new Error(message || 'Invalid username or password');
        }
      }

      const data = await response.json();
      console.log('ReviewerLogin: API response:', data);

      const role = data.role?.toLowerCase();
      if (role !== 'reviewer') {
        throw new Error('Access denied: Not a Reviewer');
      }

      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        role: 'Reviewer',
      };

      localStorage.setItem('token', data.token);
      login(user);
      navigate('/reviewer/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Reviewer Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/register" className="link">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default ReviewerLogin;
