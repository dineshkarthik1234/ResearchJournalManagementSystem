import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import AdminNavBar from './AdminNavBar';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    if (!user.token) {
      setError('Missing authentication token.');
      return; // Prevent further execution
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
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        'Failed to fetch users';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError(''); // Clear previous errors
    try {
      await axiosInstance.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSuccess(`User with ID ${id} deleted successfully.`);
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <AdminNavBar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
        <p className="text-lg mb-6 text-gray-600">Welcome, {user.username}!</p>

        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4 bg-green-100 p-2 rounded">{success}</p>}

        <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Users</h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <ClipLoader color="#6b7280" size={40} />
          </div>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 even:bg-gray-50">
                  <td className="p-4 border-b">{user.id}</td>
                  <td className="p-4 border-b">{user.username}</td>
                  <td className="p-4 border-b">{user.email}</td>
                  <td className="p-4 border-b">{user.role}</td>
                  <td className="p-4 border-b">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;