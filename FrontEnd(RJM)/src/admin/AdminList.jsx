import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import axiosInstance from '../config';
import { ClipLoader } from 'react-spinners';

function AdminList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'admin') {
      navigate('/admin/login');
      return;
    }

    const fetchAdmins = async () => {
      const token = user?.token;
      if (!token) {
        setError('Authentication token is missing.');
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get('/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const adminUsers = response.data.filter(
          (u) => u.role?.toLowerCase() === 'admin'
        );
        setAdmins(adminUsers);
      } catch (err) {
        console.error(err);
        const message =
          err.response?.data?.message ||
          err.response?.data ||
          err.message ||
          'Failed to fetch admins';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [user, navigate]);

  return (
    <div>
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin List</h1>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader color="#6b7280" size={40} />
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Username</th>
                  <th className="p-4 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-100 even:bg-gray-50">
                    <td className="p-4 border-b">{admin.id}</td>
                    <td className="p-4 border-b">{admin.username}</td>
                    <td className="p-4 border-b">{admin.email}</td>
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

export default AdminList;