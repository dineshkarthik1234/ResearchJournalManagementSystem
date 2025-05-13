import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorNavBar from './AuthorNavBar';
import './author.css';

function AuthorSubmit() {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !abstract || !keywords || !file) {
      setError('Please fill in all fields and upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('abstract', abstract);
    formData.append('keywords', keywords);
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:2025/api/author/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Submission failed');
      }

      setSuccess('Paper submitted successfully!');
      setTimeout(() => navigate('/author/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <AuthorNavBar />
      <div className="container paper-submit-container">
        <h1>Submit Your Paper</h1>
        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Abstract</label>
            <textarea
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
              rows={5}
            />
          </div>
          <div className="form-group">
            <label>Keywords (comma separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit Paper
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthorSubmit;
