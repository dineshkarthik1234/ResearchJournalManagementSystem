import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config.js';
import NavBar from '../shared/NavBar.jsx';
import { ClipLoader } from 'react-spinners';
import './author.css';

function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'author') {
      navigate('/author/login', { replace: true });
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || 'Failed to fetch profile');
        }

        const data = await response.json();
        setMessage(data.message || 'Profile loaded successfully!');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (!user || user.role?.toLowerCase() !== 'author') return null;

  return (
    <div>
      <NavBar />
      <div className="container profile-container">
        <h1>User Profile</h1>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <div className="loader-container">
            <ClipLoader color="#20c997" size={40} />
          </div>
        ) : (
          <>
            {message && <p className="success">{message}</p>}

            <div className="profile-details">
              <h2>Your Details</h2>
              <div>
                <strong>Username:</strong> {user.username}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Role:</strong> {user.role}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
