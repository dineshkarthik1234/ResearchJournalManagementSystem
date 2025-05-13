import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import axiosInstance from '../config';
import { ClipLoader } from 'react-spinners';

function ManageUsers() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== 'admin') {
      navigate('/admin/login');
      return;
    }

    const fetchUsers = async () => {
      if (!user.token) {
        setError('Missing authentication token.');
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get('/admin/users', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        });

        setUsers(response.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  if (!user || user.role?.toLowerCase() !== 'admin') return null;

  return (
    <div>
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Manage Users</h1>
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
                  <th className="p-4 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 even:bg-gray-50">
                    <td className="p-4 border-b">{user.id}</td>
                    <td className="p-4 border-b">{user.username}</td>
                    <td className="p-4 border-b">{user.email}</td>
                    <td className="p-4 border-b">{user.role}</td>
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

export default ManageUsers;