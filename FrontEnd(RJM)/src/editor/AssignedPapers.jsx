import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EditorNavBar from './EditorNavBar';
import API_BASE_URL from '../config';

// Reusable Error Message Component
const ErrorMessage = ({ message }) => (
  <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{message}</p>
);

function AssignedPapers() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'editor') {
      navigate('/editor/login');
      return;
    }

    if (!user?.id || !user?.token) {
      setError('Missing editor credentials.');
      setLoading(false);
      return;
    }

    const fetchAssignedPapers = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/editor/assigned-papers?editorId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to fetch assigned papers.');
        }

        const data = await res.json();
        setPapers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedPapers();
  }, [user, navigate]);

  if (!user || user.role?.toLowerCase() !== 'editor') return null;

  return (
    <div>
      <EditorNavBar />
      <div className="container" style={{ padding: '2rem', maxWidth: '1000px', margin: 'auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Assigned Papers</h1>

        {loading && <p style={{ textAlign: 'center' }}>Fetching papers...</p>}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && papers.length === 0 && (
          <p style={{ textAlign: 'center' }}>No assigned papers found.</p>
        )}

        {!loading && papers.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>ID</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Author</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Assigned At</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper) => (
                  <tr key={paper.id}>
                    <td style={tdStyle}>{paper.id}</td>
                    <td style={tdStyle}>{paper.title}</td>
                    <td style={tdStyle}>{paper.authorName || 'N/A'}</td>
                    <td style={tdStyle}>{paper.status}</td>
                    <td style={tdStyle}>
                      {new Date(paper.assignedAt || '').toLocaleString()}
                    </td>
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

const thStyle = {
  padding: '0.5rem 1rem',
  borderBottom: '2px solid #ccc',
  textAlign: 'left',
  backgroundColor: '#f5f5f5',
};

const tdStyle = {
  padding: '0.5rem 1rem',
  borderBottom: '1px solid #eee',
  textAlign: 'left',
};

export default AssignedPapers;
