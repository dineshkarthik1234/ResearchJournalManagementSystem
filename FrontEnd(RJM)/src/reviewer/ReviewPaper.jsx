// src/reviewer/ReviewPaper.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';

function ReviewPaper() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [review, setReview] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await fetch(`http://localhost:2025/api/reviewer/paper/${id}`);
        if (!res.ok) throw new Error('Failed to fetch paper');
        const data = await res.json();
        if (!data) throw new Error('Paper not found');
        setPaper(data);
      } catch (err) {
        console.error('Error fetching paper:', err);
        setError(err.message || 'Failed to load paper.');
      } finally {
        setLoading(false);
      }
    };
    fetchPaper();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:2025/api/reviewer/paper/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      setSuccess('Review submitted successfully!');
      setReview('');
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Failed to submit review.');
    }
  };

  return (
    <div>
      <NavBar role="Reviewer" />
      <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Review Paper ID: {id}</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}

        {paper && !error && (
          <div className="space-y-4 bg-white shadow-md p-6 rounded-md">
            <p><strong>Title:</strong> {paper.title}</p>
            <p><strong>Abstract:</strong></p>
            <p className="whitespace-pre-line">{paper.content}</p>
            <p><strong>Status:</strong> {paper.status}</p>
          </div>
        )}

        {paper && !error && (
          <form onSubmit={handleSubmitReview} className="mt-6 space-y-4">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full border p-2 rounded-md h-32"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Submit Review
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ReviewPaper;
