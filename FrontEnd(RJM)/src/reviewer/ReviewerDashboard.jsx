import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar.jsx';
import './reviewer.css';

function ReviewerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [papers, setPapers] = useState([
    { id: 1, title: 'AI in Healthcare', author: 'author1', status: 'Assigned' },
    { id: 2, title: 'Blockchain Security', author: 'author2', status: 'Assigned' },
  ]);
  const [success, setSuccess] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const role = user?.role?.toLowerCase();
    if (!user || role !== 'reviewer') {
      console.log('ReviewerDashboard: Redirecting to login');
      navigate('/reviewer/login', { replace: true });
    } else {
      setCheckingAuth(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleReview = (id) => {
    setPapers((prev) =>
      prev.map((paper) =>
        paper.id === id ? { ...paper, status: 'Reviewed' } : paper
      )
    );
    setSuccess(`Paper with ID ${id} reviewed successfully.`);
  };

  if (checkingAuth) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Checking authorization...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Reviewer Dashboard</h1>
        <p style={{ marginBottom: '25px' }}>Welcome, {user.username}!</p>

        <div className="card">
          <h2>Review Papers</h2>
          {success && <p className="success">{success}</p>}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper.id}>
                  <td>{paper.id}</td>
                  <td>{paper.title}</td>
                  <td>{paper.author}</td>
                  <td>{paper.status}</td>
                  <td>
                    {paper.status === 'Assigned' ? (
                      <button
                        className="review-btn"
                        style={{ padding: '8px 16px', width: 'auto' }}
                        onClick={() => handleReview(paper.id)}
                      >
                        Submit Review
                      </button>
                    ) : (
                      <span style={{ color: '#6c757d' }}>Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReviewerDashboard;
