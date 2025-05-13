// src/reviewer/SubmitReview.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import { ClipLoader } from 'react-spinners';

function SubmitReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:2025/api/reviewer/finalizePaper/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments, rating }),
      });

      if (response.ok) {
        alert(`Review for paper ${id} submitted!`);
        navigate('/reviewer/dashboard');
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Review error:', error);
      setError('An error occurred while submitting the review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar role="Reviewer" />
      <div className="p-4 sm:p-6 md:p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Submit Review for Paper ID: {id}</h1>
        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Comments:</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full border p-2 rounded-md h-32"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Submit Review'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SubmitReview;
