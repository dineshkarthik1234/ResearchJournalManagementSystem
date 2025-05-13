import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthorNavBar from './AuthorNavBar';
import './author.css';

function MySubmissions() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'author') {
      navigate('/author/login');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Missing authentication token');
      setLoading(false);
      return;
    }

    fetch('http://localhost:2025/api/author/submissions', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch submissions');
        return res.json();
      })
      .then((data) => setSubmissions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user || user.role?.toLowerCase() !== 'author') return null;

  return (
    <div>
      <AuthorNavBar />
      <div className="container submission-container">
        <h1 className="page-title">My Submissions</h1>

        {loading ? (
          <p>Loading submissions...</p>
        ) : error ? (
          <p className="error-msg">{error}</p>
        ) : submissions.length === 0 ? (
          <p>No submissions found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="submission-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Abstract</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td>{submission.id}</td>
                    <td>{submission.title}</td>
                    <td>{submission.abstract?.slice(0, 100) || ''}...</td>
                    <td>{submission.status}</td>
                    <td>{new Date(submission.submittedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MySubmissions;
