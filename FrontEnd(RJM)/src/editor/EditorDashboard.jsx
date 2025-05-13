import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar.jsx';
import API_BASE_URL from '../config';
import axios from 'axios';
import './editor.css';

function EditorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role.toLowerCase() !== 'editor') {
      navigate('/editor/login', { replace: true });
      return;
    }

    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/editor/papers`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        setPapers(response.data);
      } catch (err) {
        console.error('EditorDashboard: Error fetching papers', err);
        setError(err.response?.data?.message || 'Failed to load papers.');
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, [user, navigate]);

  const handleAssign = async (id) => {
    try {
      const reviewerId = 1;
      await axios.post(
        `${API_BASE_URL}/editor/assign/${id}`,
        { reviewerId },
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setPapers(prev =>
        prev.map(p => (p.id === id ? { ...p, status: 'Assigned' } : p))
      );
      setSuccess(`Paper with ID ${id} assigned successfully.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Assignment failed.');
    }
  };

  if (!user || user.role.toLowerCase() !== 'editor') return null;

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Editor Dashboard</h1>
        <p style={{ marginBottom: '25px' }}>Welcome, {user.username}!</p>
        
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <div className="card">
          <h2>Manage Papers</h2>
          
          {loading ? (
            <p>Loading papers...</p>
          ) : papers.length === 0 ? (
            <p>No papers available.</p>
          ) : (
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
                {papers.map(paper => (
                  <tr key={paper.id}>
                    <td>{paper.id}</td>
                    <td>{paper.title}</td>
                    <td>{paper.author}</td>
                    <td>{paper.status}</td>
                    <td>
                      {paper.status === 'Pending' ? (
                        <button
                          className="assign-btn"
                          onClick={() => handleAssign(paper.id)}
                        >
                          Assign to Reviewer
                        </button>
                      ) : (
                        <span style={{ color: '#6c757d' }}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorDashboard;
