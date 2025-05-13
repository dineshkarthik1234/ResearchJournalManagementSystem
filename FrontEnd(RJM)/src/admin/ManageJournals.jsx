import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import axiosInstance from '../config';
import { ClipLoader } from 'react-spinners';

function ManageJournals() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'admin') {
      navigate('/admin/login');
      return;
    }

    const fetchJournals = async () => {
      if (!user.token) {
        setError('Missing authentication token.');
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get('/admin/journals', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        });

        setJournals(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Error fetching journals');
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, [user, navigate]);

  if (!user || user.role?.toLowerCase() !== 'admin') return null;

  return (
    <div>
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Journals</h1>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader color="#6b7280" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">ISSN</th>
                </tr>
              </thead>
              <tbody>
                {journals.map((journal) => (
                  <tr key={journal.id} className="hover:bg-gray-100 even:bg-gray-50">
                    <td className="p-4 border-b">{journal.id}</td>
                    <td className="p-4 border-b">{journal.title}</td>
                    <td className="p-4 border-b">{journal.issn}</td>
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

export default ManageJournals;