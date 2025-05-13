import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../shared/NavBar';
import Footer from '../shared/Footer';
import axios from 'axios';

function EditPaper() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get(`http://localhost:2025/api/editor/paper/${id}`);
        setContent(res.data.content || '');
      } catch (err) {
        console.error('Error fetching paper:', err);
        setError('Error loading paper content.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaper();
  }, [id]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:2025/api/editor/paper/${id}`, { content });
      alert(`Paper ${id} updated successfully!`);
    } catch (err) {
      console.error('Update error:', err);
      alert(`Failed to update paper: ${err.response?.data || err.message}`);
    }
  };

  return (
    <div>
      <NavBar role="Editor" />
      <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Edit Paper ID: {id}</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border p-2 rounded-md h-64"
              aria-label="Edit Paper Content"
            />
            <button
              onClick={handleSave}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default EditPaper;
