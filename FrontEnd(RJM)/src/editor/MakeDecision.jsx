import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import axios from 'axios';

function MakeDecision() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:2025/api/editor/makeDecision/${id}`, { decision });
      alert(`Decision for paper ${id} submitted: ${decision}`);
      navigate('/editor/review-queue');
    } catch (error) {
      console.error('Decision error:', error);
      alert(`Failed to submit decision: ${error.response?.data || error.message}`);
    }
  };

  return (
    <div>
      <NavBar role="Editor" />
      <div className="p-4 sm:p-6 md:p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Make Decision for Paper ID: {id}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Decision:</label>
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select Decision</option>
              <option value="ACCEPTED">Accept</option>
              <option value="REJECTED">Reject</option>
              <option value="REVISION">Request Revision</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Submit Decision
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default MakeDecision;
