import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';
import NavBar from '../shared/NavBar.jsx';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import './editor.css';

function EditorLogin() {
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
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      });

      const data = response.data;
      const role = (data.role || '').toLowerCase();

      if (role !== 'editor') {
        setError('Access denied: Not an Editor');
        setLoading(false);
        return;
      }

      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        role,
        token: data.token,
      };

      localStorage.setItem('token', data.token);
      login(user);
      navigate('/editor/dashboard');
    } catch (err) {
      console.error('EditorLogin Error:', err);
      const msg =
        err.response?.data?.message || err.response?.data || 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Editor Login</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              aria-label="Username"
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
              aria-label="Password"
            />
          </div>
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/register" className="link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default EditorLogin;
