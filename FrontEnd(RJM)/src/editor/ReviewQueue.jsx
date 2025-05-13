import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EditorNavBar from './EditorNavBar';
import axios from 'axios';

function ReviewQueue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role.toLowerCase() !== 'editor') {
      navigate('/editor/login', { replace: true });
    } else {
      setCheckingAuth(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!checkingAuth) {
      const fetchPapers = async () => {
        try {
          const response = await axios.get('http://localhost:2025/api/editor/review-queue', {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setPapers(response.data);
        } catch (err) {
          console.error('Error fetching review queue:', err);
          setError('Failed to load review queue.');
        } finally {
          setLoading(false);
        }
      };

      fetchPapers();
    }
  }, [checkingAuth, user]);

  if (checkingAuth) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p>Checking authorization...</p>
      </div>
    );
  }

  return (
    <div>
      <EditorNavBar />
      <div className="container" style={{ padding: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Review Queue
        </h1>
        {loading ? (
          <p>Loading review queue...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : papers.length === 0 ? (
          <p>No papers in the review queue.</p>
        ) : (
          <ul style={{ marginTop: '1rem', listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            {papers.map((paper) => (
              <li key={paper.id}>
                Paper ID: {paper.id} — Status: {paper.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReviewQueue;
